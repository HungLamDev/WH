import { DataGrid, GridColDef, GridCellParams, GridCellModes, GridRowsProp, GridCellModesModel, GridCellEditStopParams, MuiEvent, GridCellEditStopReasons } from "@mui/x-data-grid";
import { orange } from "@mui/material/colors";
import { useState, useCallback, useEffect,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
type MyTableType = {
  columns: GridColDef[];
  rows: any[];
  form?: string;
  handledoubleclick?: any;
  handlerowClick?: any
};
const MyTable3 = ({ columns, rows, form,handledoubleclick, handlerowClick }: MyTableType) => {
    const [qrcode, setQRCode] = useState('')
    const handleDoubleClick = (params: any) =>{
      if(form == 'stockin'){
        if(params.row.Barcode == qrcode){
          handledoubleclick(params.row.Barcode)
          setQRCode('')
        }
        else{
          setQRCode(params.row.Barcode)
        }
      }
      if(form == 'stockout'){
        if(params.row.Barcode == qrcode){
          handledoubleclick(params.row)
          setQRCode('')
        }
        else{
          setQRCode(params.row.Barcode)
        }
      }
    }

    const handleRowClick = (params: any) =>{
      handlerowClick(params.row)
    }
    
    return (
      <DataGrid
        getRowId={(row) => {
          return row._id;
        }}
        onCellClick={handleDoubleClick}
        onRowClick={handleRowClick}
        disableRowSelectionOnClick
        getRowHeight={() => "auto"}
        columns={columns}
        rows={rows} 
        rowHeight={40}
        hideFooter={true}
        disableColumnFilter={true}
        disableColumnMenu={true}
        disableColumnSelector={true}
        disableDensitySelector={true}
        sx={{
          "& .MuiDataGrid-columnHeader": {
            "&:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              whiteSpace: "normal",
              lineHeight: "normal",
              textAlign: "center",
              color: orange[500],
            },
          },
          "& .MuiDataGrid-cell": {
            lineHeight: "normal",
            p: 1,
            textAlign: "left",
            "&:focus": {
              outline: "none",
            },
          },
        }}
      />
    );
  }

export default MyTable3;
