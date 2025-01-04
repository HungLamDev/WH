import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    Checkbox,
    TextField,
    Stack,
} from "@mui/material";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useState, useEffect } from "react";

interface TableCheckBoxProps {
    columns: any[];
    rows: GridRowsProp;
    handlerowClick?: any,
    onDoubleClick?: any,
    arrEditCell?: string[],
    listChx?: (rows: GridRowsProp) => void,
    arrNotShowCell?: string[],
    dschx?: any[],
    selectedAll?: boolean,
    paintingRow?: any,
    checkBox?: any,
    highlightText?: any
    selectedFirstRow?: boolean,
    lastRowData?: any[],
    lastRow?: boolean
}

const MyTableNewSample = (props: TableCheckBoxProps) => {
    const {
        columns,
        rows,
        onDoubleClick,
        arrEditCell,
        listChx,
        arrNotShowCell,
        handlerowClick,
        dschx,
        selectedAll = true,
        paintingRow,
        checkBox = true,
        highlightText,
        selectedFirstRow = false,
        lastRowData,
        lastRow = false
    } = props;

    const [selected, setSelected] = useState<GridRowsProp>([])
    const [editingCellId, setEditingCellId] = useState<number | null>(null);
    const [selectedRow, setSelectedRow] = useState("");
    const [selectAll, setSelectAll] = useState(false);
    useEffect(() => {
        setSelected([])
        const event = { target: { checked: true } } as React.ChangeEvent<HTMLInputElement>;
        selectedAll && handleSelectAllClick(event);

        // if (rows.length > 0 && selectedFirstRow === true) {
        //     const firstRow = rows[0]; // Lấy hàng đầu tiên
        //     setSelectedRow(firstRow._id); // Đặt hàng đầu tiên là được chọn
        //     if (typeof handlerowClick === "function") {
        //         handlerowClick(columns[0]?.field, firstRow); // Gọi handleRowClick với hàng đầu tiên
        //     }
        // }
    }, [rows])

    useEffect(() => {
        if (dschx && dschx.length > 0) {
            setSelected(dschx);
        }
    }, [dschx])

    useEffect(() => {
        if (selectAll) {
            setSelected(rows);
            listChx !== undefined ? listChx(rows) : [];
        }
    }, [selectAll]);


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
        rows[rowInd][colName] = value;
    };

    return (
        <Stack
            sx={{
                height: "100%",
                position: "relative",
                display: "flex",
                justifyContent: "space-between",
                overflowY: "auto"
            }}
        >
             <Table
                    size={"small"}
                    sx={{
                        width: '100%',
                        tableLayout: 'fixed',
                    }}
                    stickyHeader
                    className="table-sample"
                >
                <TableHead>
                    <TableRow>
                        {
                            checkBox === true && (
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
                            )
                        }
                        {columns.map((item: any, index: number) => {
                            return (
                                <TableCell
                                    className="td-responesive-sample"
                                    key={index}
                                    align={"left"}
                                    sx={{
                                        whiteSpace: "nowrap",
                                        color: "orange",
                                        padding: "0 8px !important",
                                        background: "#1E201E",
                                        lineHeight: 1.5,
                                        width: item.width // Thêm width từ column

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
                            whiteSpace: "pre",
                        },
                    }}
                >
                    {rows.map((item: any, index: number) => {
                        return (
                            <TableRow
                                key={index}
                                // hover
                                sx={{
                                    backgroundColor:
                                        item._id === selectedRow ? "#415a77" : "inherit",
                                    cursor: "pointer",

                                }}

                            >
                                {
                                    checkBox === true && (
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
                                    )
                                }


                                {columns.map((column, i) => {
                                    const key = column.field; // Tên key của cột
                                    const isEditing = editingCellId === item._id && arrEditCell?.includes(key);

                                    return (
                                        <TableCell
                                            key={i}
                                            className="td-responesive-sample"
                                            onClick={() => {
                                                handleRowClick(key, item);
                                                setSelectedRow(item._id === selectedRow ? null : item._id);
                                            }}
                                            onBlur={(event) => handleCellBlur(event, item._id)}
                                            sx={{
                                                color: paintingRow?.(item[key], item) ?? "white",
                                                padding: "0 8px !important",
                                                textAlign: 'center',
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                width: column.width // Thêm width từ column,
                                            }}
                                            title={item[key]}

                                        >
                                            {isEditing ? (
                                                <TextField
                                                    autoFocus
                                                    defaultValue={item[key]}
                                                    onChange={(event) => {
                                                        const value = event.target.value;
                                                        if (key === "Qty") {
                                                            if (/^\d*\.?\d*$/.test(value)) {
                                                                handleTextFieldChange(index, key, value);
                                                            }
                                                        } else {
                                                            handleTextFieldChange(index, key, value);
                                                        }
                                                    }}
                                                    size="small"
                                                    inputProps={{
                                                        onKeyPress: (event) => {
                                                            if (key === "Qty" && !/[\d.]/.test(event.key)) {
                                                                event.preventDefault();
                                                            }
                                                        },
                                                    }}
                                                    sx={{
                                                        '& .MuiInputBase-input': {
                                                            padding: 0,
                                                            width: `${item[key] && !Number.isNaN(item[key].length * 1)
                                                                ? item[key].length * 10 + 40
                                                                : 40
                                                                }px`,
                                                            textAlign: "center",
                                                            fontSize: "17px",
                                                            "@media screen and (max-width: 1200px)": {
                                                                fontSize: "15px !important",
                                                            },
                                                        },
                                                    }}
                                                />
                                            )
                                                :
                                                column?.hightlight === true ?
                                                    (
                                                        <span>{highlightText(item[key], item)}</span>
                                                    )
                                                    :
                                                    (
                                                        <span

                                                        >
                                                            {item[key]}
                                                        </span>
                                                    )
                                            }
                                        </TableCell>
                                    );
                                })}


                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>

            {/* Hàng cuối luôn được hiển thị ở dưới cùng */}
            {lastRow && (

                <Table
                    size={"small"}
                    sx={{
                        tableLayout: 'fixed',
                        borderCollapse: "collapse",
                        position: 'sticky', // Sticky position
                        bottom: 0, // Luôn bám ở dưới cùng
                        zIndex: 2, // Đảm bảo không bị header hay body che khuất
                        background: "#1c2538", // Màu nền cố định
                    }}
                >

                    <TableBody>

                        {lastRowData && lastRowData.map((item: any, index: number) => (
                            <TableRow
                                key={index}
                                sx={{
                                    backgroundColor: "#1c2538",
                                    cursor: "pointer",
                                    padding: "0px !important",
                                }}
                            >
                                {columns.map((column: any, i: number) => {
                                    const key = column.field;
                                    return (
                                        <TableCell
                                            key={i}
                                            className="td-responesive-sample"
                                            sx={{
                                                padding: "0 0px !important",
                                                textAlign: 'center',
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                width: column.width // Thêm width từ column
                                            }}
                                        >

                                            <span>{item[key]}</span>

                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </Stack>
    );
};

export default MyTableNewSample;