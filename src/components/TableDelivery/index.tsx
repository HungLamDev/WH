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
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateContent, updateMaterialName, updateMaterialNo } from "../../redux/ArrayDelivery";

const TableDelivery = (props: { columns: GridColDef[]; rows: GridRowsProp; handlerowClick?: any, onDoubleClick?: any, arrEditCell?: string[], listChx?: (rows: GridRowsProp) => void, arrNotShowCell?: string[], tableName?: string }) => {
  const { columns, rows, onDoubleClick, arrEditCell, listChx, arrNotShowCell, tableName, handlerowClick } = props;
  const MaterialTableChecked = useSelector((state: any) => state.MaterialTableChecked.items);
  const StockoutDetailChecked = useSelector((state: any) => state.StockoutDetailChecked.items);
  const [selected, setSelected] = useState<GridRowsProp>([])
  const [editingCellId, setEditingCellId] = useState<number | null>(null);
  const [selectedRow, setSelectedRow] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");
  const [selectedEdit, setSelectedEdit] = useState("");
  const [keyDoubleClick, setKeyDoubleClick] = useState('')
  const [focus, setFocus] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    setSelected([])
  }, [rows])

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
      return;
    }
    setSelected([]);
    listChx !== undefined ? listChx([]) : [];
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



  const handleFocus = (key: any) => {
    // || key === 'RY_Status1'
    setFocus(true)
  }

  const handleRowClick = (params: any, item: any) => {
    // || params === 'RY_Status1'
    if (params === 'Material_No' || params === 'Material_Name') {
      if (focus === false) {
        if (keyDoubleClick === item._id && typeof onDoubleClick === "function" && selectedColumn === params) {
          onDoubleClick(params, item);
          setKeyDoubleClick("");
          setSelectedColumn("")
        }
        else {
          if (typeof handlerowClick === "function") {
            handlerowClick(params, item);
            setSelectedColumn(params)
          }

          setKeyDoubleClick(item._id);
        }
      }
    }
    else {
      if (keyDoubleClick === item._id && typeof onDoubleClick === "function" && selectedColumn === params) {
        onDoubleClick(params, item);
        setKeyDoubleClick("");
        setSelectedColumn("")
      }
      else {
        if (typeof handlerowClick === "function") {
          handlerowClick(params, item);
          setSelectedColumn(params)
        }
        setKeyDoubleClick(item._id);
      }
    }
  };

  const handleEditClick = (params: any, item: any) => {
    if (arrEditCell !== undefined && arrEditCell.includes(params)) {
      if (editingCellId !== item._id) {
        setEditingCellId(item._id);
        setSelectedEdit(params);
      }
    }
    else {
      setEditingCellId(null);
      setSelectedEdit("");
    }
  }

  const handleCellBlur = (event: React.FocusEvent<HTMLDivElement>, id: number) => {
    setEditingCellId(null);
    setSelectedEdit("");

    setFocus(false)
  };

  const handleTextFieldChange = (rowInd: number, colName: string, value: string) => {

    if (colName === 'Material_No') {
      dispatch(updateMaterialNo(
        {
          _id: rowInd,
          materialNo: colName,
          newMaterialNo: value,
        }))
    }
    else if (colName === 'Material_Name') {
      dispatch(updateMaterialName(
        {
          _id: rowInd,
          newMaterialName: value,
        }))
    }
    else if (colName === 'RY_Status1') {
      dispatch(updateContent(
        {
          _id: rowInd,
          newContent: value,
        }))
    }

    // rows[rowInd][colName] = value;
  };

  return (
    <TableContainer sx={{ height: '100%' }}>
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
              whiteSpace: "pre",
              padding: 0.5
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
                    const isEditing = editingCellId === item._id && (arrEditCell !== undefined && arrEditCell.includes(key));
                    return (
                      <TableCell
                        className="td-responesive"
                        key={i}
                        onBlur={(event) => handleCellBlur(event, item._id)}
                        onClick={() => {
                          handleRowClick(key, item)
                          setSelectedRow(
                            item._id === selectedRow ? null : item._id
                          );
                        }}
                        height={'35px'}
                        style={{paddingBottom:'10px', paddingTop:'10px'}}
                        sx={item.RY_Status2 && item.RY_Status2 === "In" && item.RY && item.RY.indexOf('/A') != -1 ? { color: 'yellow' } : item.RY_Status2 && item.RY_Status2 === "In" ? { color: 'orange' } : {}}
                      >
                        {isEditing && selectedEdit == key ? (
                          <TextField
                            autoFocus
                            defaultValue={item[key]}
                            onFocus={() => handleFocus(key)}
                            onChange={(event) => handleTextFieldChange(index, key, event.target.value)}
                            size="small"
                            sx={{
                              '& .MuiInputBase-input': {
                                padding: 0,
                                width: `${item[key] !== undefined && item[key] != null && !Number.isNaN(item[key].length * 1) && (item[key].length * 8) + 40}px`,
                                textAlign: 'center',
                                fontSize: '16px',
                                '@media screen and (max-width: 1200px)': {
                                  fontSize: '15px !important',
                                  textAlign: 'center',
                                },
                              },

                            }}
                          />
                        ) : (
                          <span
                            onClick={(event) => {
                              (arrEditCell !== undefined && arrEditCell.includes(key)) && event.stopPropagation() // Ngăn chặn lan rộng sự kiện
                              handleEditClick(key, item);
                            }}
                          >
                            {item[key]}
                          </span>
                        )}
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

export default TableDelivery;