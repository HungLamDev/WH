import { DataGrid, GridColDef, GridCellParams, GridCellModes, GridRowsProp, GridCellModesModel, GridCellEditStopParams, MuiEvent, GridCellEditStopReasons } from "@mui/x-data-grid";
import { orange } from "@mui/material/colors";
import { useState, useCallback, useEffect,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { copyValues } from "../../redux/ArrayRowDowns";
import { copyValuesArrayRowDowntoUp } from "../../redux/ArrayRowDowntoUp";
import { copyValuesArrayDeleteAndPrint } from "../../redux/ArrayDeleteAndPrint";
type MyTableType = {
  columns: GridColDef[];
  rows: any[];
  onDoubleClick: any;
};
const MyTable2 = ({ columns, rows, onDoubleClick }: MyTableType) => {
  const ArrayRowDowns = useSelector((state: any) => state.ArrayRowDowns.items);
  const ArrayRowUps = useSelector((state: any) => state.ArrayRowUps.items);

  const dispatch = useDispatch()

  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [rowNew, setRowNew] = useState(rows)
  const [key, setKey] = useState('')
  const handleProcessRowUpdate = (newRow: any, oldRow: any) => {

    const rowIndex = rowNew.findIndex((row) => row.id === newRow.id);

    const updatedRows = [...rows];
    updatedRows[rowIndex] = newRow;

    setRowNew(updatedRows);

    return newRow;
  };
  useEffect(() => {
  }, [rowNew]);

  const [cellModesModel, setCellModesModel] = useState<GridCellModesModel>({});

  const handleCellClick = useCallback(
    (params: GridCellParams, event: React.MouseEvent) => {
      if (!params.isEditable) {
        return;
      }
      // Ignore portal
      if (!event.currentTarget.contains(event.target as Element)) {

        return;
      }

      setCellModesModel((prevModel) => {
        return {
          ...Object.keys(prevModel).reduce(
            (acc, id) => ({
              ...acc,
              [id]: Object.keys(prevModel[id]).reduce(
                (acc2, field) => ({
                  ...acc2,
                  [field]: { mode: GridCellModes.View },
                }),
                {},
              ),
            }),
            {},
          ),
          [params.id]: {
            ...Object.keys(prevModel[params.id] || {}).reduce(
              (acc, field) => ({ ...acc, [field]: { mode: GridCellModes.View } }),
              {},
            ),
            [params.field]: { mode: GridCellModes.Edit },
          },
        };
      });
    },
    [],
  );

  const handleCellModesModelChange = useCallback(
    (newModel: GridCellModesModel) => {
      setCellModesModel(newModel);
    },
    [],
  );
  let i = 0
  let dataRowDownToUpRef = useRef(null);

  const handleDoubleClick = (params: any) => {
    let key1 = params.row.CLBH_Material_No
    if (key1 == params.row.CLBH_Material_No) {
      i = i + 1
      if (i == 2) {
        dataRowDownToUpRef =params.row
        onDoubleClick(dataRowDownToUpRef)
        i = 0
        key1=''
      }
    }
    else {
      key1 = ''
      i = 0
    }
   
  }
    return (
      <DataGrid
        getRowId={(row) => {
          return row._id;
        }}
        disableRowSelectionOnClick
        checkboxSelection

        rowSelection={selectedRows}
        onRowSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = ArrayRowUps.filter((row: any) =>
            selectedIDs.has(row._id)
          )
          dispatch(copyValuesArrayDeleteAndPrint(selectedRowData))
          setSelectedRows(selectedRowData)
        }}
        processRowUpdate={handleProcessRowUpdate}
        getRowHeight={() => "auto"}
        columns={columns}
        rows={rows}
        rowHeight={40}
        hideFooter={true}
        disableColumnFilter={true}
        disableColumnMenu={true}
        disableColumnSelector={true}
        disableDensitySelector={true}
        cellModesModel={cellModesModel}
        onCellModesModelChange={handleCellModesModelChange}
        onCellClick={handleCellClick}
        onRowClick={handleDoubleClick}
      
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
            textAlign: "center",
            "&:focus": {
              outline: "none",
            },
          },
        }}
      />
    );
  }

export default MyTable2;
