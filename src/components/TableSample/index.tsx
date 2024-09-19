import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    Checkbox,
    TextField,
} from "@mui/material";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextFieldChangeArrayRowDowns, DateTimePickerChangeArrayRowDowns } from "../../redux/ArrayRowDowns";

interface TableSampleProps {
    columns: GridColDef[];
    rows: GridRowsProp;
    handlerowClick?: any,
    onDoubleClick?: any,
    arrEditCell?: string[],
    listChx?: (rows: GridRowsProp) => void,
    arrNotShowCell?: string[],
    tableName?: string,
    dschx?: any[],
    columnEdit?: any
}

const TableSample = (props: TableSampleProps) => {
    const { columns, rows, onDoubleClick, arrEditCell, listChx, arrNotShowCell, tableName, handlerowClick, dschx, columnEdit } = props;

    const MaterialTableChecked = useSelector((state: any) => state.MaterialTableChecked.items);
    const StockoutDetailChecked = useSelector((state: any) => state.StockoutDetailChecked.items);
    const [selected, setSelected] = useState<GridRowsProp>([])
    const [editingCellId, setEditingCellId] = useState<number | null>(null);
    const [selectedRow, setSelectedRow] = useState("");
    const [selectedColumn, setSelectedColumn] = useState("");
    const [selectAll, setSelectAll] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (columnEdit !== "") {
            arrEditCell?.push(columnEdit)
        }
    }, [columnEdit])

    useEffect(() => {
        setSelected([])
        const event = { target: { checked: true } } as React.ChangeEvent<HTMLInputElement>;
        handleSelectAllClick(event);
    }, [rows])


    useEffect(() => {
        if (dschx && dschx.length > 0) {
            setSelected(dschx);
        }
        else {
            setSelected([]);
        }
    }, [dschx])


    useEffect(() => {
        if (selectAll) {
            setSelected(rows);
            listChx !== undefined ? listChx(rows) : [];
        }
    }, [selectAll]);

    useEffect(() => {
        if (tableName === 'delivery-material') {
            setSelected(MaterialTableChecked)

        }
        if (tableName === "stockout-detail") {
            setSelected(StockoutDetailChecked)
        }
        // else {
        //   setSelected([])
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [MaterialTableChecked, StockoutDetailChecked])

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelected(rows);
            listChx !== undefined ? listChx(rows) : [];
            setSelectAll(true); // Thêm dòng này
            return;
        }
        setSelected([]);
        listChx !== undefined ? listChx([]) : [];
        setSelectAll(false); // Thêm dòng này

    };

    const handleClick = (event: React.MouseEvent<unknown>, item: any) => {
        let newSelected: any[] = [];

        const foundObj1 = selected.find((obj: any) => obj._id === item._id);
        if (foundObj1 === undefined) {
            newSelected = newSelected.concat(selected, item)
        }
        else {
            newSelected = selected.filter((item1: any) => item1._id !== item._id)
        }
        setSelected(newSelected)
        listChx !== undefined ? listChx(newSelected) : [];
    };

    const isSelected = (id: number) => selected.findIndex((item: any) => item._id === id) !== -1;

    const [keyDoubleClick, setKeyDoubleClick] = useState('')

    const handleRowClick = (params: any, item: any) => {
        if (arrEditCell !== undefined && arrEditCell.includes(params)) {
            if (editingCellId !== item._id) {
                setEditingCellId(item._id);
                setSelectedColumn(params);
            }
        }
        else {
            if (keyDoubleClick === item._id && typeof onDoubleClick === "function") {
                onDoubleClick(params, item);
                setKeyDoubleClick("");
            }
            else {

                if (typeof handlerowClick === "function") {
                    handlerowClick(params, item);
                }
                setKeyDoubleClick(item._id);
            }
            setEditingCellId(null);
        }
    };

    const handleCellBlur = (event: React.FocusEvent<HTMLDivElement>, id: number) => {

        setEditingCellId(null);
    };

    const handleTextFieldChange = (rowInd: number, colName: string, value: string) => {
        dispatch(TextFieldChangeArrayRowDowns({ _id: rowInd, columnName: colName, value: value }))
    };

    const handleDateTimePickerChange = (rowInd: number, colName: string, params: any) => {

        if (colName === 'ywsm_Production') {
            dispatch(DateTimePickerChangeArrayRowDowns({ _id: rowInd, columnName: colName, value: moment(params, "MMMM-YYYY").format("MMM-YYYY") }))
            // rows[rowInd][colName] = moment(params, "MMMM-YYYY").format("MMM-YYYY");
        }
        else if (colName === 'ngay' || colName === 'CGDate_Date') {
            dispatch(DateTimePickerChangeArrayRowDowns({ _id: rowInd, columnName: colName, value: moment(params).format("DD/MM/YYYY") }))

            // rows[rowInd][colName] = moment(params).format("YYYY-MM-DD");

        }
    };
    return (
        <TableContainer sx={{ height: '100%' }} >
            <Table size={"small"} sx={{ width: 'fix-content' }} stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox
                                indeterminate={
                                    selected.length > 0 && selected.length < rows.length
                                }
                                checked={selected.length === rows.length}
                                onChange={handleSelectAllClick}
                                inputProps={{ "aria-label": "select all desserts" }}
                            />
                        </TableCell>
                        {columns.map((item: any, index: number) => {
                            return (
                                <TableCell
                                    className="td-responesive"
                                    key={index}
                                    align={"left"}
                                    sx={{
                                        whiteSpace: "nowrap",
                                        color: "orange",
                                    }}
                                >
                                    {item.headerName}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody
                    sx={{
                        overflow: "scroll",
                        "& td": {
                            whiteSpace: "nowrap",
                        },
                    }}
                >
                    {rows.map((item: any, index: number) => {
                        return (
                            <TableRow
                                key={index}
                                hover
                                sx={{
                                    backgroundColor:
                                        item._id === selectedRow ? "#415a77" : "inherit",
                                    cursor: "pointer",
                                }}
                            >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        onClick={(event) => {
                                            handleClick(event, item)

                                        }
                                        }
                                        role="checkbox"
                                        aria-checked={false}
                                        checked={isSelected(item._id)}
                                        inputProps={{
                                            "aria-labelledby": `checkbox-${item._id}`,
                                        }}
                                    />
                                </TableCell>
                                {Object.keys(item).map((key, i) => {
                                    const column = columns.find((col) => col.field === key);
                                    if (column) {
                                        const isProductionCell = key === "ywsm_Production" || key === "ngay" || key === 'CGDate_Date' || key ==="nhasx";
                                        const isEditing = editingCellId === item._id && (arrEditCell !== undefined && arrEditCell.includes(key));
                                        return (
                                            <TableCell
                                                className="td-responesive"
                                                key={i}
                                                onClick={() => {
                                                    handleRowClick(key, item)
                                                    setSelectedRow(
                                                        item._id === selectedRow ? null : item._id
                                                    );
                                                }}
                                                onBlur={(event) => handleCellBlur(event, item._id)}
                                                height={'35px'}
                                                sx={
                                                    item.RY_Status2 && item.RY_Status2 === "In" && item.RY && item.RY.indexOf('/A') != -1 ? { color: 'yellow' } : item.RY_Status2 && item.RY_Status2 === "In" ? { color: 'orange' } : {}
                                                }
                                            >
                                                {isEditing && !isProductionCell && selectedColumn == key ? (
                                                    <TextField
                                                        defaultValue={item[key]}
                                                        onChange={(event) => handleTextFieldChange(index, key, event.target.value)}
                                                        size="small"
                                                        autoFocus
                                                        sx={{
                                                            '& .MuiInputBase-input': {
                                                                padding: 0,
                                                                width: `${item[key] !== undefined && item[key] != null && !Number.isNaN(item[key].length * 1) && (item[key].length * 8) + 40}px`,
                                                                // textAlign: 'center',
                                                                fontSize: '17px',
                                                                '@media screen and (max-width: 1200px)': {
                                                                    fontSize: '14px !important',
                                                                    textAlign: 'center',
                                                                },
                                                            },

                                                        }}
                                                    />
                                                ) : isProductionCell && key === "nhasx" ? (

                                                    <LocalizationProvider dateAdapter={AdapterMoment} dateFormats={{
                                                        monthAndYear: "MM/YYYY",
                                                    }}>

                                                        <DateTimePicker
                                                            className="td-responesive"
                                                            format={"MMMM YYYY"}
                                                            // value={selectedDateArr[index]}
                                                            // defaultValue={key === "ngay" ? moment() : null}
                                                            onChange={(params) => handleDateTimePickerChange(index, key, params)}
                                                            views={['month', 'year']}
                                                            slotProps={{
                                                                toolbar: {
                                                                    hidden: true,
                                                                },
                                                                textField: {
                                                                    inputProps: {
                                                                        sx: {
                                                                            height: "0.5rem",
                                                                            textAlign: "center",
                                                                        },
                                                                    },

                                                                },
                                                            }}
                                                            sx={{
                                                                width: '180px',
                                                                '& .MuiInputBase-input': {
                                                                    fontSize: '15px',
                                                                    '@media screen and (max-width: 1200px)': {
                                                                        fontSize: '15px !important',
                                                                    },
                                                                },
                                                            }} />
                                                    </LocalizationProvider>

                                                ) : isProductionCell && (key === "ngay" || key === 'CGDate_Date')
                                                    ?
                                                    (
                                                        <LocalizationProvider dateAdapter={AdapterMoment} dateFormats={{
                                                            monthAndYear: "MM/YYYY",
                                                        }}>

                                                            <DateTimePicker
                                                                className="td-responesive"
                                                                format={"YYYY-MM-DD"}
                                                                // value={selectedDateArr[index]}
                                                                defaultValue={moment()}
                                                                onChange={(params) => handleDateTimePickerChange(index, key, params)}
                                                                views={['year', 'month', 'day']}
                                                                slotProps={{
                                                                    toolbar: {
                                                                        hidden: true,
                                                                    },
                                                                    textField: {
                                                                        inputProps: {
                                                                            sx: {
                                                                                height: "0.5rem",
                                                                                textAlign: "center",
                                                                            },
                                                                        },

                                                                    },
                                                                }}
                                                                sx={{
                                                                    width: '180px',
                                                                    '& .MuiInputBase-input': {
                                                                        fontSize: '15px',
                                                                        '@media screen and (max-width: 1200px)': {
                                                                            fontSize: '15px !important',
                                                                        },
                                                                    },
                                                                }} />
                                                        </LocalizationProvider>
                                                    )
                                                    :

                                                    (
                                                        item[key]
                                                    )
                                                }
                                            </TableCell>
                                        );
                                    }
                                    else {
                                        return null;
                                    }
                                    return null;
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableSample;