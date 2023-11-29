import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  Stack,
  Checkbox
} from "@mui/material";
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

type MyTableProps = {
  columns: {
    field: string;
    title: string;
    align: any;
  }[];

  rows: {
    zsywjc_Supplier: string;
    CLBH_Material_No: string;
    ywpm_Material: string,
    Color: string,
    Size: string;
    Arrival_QTY: number;
    QTY: number;
    qty_roll: string;
    dwbh_Units: string;
    CGNO_Order_No: string;
    ywsm_Production: string;
    Roll: number;
    CGDate_Date: string;
    ZLBH_Work_Order: string;
    cllb_Material_Type: string;
    Name_Material_Detail: string;
    [key: string]: any;
  }[];
  rowUps: {
    Supplier: string;
    Material_No: string;
    Material_Name: string;
    Color: string;
    Size: string;
    Print_QTY: string;
    Unit: string;
    QTY: number;
    Order_No: string;
    Roll: string;
    Modify_Date: string;
    Production: string;
    Work_Order: string;
    Material_Type: string;
    Barcode: string;
  }[];
  onClick: any
  onChange: any;
  handleDelete: any;
};

type RowsKeys = keyof Pick<MyTableProps['rows'], any>;

const MyTable = ({ columns, rows, onClick, rowUps, handleDelete }: MyTableProps) => {

  const [materials, setMaterials] = useState(rows);
  const [rowclick, setRowClick] = useState(-1);

  const items = useSelector((state: any) => state.mySlice.items);
  const dispatch = useDispatch();

  const handleCellClick = (index: any) => {
    setMaterials(rows)
    if (rowclick == index) {
      onClick(materials[index])
      setRowClick(-1)
    }
    else {
      setRowClick(index)
    }
  }


  function handleOnChange(event: any, index: any, name: keyof RowsKeys) {
    const newValue = event.target.textContent;
    const updatedMaterials = [...materials];
    updatedMaterials[index][name.toString()] = newValue;
    setMaterials(updatedMaterials);
    setRowClick(-1)
  }

  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [count, setCount] = useState(0);

  const handleAdd = (value: any) => {
    const newItem = { id: count, name: value };
    // dispatch(addItem(newItem));
    setCount(count + 1);
  };

  const handleRemove = (id: any) => {
    // dispatch(removeItem(id));
  };

  const handleDCPCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    const newSelectedItems = [...selectedItems];

    if (isChecked) {
      handleAdd(value)
    } else {
      const index = items.indexOf(value);
      if (index !== -1)
        handleRemove(index)
    }
  }
  function handleClick(row: any): void {

  }
  return (
    <TableContainer
      component={Stack}
      sx={{
        height: '50%',
        borderBottom: "1px solid white",
        overflow: "auto",
        "& thead > tr > th": {
          padding: 0.5,
          lineHeight: "normal",
        },
      }}
    >
      <Table stickyHeader >
        <TableHead>
          <TableRow>
            {columns.map((col, index) => {
              return (
                <TableCell key={index} align={col.align} >
                  {col.title}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody >
          {rows.length > 0 && rows.map((item, index) => {
            let ngay = []
            ngay = item.CGDate_Date.toString().split("-")
            return (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => handleCellClick(index)}
              >
                <TableCell size={"small"} align={"center"}>
                  <Checkbox
                    color="primary"
                    inputProps={{
                      'aria-label': 'select all desserts',
                    }}
                    value={index}
                  />
                </TableCell>
                <TableCell size={"small"} align={"center"} width={'200px'}>
                  {item.zsywjc_Supplier}
                </TableCell>
                <TableCell size={"small"} align={"center"}>
                  {item.CLBH_Material_No}
                </TableCell>
                <TableCell size={"small"} align={"center"} width={'300px'} contentEditable onBlur={(event) => handleOnChange(event, index, "ywpm_Material")}>
                  {item.ywpm_Material}
                </TableCell>
                <TableCell size={"small"} align={"center"}>
                  {item.Color}
                </TableCell>
                <TableCell size={"small"} align={"center"} width={'100px'}>
                  {item.Size}
                </TableCell>
                <TableCell size={"small"} align={"center"} width={'130px'} contentEditable onBlur={(event) => handleOnChange(event, index, "qty_roll")}>
                  {item.qty_roll}
                </TableCell>
                <TableCell size={"small"} align={"center"} width={'130px'} contentEditable onBlur={(event) => handleOnChange(event, index, "Arrival_QTY")}>
                  {item.Arrival_QTY}
                </TableCell>
                <TableCell size={"small"} align={"center"} width={'100px'}>
                  {item.QTY}
                </TableCell>
                <TableCell size={"small"} align={"center"}>
                  {item.dwbh_Units}
                </TableCell>
                <TableCell size={"small"} align={"center"}>
                  {item.CGNO_Order_No}
                </TableCell>
                <TableCell size={"small"} align={"center"} contentEditable onBlur={(event) => handleOnChange(event, index, "Roll")}>
                  {item.Roll}
                </TableCell>
                <TableCell size={"small"} align={"center"}>
                  {
                    ngay[2].substring(0, 2) + '/' + ngay[1] + '/' + ngay[0]
                  }
                </TableCell>
                <TableCell size={"small"} align={"center"} width={'150px'}>
                  {item.ywsm_Production}
                </TableCell>
                <TableCell size={"small"} align={"center"}>
                  {item.ZLBH_Work_Order}
                </TableCell>
                <TableCell size={"small"} align={"center"}>
                  {item.cllb_Material_Type}
                </TableCell>
                <TableCell size={"small"} align={"center"} width={'300px'}>
                  {item.Name_Material_Detail}
                </TableCell>
              </TableRow>
            );
          })}

          {rowUps.length > 0 && rowUps.map((item, index) => {
            let ngay = []
            ngay = item.Modify_Date.toString().split("-")
            return (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => handleCellClick(index)}
              >
                <TableCell size={"small"} align={"center"}>
                  <Checkbox
                    color="primary"
                    inputProps={{
                      'aria-label': 'select all desserts',
                    }}
                    value={item.Barcode}
                    onChange={handleDCPCheck}
                  />
                </TableCell>
                <TableCell size={"small"} align={"center"} >
                  {item.Supplier}
                </TableCell>
                <TableCell onClick={() => {
                  handleClick(item);
                }} size={"small"} align={"center"}>
                  {item.Material_No}
                </TableCell>
                <TableCell size={"small"} align={"center"} contentEditable onBlur={(event) => handleOnChange(event, index, "ywpm_Material")}>
                  {item.Material_Name}
                </TableCell>
                <TableCell size={"small"} align={"center"}>
                  {item.Color}
                </TableCell>
                <TableCell size={"small"} align={"center"}>
                  {item.Size}
                </TableCell>
                <TableCell size={"small"} align={"center"} contentEditable onBlur={(event) => handleOnChange(event, index, "qty_roll")}>
                  {item.Print_QTY}
                </TableCell>
                <TableCell size={"small"} align={"center"} contentEditable onBlur={(event) => handleOnChange(event, index, "Arrival_QTY")}>
                  {item.QTY}
                </TableCell>
                <TableCell size={"small"} align={"center"} >
                  {item.Unit}
                </TableCell>
                <TableCell size={"small"} align={"center"}>
                  {item.Order_No}
                </TableCell>
                <TableCell size={"small"} align={"center"}>
                  {item.Roll}
                </TableCell>
                <TableCell size={"small"} align={"center"}>
                  {
                    ngay[2].substring(0, 2) + '/' + ngay[1] + '/' + ngay[0]
                  }
                </TableCell>
                <TableCell size={"small"} align={"center"}>
                  {item.Production}
                </TableCell>
                <TableCell size={"small"} align={"center"}>
                  {item.Work_Order}
                </TableCell>
                <TableCell size={"small"} align={"center"}>
                  {item.Material_Type}
                </TableCell>
                <TableCell size={"small"} align={"center"}>
                  {item.Barcode}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyTable;
