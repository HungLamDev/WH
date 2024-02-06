import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { orange } from "@mui/material/colors";
import { useState } from "react";
import { DataGridProps, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { includes } from "lodash";

interface TableOriginProps {
  columns: GridColDef[];
  rows: any;
  handlerowClick?: any;
  handleDoubleClick?: any;
  arrNotShowCell?: string[];
  border?: boolean;
  color?: boolean;
}

const TableOrigin = (props: TableOriginProps) => {
  const { columns, rows, handlerowClick, handleDoubleClick, arrNotShowCell, border, color } = props;

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
                {columns.map((column: GridColDef, i: number) => {
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
                      {key === "Img_DF" ? (
                        <img
                          src={"data:image/jpeg;base64," + item[key]}
                          alt=""
                          height="20px"
                        />
                      ) : (
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
