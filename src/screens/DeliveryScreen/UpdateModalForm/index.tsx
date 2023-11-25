//#region  import
import { Box, CircularProgress, Grid, IconButton, Modal, Stack, Typography } from "@mui/material"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { BiArrowBack } from "react-icons/bi";
import TableOrigin from "../../../components/TableOrigin";
import { useTranslation } from 'react-i18next';
import { GridColDef } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { config } from "../../../utils/api";
import { connect_string } from "../../LoginScreen/ChooseFactory";
import axios from "axios";
import TableCheckBox from "../../../components/TableCheckBox";
import ModalCofirm from "../../../components/ModalConfirm";
//#endregion
function UpdateModalForm({ open, onClose, dataUpdate }: { open: any, onClose: any, dataUpdate: any }) {
  const { t } = useTranslation();
  //#region Style
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '90%',
    bgcolor: '#1c2538',
    border: '2px solid white',
    borderRadius: 3,
    boxShadow: 24,
  };
  //#endregion

  //#region column header table
  const columns: GridColDef[] = [
    {
      field: "Num_No",
      headerName: t("dcpNum_No") as string,
      width: 150,
    },
    {
      field: "Material_No",
      headerName: t("dcmMaterial_No") as string,
      width: 150,
    },
    {
      field: "Material_Name",
      headerName: t("dcmMaterial_Name") as string,
      width: 250,
    },
    {
      field: "Color",
      headerName: t("dcmColor") as string,
      width: 150,
    },
    {
      field: "Qty",
      headerName: t("dcmQTY") as string,
      width: 150,
    },
    {
      field: "RY",
      headerName: t("chxRY") as string,
      width: 400,
    },
    {
      field: "Content",
      headerName: t("dcpContent") as string,
      width: 200,
    },

    {
      field: "RY_Status",
      headerName: "",
      width: 50,
    },
    {
      field: "User_Serial_Key",
      headerName: "",
      width: 50,
    },
  ];
  //#endregion

  //#region useSelector
  const dataUser = useSelector((state: any) => state.UserLogin.user);
  //#endregion

  //#region Variable
  const [rows, setRows] = useState<any[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [ryUpdate, setRYUpdate] = useState<any>({})
  const [item, setItem] = useState<any>({})
  const [openCofirm, setOpenCofirm] = useState(false)
  const [cofirmType, setCofirmType] = useState('')
  //#endregion

  //#region  useEffect
  
  const loadData = () =>{
    const keys = Object.keys(dataUpdate);
    if (dataUpdate && keys.length !== 0) {
      const url = connect_string + "api/btn_Update_Click_Delivery"
      const data = {
        Modify_Date: dataUpdate.params.Date_End,
        User_Serial_Key: dataUser[0].UserId,
        RY_Status: dataUpdate.params.RY_Status2,
        Material_No: dataUpdate.params.Material_No,
        Delivery_Serial: dataUpdate.params.Delivery_Serial,
        RowCount: dataUpdate.dgvcount,
        get_version: dataUser[0].WareHouse

      }
      axios.post(url, data, config).then(response => {
        const arr = response.data.map((item: any, index: number) => ({
          _id: index,
          ...item
        }))
        setRows(arr)
      })

    }
  }

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataUpdate])
  //#endregion

  //#region Func Logic
  const handleOpenConfirm = (confirmName: string) => {
    setCofirmType(confirmName)
    setOpenCofirm(true)
  }

  const handleCloseConfirm = () => {
    setCofirmType('')
    setOpenCofirm(false)
  }

  const handleDoubleClick = (colName: any, item: any) => {
    if (colName !== 'RY_Status') {
      setOpenModal(true)
      setRYUpdate(item)
    }
    else {
      const url = connect_string + "api/Detail_Material_Delivery_CellDoubleClick"
      const data = {
        RowCount: rows.length,
        ColumnIndex: "dcmStatus",
        Delivery_Serial: item.Data_Material_Delivery_Serial,
        Qty: item.Qty,
        RY_Status: item.RY_Status,
        Content: item.Content,
        Material_Name: item.Material_Name,
        Color: item.Color,
        get_version: dataUser[0].WareHouse
      }
      axios.post(url, data, config).then(response => {
        if (response.data === true) {
          handleOpenConfirm('success')
          loadData()
          // updateTrangThaiByMaVatTu(item.Material_No, item.RY, item.RY_Status, item.Data_Material_Delivery_Serial)
        }
        else {
          handleOpenConfirm('error')
        }
      })
    }
  }

  const updateTrangThaiByMaVatTu = (materialNo: string, ry: string, ry_status: string,Data_Material_Delivery_Serial: string ) => {
    const updatedRows = rows.map((row: any) => {
      if (row.Data_Material_Delivery_Serial === Data_Material_Delivery_Serial && row.Material_No === materialNo && row.RY === ry && ry_status === 'In') {
        return { ...row, RY_Status: "Out" };
      }
      else {
        return { ...row, RY_Status: "In" };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleOk = () => {
    setOpenModal(false)
    const url = connect_string + "api/Detail_Material_Delivery_CellDoubleClick"
    const data = {
      RowCount: rows.length,
      ColumnIndex: "dcmQty",
      Delivery_Serial: ryUpdate.Data_Material_Delivery_Serial,
      Qty: ryUpdate.Qty,
      RY_Status: ryUpdate.RY_Status,
      Content: ryUpdate.Content,
      Material_Name: ryUpdate.Material_Name,
      Color: ryUpdate.Color,
      get_version: dataUser[0].WareHouse

    }
    axios.post(url, data, config).then(response => {
      if (response.data === true) {
        handleOpenConfirm('success')
      }
      else {
        handleOpenConfirm('error')
      }
    })
  }

  const deleteRy = () => {
    const url = connect_string + "api/Detail_Material_Delivery_Delete_Click"
    const data = {
      RowCount: rows.length,
      Delivery_Serial: item.Data_Material_Delivery_Serial,
      Qty: item.Qty,
      RY_Status: item.RY_Status,
      Content: item.Content,
      Material_Name: item.Material_Name,
      Color: item.Color,
      get_version: dataUser[0].WareHouse
    }
    axios.post(url, data, config).then(response => {
      if (response.data === true) {
        handleOpenConfirm('success')
        deleteRyByDeliverySerial(item.Data_Material_Delivery_Serial)
      }
      else {
        handleOpenConfirm('error')
      }
    })

  }

  const deleteRyByDeliverySerial = (deliverySerial: string) => {
    const updatedRows = rows.filter((row: any) => row.Data_Material_Delivery_Serial !== deliverySerial)
    setRows(updatedRows);
  };

  const handleRowClick = (colName: string, item: any) => {
    setItem(item)
  }
  //#endregion

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack height={'100%'}>
          <Stack height={'10%'} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <IconButton className={'back-button'} onClick={onClose}>
              <BiArrowBack className=" icon-wrapper" sx={{ color: 'white' }} />
            </IconButton>
            <Typography variant="h4" component="h4" color={'white'}>{t("lblMaterial_Infor") as string}</Typography>
            <HighlightOffIcon onClick={deleteRy} className="icon-wrapper" sx={{ color: 'white', width: '45px', height: '60px' }} />
          </Stack>
          <Stack overflow={"hidden"} height={'90%'} >
            <TableCheckBox columns={columns} rows={rows} arrEditCell={['Qty']} onDoubleClick={handleDoubleClick} handlerowClick={handleRowClick} />
          </Stack>
        </Stack>
        {open && <ModalCofirm onPressOK={handleOk} open={openModal} onClose={() => setOpenModal(false)} title="Bạn có thực sự muốn cập nhật lệnh này ?" />}
        {cofirmType === 'success' && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("msgUpdateSuccesful") as string} />}
        {cofirmType === 'error' && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("lblUpdateNotSuccess") as string} />}
      </Box>
    </Modal>
  )
}
export default UpdateModalForm