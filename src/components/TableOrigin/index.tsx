import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Backdrop,
  CircularProgress,
  Stack,
} from "@mui/material";
import { orange } from "@mui/material/colors";
import { useState } from "react";
import { DataGridProps, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { includes } from "lodash";
import MyAutocomplete from "../Autocomplete";

interface TableOriginProps {
  columns: any[];
  rows: any;
  handlerowClick?: any;
  handleDoubleClick?: any;
  arrNotShowCell?: string[];
  border?: boolean;
  color?: boolean;
  dataSelected?: string[];
}


const TableOrigin = (props: TableOriginProps) => {
  const { columns, rows, handlerowClick, handleDoubleClick, arrNotShowCell, border, color,dataSelected=[] } = props;

  const [keyDoubleClick, setKeyDoubleClick] = useState("");
  const [selectedRow, setSelectedRow] = useState("");
  const handleRowClick = (params: any, item: any) => {
    if (
      keyDoubleClick === item._id &&
      typeof handleDoubleClick === "function"
    ) {
      handleDoubleClick(params, item);
      setKeyDoubleClick("");
    } else {
      setKeyDoubleClick(item._id);
      if (typeof handlerowClick === "function") {
        handlerowClick(params, item);
      }
    }
  };

  const handleSelected = (rowInd: number, colName: string, value: string) => {
    rows[rowInd][colName] = value;
  }

  return (
    <TableContainer sx={{ height: "100%" }}>
      <Table size={"small"} stickyHeader >
        <TableHead>
          <TableRow>
            {columns.map((item: any, index: number) => {
              return (
                <TableCell
                  className="td-responesive"
                  key={index}
                  align={"left"}
                  sx={{
                    whiteSpace: "nowrap",
                    color: "orange",
                    border: border ? " 1px solid white" : "",
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
              border: border ? " 1px solid white" : "",
              padding: 0.5,
              color: color ? "aqua" : ""
            },
          }}
        >
          {rows.map((item: any, index: number) => {
            return (
              <TableRow
                key={item._id}
                sx={{
                  backgroundColor:
                    item._id === selectedRow ? "#415a77" : "inherit",
                  cursor: "pointer",
                  height: '35px'
                }}
              >
                {columns.map((column: any, i: number) => {
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
                  else if (item.mau && item.mau !== null) {
                    textColor = "darkorange";
                  }
                  return (
                    <TableCell
                      key={key}
                      align="left"
                      className="td-responesive"
                      sx={{ color: textColor }}
                      onClick={() => {
                        handleRowClick(key, item);
                        setSelectedRow(
                          item._id === selectedRow ? null : item._id
                        );
                      }}
                    >
                      {
                        key === "Arr_Material" && item["Arr_Material"] === null && (item["RY"])
                      }
                      {key === "Img_DF" ?
                        (
                          <img
                            src={"data:image/jpeg;base64," + item[key]}
                            alt=""
                            height="20px"
                          />
                        )
                        : column.selected && column.selected === true ?
                          (
                            <Stack justifyContent={"center"} alignItems={"center"}>
                              <MyAutocomplete
                                xsLabel={0}
                                xsInput={10}
                                value={item?.WH}
                                data={dataSelected}
                                handle={(value: any) => handleSelected(index, key, value)}
                              />
                            </Stack>
                          )
                          :
                          (
                            item[key]
                          )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>

  );
};

export default TableOrigin;
