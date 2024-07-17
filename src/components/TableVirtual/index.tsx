import React, { useMemo, useRef, useEffect, useState } from "react";
import { TableComponents, TableVirtuoso } from "react-virtuoso";
import { GridColDef } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { TextFieldChangeArrayChemistry } from "../../redux/ArrayChemistry";
import { includes } from "lodash";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import './styles.scss'
interface TableVirtualProps {
    columns: GridColDef[];
    rows: any;
    handlerowClick?: any;
    handleDoubleClick?: any;
    handleLongPress?: any;
    arrNotShowCell?: string[];
    border?: boolean;
    color?: boolean;
    arrEditCell?: string[];
}

function TableVirtual(props: TableVirtualProps) {
    const { columns, rows, handlerowClick, handleDoubleClick, arrNotShowCell, border, color, arrEditCell, handleLongPress } = props;
    const divRef = useRef<HTMLDivElement>(null);
    const [divHeight, setDivHeight] = useState(0);
    const [divWidth, setDivWidth] = useState(0);
    const [keyDoubleClick, setKeyDoubleClick] = useState("");
    const [selectedRow, setSelectedRow] = useState("");
    const [editingCellId, setEditingCellId] = useState<number | null>(null);
    const [longPress, setLongPress] = useState<boolean>(false);
    const timeoutRef = useRef<number | null>(null);
    const dispatch = useDispatch();


    useEffect(() => {
        if (divRef.current) {
            setDivHeight(divRef.current.offsetHeight);
            setDivWidth(divRef.current.offsetWidth);
        }
    }, [divRef.current]);


    const handleTouchStart = (key: any, item: any) => {
        timeoutRef.current = setTimeout(() => {
            setLongPress(true);
            handleLongPress(key, item)
        }, 1000);
    };

    const handleTouchEnd = () => {
        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
        }
        // if (!longPress) {
        //     console.log('Short press');
        // }
        setLongPress(false);
    };

    const handleRowClick = (params: any, item: any) => {
        if (arrEditCell !== undefined && arrEditCell.includes(params)) {
            if (editingCellId !== item._id) {
                setEditingCellId(item._id);
            }
        }
        else {
            if (keyDoubleClick === item._id && typeof handleDoubleClick === "function") {
                handleDoubleClick(params, item);
                setKeyDoubleClick("");
            }
            else {
                setKeyDoubleClick(item._id);
                if (typeof handlerowClick === "function") {
                    handlerowClick(params, item);
                }
            }
            setEditingCellId(null);
        }
    };

    const handleCellBlur = (event: React.FocusEvent<HTMLDivElement>, id: number) => {
        setEditingCellId(null);
    };

    const handleTextFieldChange = (rowInd: number, colName: string, value: string) => {
        dispatch(TextFieldChangeArrayChemistry({ _id: rowInd, columnName: colName, value: value }))
    };


    const styles = {
        overflow: "scroll",
        "& td": {
            whiteSpace: "pre",
            border: border ? " 1px solid white" : "",
            padding: 0.5,
            color: color ? "aqua" : ""
        }
    };

    const datas = useMemo(() => {
        return rows
    }, []);

    const VirtuosoTableComponents: TableComponents<any> = {
        Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
            <TableContainer  {...props} ref={ref} />
        )),
        Table: (props) => (
            <Table {...props} sx={{ borderCollapse: 'separate', tableLayout:'fixed'}} />
        ),
        TableHead,
        TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
        TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
            <TableBody {...props} ref={ref} sx={styles} />
        )),
    };

    return (
        <div ref={divRef} className="TableVirtual" >
            <TableVirtuoso
                data={rows}
                style={{ height: divHeight - 1 }}
                components={VirtuosoTableComponents}
                fixedHeaderContent={() => (
                    <TableRow sx={{ background: '#1C2538' }}>
                        {columns.map((item: any, index: number) => {
                            return (
                                <TableCell
                                    className="td-responesive"
                                    key={index}
                                    align={"center"}
                                    sx={{
                                        whiteSpace: "pre-line !important",
                                        wordBreak:'break-all',
                                        color: "orange",
                                        border: border ? " 1px solid white" : "",
                                        width: item.width
                                    }}
                                >
                                    {item.headerName}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                )}
                itemContent={(index: number, item: any) => (
                    columns.map((column: GridColDef, i: number) => {
                        const key = column.field;
                        if (includes(arrNotShowCell, key)) {
                            return null;
                        }
                        let textColor = "white";
                        if (item.Order_No_In2 || item.Order_No_In2 === 'Tồn') {
                            textColor = "darkorange";
                        } else if (item.Stamp_Caculator === "0") {
                            textColor = "white";
                        }
                        else if ((item.Stamp_Caculator && item.Stamp_Caculator !== "0") || (item.Stamp_Caculator && item.Stamp_Caculator !== 0)) {
                            textColor = "orange";
                        } else if (item.Order_No_Out1) {
                            const str = item.Order_No_Out1.split('(');
                            if (str[0] === '0') {
                                textColor = "orangered";
                            }
                        } else if (item.Num && item.Num.includes('*')) {
                            textColor = "orange";
                        }
                        else if ((item.Qty && item.Qty_ERP && item.RY && item.RY_ERP) && (item.Qty !== item.Qty_ERP || item.RY !== item.RY_ERP)) {
                            textColor = "orange";
                        }
                        else if (item.Order_No_In && item.Order_No_In !== "") {
                            textColor = "yellowgreen";
                        }
                        else if (item.Material_Name && item.Material_Name.trim().includes('(BU)')) {
                            textColor = "aqua";
                        }
                        const isEditing = editingCellId === item._id && (arrEditCell !== undefined && arrEditCell.includes(key));
                        const oneRow = rows.length === 1;
                        const manyRow = rows.length > 1;
                        return (
                            <TableCell
                                key={key}
                                align="left"
                                className="td-responesive"
                                style={{ color: textColor, textAlign: key === "Img_DF" ? "center" : 'left', whiteSpace:'pre-line', wordBreak:'break-all' }}
                                onClick={() => {
                                    handleRowClick(key, item);
                                    setSelectedRow(
                                        item._id === selectedRow ? null : item._id
                                    );
                                }}
                                onBlur={(event) => handleCellBlur(event, item._id)}
                                sx={{
                                    backgroundColor:
                                        item._id === selectedRow ? "#415a77" : "inherit",
                                    cursor: "pointer",
                                }}
                            >
                                {
                                    key === "Arr_Material" && item["Arr_Material"] === null && (item["RY"])
                                }
                                {
                                    key === "Img_DF"
                                        ?
                                        (
                                            <img
                                                src={"data:image/jpeg;base64," + item[key]}
                                                alt=""
                                                height="50px"
                                            />
                                        )
                                        : isEditing && (item["Qty_Redundant"] && item["Qty_Redundant"] !== "") && (manyRow && item._id !== rows.length - 2) || (oneRow && item._id !== rows.length - 1)
                                            ?
                                            (
                                                <TextField
                                                    defaultValue={item[key]}
                                                    onChange={(event) => handleTextFieldChange(index, key, event.target.value)}
                                                    onTouchStart={() => handleTouchStart(key, item)}
                                                    onTouchEnd={handleTouchEnd}
                                                    onTouchCancel={handleTouchEnd}
                                                    size="small"
                                                    autoFocus
                                                    sx={{
                                                        '& .MuiInputBase-input': {
                                                            padding: 0,
                                                            width: `${item[key] !== undefined && item[key] != null && !Number.isNaN(item[key].length * 1) && (item[key].length * 8) + 40}px`,
                                                            // textAlign: 'center',
                                                            fontSize: '17px',
                                                            '@media screen and (max-width: 1200px)': {
                                                                fontSize: '15px !important',
                                                                textAlign: 'center',
                                                            },
                                                        },

                                                    }}
                                                />
                                            )
                                            :
                                            (item[key])
                                }
                            </TableCell>
                        );
                    })
                )}
            />
        </div>
    );
}

export default TableVirtual;
