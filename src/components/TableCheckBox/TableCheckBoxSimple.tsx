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
import { useState } from "react";

interface TableCheckBoxProps {
  columns: GridColDef[];
  rows: GridRowsProp;
  handlerowClick?: any;
  onDoubleClick?: any;
  arrEditCell?: string[];
  listChx?: (rows: GridRowsProp) => void;
  arrNotShowCell?: string[];
  tableName?: string;
  dschx?: any[];
  selectedAll?: boolean;
  isCheckAllowed?: (row: any) => boolean; // Thêm prop isCheckAllowed
  arrCheckedCell?: string[];
  determineCheckedState?: any;
  handleCheckItemClick?: any;
}

const TableCheckBoxSimple = (props: TableCheckBoxProps) => {
  const {
    columns,
    rows,
    onDoubleClick,
    arrEditCell,
    listChx,
    arrNotShowCell,
    tableName,
    handlerowClick,
    dschx,
    isCheckAllowed,
    arrCheckedCell,
    determineCheckedState,
    handleCheckItemClick,
  } = props;

  const [checkedRows, setCheckedRows] = useState<any[]>([]);
  const [editingCellId, setEditingCellId] = useState<number | null>(null);
  const [keyDoubleClick, setKeyDoubleClick] = useState('')
  const [selectedRow, setSelectedRow] = useState("");

  const rowCount = rows.length;
  const numSelected = checkedRows.length;

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      // Chỉ chọn những dòng thỏa điều kiện isCheckAllowed
      const allRowIds = rows
        .filter((row) => (isCheckAllowed ? isCheckAllowed(row) : true))
        .map((row) => row._id);
      setCheckedRows(allRowIds);
      const filteredList = rows.filter(item => allRowIds.includes(item._id));
      if (listChx) listChx(filteredList);
    }
    else {
      setCheckedRows([]);
      if (listChx) listChx([]);
    }
  };

  const handleCheckClick = (row: any) => {
    // Kiểm tra điều kiện isCheckAllowed trước khi thay đổi trạng thái check
    if (isCheckAllowed && !isCheckAllowed(row)) {
      return; // Nếu không thỏa điều kiện, không thay đổi trạng thái
    }

    const isSelected = checkedRows.includes(row._id);
    const newChecked = isSelected
      ? checkedRows.filter((rowId) => rowId !== row._id) // Bỏ check
      : [...checkedRows, row._id]; // Thêm check

    setCheckedRows(newChecked);
    const filteredList = rows.filter(item => newChecked.includes(item._id));
    if (listChx) listChx(filteredList); // Gửi trạng thái mới lên component cha
  };


  const handleTextFieldChange = (rowInd: number, colName: string, value: string) => {
    rows[rowInd][colName] = value;
  };

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

  return (
    <TableContainer sx={{ height: "100%" }}>
      <Table size={"small"} sx={{ width: "fix-content" }} stickyHeader>
        <TableHead
          sx={{
            zIndex: 999
          }}
        >
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                checked={
                  rows.filter((row) => isCheckAllowed ? isCheckAllowed(row) : true).length > 0 && // Đảm bảo có ít nhất một hàng thỏa mãn điều kiện
                  numSelected > 0 && // Có ít nhất một hàng được chọn
                  numSelected === rows.filter((row) => isCheckAllowed ? isCheckAllowed(row) : true).length // Tất cả các hàng thỏa mãn đều được chọn
                }
                // indeterminate={
                //   numSelected > 0 && // Có ít nhất một hàng được chọn
                //   numSelected < rows.filter((row) => isCheckAllowed ? isCheckAllowed(row) : true).length // Không phải tất cả các hàng thỏa mãn đều được chọn
                // }
                onChange={handleSelectAllClick}
                inputProps={{ "aria-label": "select all rows" }}

              />
            </TableCell>
            {columns.map((item: any, index: number) => (
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
            ))}
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
          {rows.map((row: any, rowIndex: number) => (
            <TableRow
              key={rowIndex}
              hover
              sx={{
                backgroundColor:
                  row._id === selectedRow ? "#415a77" : "inherit",
                cursor: "pointer",
              }}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  checked={checkedRows.includes(row._id)}
                  onChange={() => handleCheckClick(row)} // Gọi hàm check có kiểm tra điều kiện
                  disabled={isCheckAllowed ? !isCheckAllowed(row) : false} // Không cho check nếu không thỏa điều kiện
                  inputProps={{
                    "aria-labelledby": `checkbox-${row._id}`,
                  }}
                />
              </TableCell>
              {columns.map((col: GridColDef, colIndex: number) => {
                const cellValue = row[col.field];
                const isEditing = editingCellId === row._id && (arrEditCell !== undefined && arrEditCell.includes(col.field));
                const isCheckedCell = arrCheckedCell?.includes(col.field)

                let textColor = "white";
                if (tableName === "inputERP") {
                  if (row?.Value_HGLB == "") {
                    textColor = "Yellow"
                  }
                  else if (row?.RKNO_Stock_In_No !== "" || row?.Value_HGLB == "" || row?.T_RY_Qty === "0") {
                    textColor = "White"
                  }
                  else {
                    textColor = "GreenYellow"
                  }
                }
                return (
                  <TableCell
                    className="td-responesive"
                    key={colIndex}
                    sx={{ height: "35px" }}
                    onClick={() => {
                      !isCheckedCell && handleRowClick(col.field, row)
                      setSelectedRow(
                        row._id === selectedRow ? null : row._id
                      );
                    }}
                    onBlur={(event) => handleCellBlur(event, row._id)}
                    style={{ color: textColor }}
                  >
                    {isEditing ?
                      (
                        <TextField
                          autoFocus
                          className="td-responesive"
                          defaultValue={cellValue}
                          onChange={(e) =>
                            handleTextFieldChange(rowIndex, col.field, e.target.value)
                          }
                          variant="outlined"
                          size="small"
                          sx={{
                            '& .MuiInputBase-input': {
                              padding: 0,
                              width: `${cellValue} !== undefined && ${cellValue} != null && !Number.isNaN(${cellValue}.length * 1) && (${cellValue}.length * 10) + 40}px`,
                              textAlign: 'center',
                              fontSize: '17px',
                              '@media screen and (max-width: 1200px)': {
                                fontSize: '15px !important',
                              },
                            },
                          }}
                        />
                      )
                      :
                      isCheckedCell ?
                        (
                          <Checkbox
                            checked={determineCheckedState ? determineCheckedState(row, col.field) : false}
                            onChange={(e) =>
                              handleCheckItemClick && handleCheckItemClick(rowIndex, col.field, e.target.checked)
                            }
                            inputProps={{
                              "aria-labelledby": `checkbox-item-${row._id}`,
                            }}
                          />
                        )
                        :
                        (
                          cellValue
                        )
                    }
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableCheckBoxSimple;
