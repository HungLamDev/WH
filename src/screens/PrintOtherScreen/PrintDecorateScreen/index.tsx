//#region import
import FullScreenContainerWithNavBar from "../../../components/FullScreenContainerWithNavBar";
import {
  Box,
  Grid,
  FormControlLabel,
  Checkbox,
  Stack,
} from "@mui/material";
import InputField from "../../../components/InputField";
import MyButton from "../../../components/MyButton";
import { GridColDef } from "@mui/x-data-grid";
import moment, { Moment } from "moment";
import { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../../../utils/api";
import { checkPermissionPrint } from "../../LoginScreen/ChooseFactory";
import { connect_string } from "../../LoginScreen/ChooseFactory";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { useTranslation } from "react-i18next";
import TableCheckBox from "../../../components/TableCheckBox";
import ModalCofirm from "../../../components/ModalConfirm";
import { useDispatch, useSelector } from "react-redux";
import Formprint from "../../../components/Formprint";
import { styletext } from "../../StockinScreenv2/StockinForm";
import TableDateTimePicker from "../../../components/TableDateTimePicker";
import { clearArrayRowDowns, copyValues } from "../../../redux/ArrayRowDowns";
import { copyValuesRowUps, clearArrayRowUps, removeItemByBarcodeRowUps, changeItemsByBarcodeArrayRowUps, addItemRowUps, changeItemsArrayRowUps } from "../../../redux/ArrayRowUps";
import { clearArrayDeleteAndPrint, copyValuesArrayDeleteAndPrint, changeItemsByBarcodeArrayDeleteAndPrint } from "../../../redux/ArrayDeleteAndPrint";

//#endregion
const DataHistoryPrintScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  //#region column header table
  const columnsUp: GridColDef[] = [
    {
      field: "Supplier",
      headerName: t("dcpSupplier") as string, // Nhà cung ứng
      width: 70,
      headerClassName: "custom-header",
    },
    {
      field: "Material_No",
      headerName: t("dcpMaterial_No") as string, // Mã vật tư
      width: 150,
      headerClassName: "custom-header",
    },
    {
      field: "Material_Name",
      headerName: t("dcpMaterial_Name") as string, // Tên vật tư
      width: 150,
      headerClassName: "custom-header",
    },
    {
      field: "Color",
      headerName: t("dcpColor") as string, // Màu
      width: 110,
      headerClassName: "custom-header",
    },
    {
      field: "Size",
      headerName: t("dcpSize") as string, // Kích thước
      width: 300,
      headerClassName: "custom-header",
    },
    {
      field: "Print_QTY",
      headerName: t("dcpQty_ROLL") as string, //Số lượng cuộn
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "QTY",
      headerName: t("dcpQTY_Show") as string, // Số lượng
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "dwbh_Units",
      headerName: t("dcpUnit") as string, // Đơn vị
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "Order_No",
      headerName: t("dcpOrder_No") as string, // Số phiếu
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "Roll",
      headerName: t("dcpRoll") as string, // Cuộn
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "Print_Date",
      headerName: t("dcpDate") as string, // Ngày
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "Work_Order",
      headerName: t("dcpWork_Order") as string, // Lệnh
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "Material_Type",
      headerName: t("dcmMaterial_Type") as string, // Loại vật tư
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "Barcode",
      headerName: t("dcpBarcode") as string, // Mã QR
      width: 160,
      headerClassName: "custom-header",
    },
  ];
  const columnsDown: GridColDef[] = [
    {
      field: "zsywjc_Supplier",
      headerName: t("dcmSupplier") as string, // Cung ứng
      width: 150,
      headerClassName: "custom-header",
    },
    {
      field: "CLBH_Material_No",
      headerName: t("dcmMaterial_No") as string, // Mã vật tư
      width: 110,
      headerClassName: "custom-header",
    },
    {
      field: "ywpm_Material",
      headerName: t("dcpMaterial_Name") as string, // Tên vật tư
      width: 300,
      headerClassName: "custom-header",
    },
    {
      field: "Color",
      headerName: t("dcmColor") as string, // Màu
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "Size",
      headerName: t("dcmSize") as string, // Kích thước
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "V_Total_Qty",
      headerName: t("dcpQty_ROLL") as string, // Số lượng cuộn
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "Arrial_Qty",
      headerName: t("dcmArrival_QTY") as string, // Số lượng về
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "QTY",
      headerName: t("dcpQTY_Show") as string, // Số lượng
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "dwbh_Units",
      headerName: t("dcpUnit") as string, // Đơn vị
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "CGNO_Order_No",
      headerName: t("dcmOrder_No") as string, // Số phiếu
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "Roll",
      headerName: t("dcmRoll") as string, // Cuộn
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "CGDate_Date",
      headerName: t("dcpDate") as string, // Ngày
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "ZLBH_Work_Order",
      headerName: t("dcpWork_Order") as string, // Lệnh
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "cllb_Material_Type",
      headerName: t("dcmMaterial_Type") as string, // Loại vật tư
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "Name_M",
      headerName: "",
      headerClassName: "custom-header",
    },
  ];
  //#endregion

  //#region useSelector
  const dataUser = useSelector((state: any) => state.UserLogin.user);
  const ArrayRowDowns = useSelector((state: any) => state.ArrayRowDowns.items);
  const ArrayRowUps = useSelector((state: any) => state.ArrayRowUps.items);
  const ArrayDeleteAndPrint = useSelector((state: any) => state.ArrayDeleteAndPrint.items);
  //#endregion

  //#region Variable
  const [open, setOpen] = useState(false)
  const [isloading, setIsLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [rowDowns, setrowDowns] = useState<any[]>([]);
  const [rowUps, setrowUps] = useState<any[]>([]);
  const [orderNo, setOrderNo] = useState('')
  const [materialNo, setMaterialNo] = useState('')
  const [workOrder, setWorkOrder] = useState('')
  const [chxRY, setChxRY] = useState(false)
  const [chxRePrint, setChxRePrint] = useState(false)
  const [listChx, setListChx] = useState<any[]>([])
  const [openPrintReview, setOpenPrintReview] = useState(false)
  const [openCofirm, setOpenCofirm] = useState(false)
  const [cofirmType, setCofirmType] = useState('')
  const [isApi, setIsApi] = useState(true)

  //#endregion

  //#region Func OnChange Input
  const handleOrderNo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrderNo(event.target.value);
  };

  const handleMaterialNo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaterialNo(event.target.value);
  };

  const handleWorkOrder = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWorkOrder(event.target.value);
  };

  const handleChxRY = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChxRY(event.target.checked);
  };

  const handleChxRePrint = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChxRePrint(event.target.checked);
  };
  //#endregion

  //#region Func Logic
  const handleOpenConfirm = (name: string) => {
    setCofirmType(name)
    setOpenCofirm(true)
  }

  const handleCloseConfirm = () => {
    setCofirmType('')
    setOpenCofirm(false)
  }

  const handleSearch = () => {
    setIsLoading(true)
    setDisabled(true)

    dispatch(clearArrayRowDowns())

    const url = connect_string + "api/Search_Print_Cutting"
    const data = {
      chxRY: chxRY,
      txtOrderNo: orderNo,
      txtMaterial_No: materialNo,
      txtOrder_Word: workOrder,
      get_version: dataUser[0].WareHouse
    }
    axios.post(url, data, config).then(response => {
      const arr = response.data.map((item: any, index: any) => ({
        _id: index,
        zsywjc_Supplier: item.zsywjc_Supplier,
        CLBH_Material_No: item.CLBH_Material_No,
        ywpm_Material: item.ywpm_Material,
        Color: item.Color,
        Size: item.Size,
        V_Total_Qty: item.V_Total_Qty,
        Arrial_Qty: item.Arrial_Qty,
        QTY: item.QTY,
        dwbh_Units: item.dwbh_Units,
        CGNO_Order_No: item.CGNO_Order_No,
        Roll: item.Roll,
        CGDate_Date: item.CGDate_Date,
        ZLBH_Work_Order: item.ZLBH_Work_Order,
        cllb_Material_Type: item.cllb_Material_Type,
        Name_M: item.Name_M,
        ywsm_Production: item.ywsm_Production,
        zsdh_Supplier_No: item.zsdh_Supplier_No
      }))
      dispatch(copyValues(arr))
      // setrowDowns(arr)
    }).finally(() => {
      setIsLoading(false)
      setDisabled(false)
    })
  }

  const handleDoubleClick = (colName: string, params: any) => {
    if (isApi === true) {
      setIsLoading(true)
      setDisabled(true)
      setIsApi(false)
      const url = connect_string + "api/Data_CellMouseDoubleClick_Print_Cutting"
      const ngay = params.CGDate_Date.split("/")
      const data = {
        dcmOrder_No: params.CGNO_Order_No,
        dcmMaterial_No: params.CLBH_Material_No,
        dcmMaterial_Type: params.cllb_Material_Type,
        dcmColor: params.Color,
        dcmUnit: params.dwbh_Units,
        dcmQty_ROLL: params.V_Total_Qty,
        dcmArrival_QTY: params.Arrial_Qty,
        dcmQTY: params.QTY,
        dcmRoll: params.Roll,
        dcmSize: params.Size,
        dcmMaterial: params.ywpm_Material,
        dcmProduction: params.ywsm_Production,
        dcmWork_Order: params.ZLBH_Work_Order,
        dcmSupplier_no: params.zsdh_Supplier_No,
        dcmSupplier: params.zsywjc_Supplier,
        dcmDate: moment(params.CGDate_Date, 'YYYY-MM-DD', true).isValid() ? moment(params.CGDate_Date).format('YYYY/MM/DD') : ngay[2] + "/" + ngay[1] + "/" + ngay[0],
        chxRY: chxRY,
        USERID: dataUser[0].UserId,
        chxReprint: chxRePrint,
        get_version: dataUser[0].WareHouse
      }
      axios.post(url, data, config).then(response => {
        if (response.data.length > 0) {
          const arr = response.data.map((item: any, index: any) => ({
            _id: item.Barcode,
            Supplier: item.Supplier,
            Material_No: item.Material_No,
            Material_Name: item.Material_Name,
            Color: item.Color,
            Size: item.Size,
            Print_QTY: item.Print_QTY,
            QTY: item.QTY,
            dwbh_Units: item.dwbh_Units,
            Order_No: item.Order_No,
            Roll: item.Roll,
            Print_Date: item.Print_Date,
            Work_Order: item.Work_Order,
            Material_Type: item.Material_Type,
            Barcode: item.Barcode,
          }))
          const filteredDataInRowUps1 = rowUps.filter((oldItem) => {
            return !arr.some((newItem: any) => {
              return newItem.Barcode === oldItem.Barcode;
            });
          });
          const mergedDataInRowUps = [...filteredDataInRowUps1, ...arr];
          setrowUps(mergedDataInRowUps);
        }
      }).finally(() => {
        setIsLoading(false)
        setOpen(false)
        setDisabled(false)
        setIsApi(true)
      })
    }

  }

  const handleDelete = () => {
    setDisabled(true)
    setIsLoading(true)
    const url = connect_string + "api/Delete_Print_Cutting"
    const arr = listChx.map((item: any) => item.Barcode)
    const data = {
      dcpBarcode: arr,
      CGNO_Order_No: "",
      CLBH_Material_No: "",
      Arrival_QTY: "",
      ZLBH_Work_Order: "",
      chxResidual_supplies: false,
      chxReprint: chxRePrint,
      chxRY: chxRY,
      Size: "",
      CGDate_Date: "",
      dwbh_Units: "",
      get_version: dataUser[0].WareHouse
    }
    axios.post(url, data, config).then(response => {
      if (response.data === true) {
        const filteredArr1 = rowUps.filter((item1: any) => {
          return !listChx.some((item2: any) => item1.Barcode === item2.Barcode);
        });
        setrowUps(filteredArr1)
      }
      else {
        handleOpenConfirm('delete-error')
      }
    }).finally(() => {
      setIsLoading(false)
      setOpen(false)
      setDisabled(false)
    })
  }

  const handlePrint = async () => {
    if (await checkPermissionPrint(dataUser[0].UserId)) {
      if (listChx.length > 0) {
        handleOpenConfirm('print')
      }
      else {
        handleOpenConfirm('error-data')
      }
    }
    else {
      handleOpenConfirm('print-permission')
    }
  }

  const handlePrintOK = () => {
    handleOpenConfirm('print-success')
    setIsLoading(true);
    setDisabled(true);

    const url = connect_string + "api/btnPrint_Click_Print_Cutting"
    const data = listChx.map((item: any) => ({
      dcpBarcode: item.Barcode,
      USERID: dataUser[0].UserId,
      get_version: dataUser[0].WareHouse
    }))
    axios.post(url, data, config).then(response => {
      if (response.data === true) {

      }
      else {
        handleOpenConfirm('print-erorr')
      }
    }).finally(() => {
      setIsLoading(false);
      setDisabled(false);
    })
  }

  const handlleRefresh = () => {
    setListChx([])
    setrowDowns([])
    setrowUps([])
    dispatch(clearArrayRowDowns())

  }
  //#endregion

  return (
    <FullScreenContainerWithNavBar
      sideBarDisable={true}
      sideBarNavigate=""
      title={t("btnPrint_Decorate") as string}
      navigate={"/"}
    >
      <Box
        paddingX={1}
        paddingBottom={1}
        className={"dark-bg-secondary border-bottom-white"}
      >
        <Stack direction={"row"}>

          <Stack
            width={"50%"}
            spacing={1}
            paddingRight="30px"
            justifyContent={"center"}
            flexDirection="column"
            alignItems={"flex-end"}
          >
            <Grid>
              <InputField
                focus={true}
                label={t("dcmOrder_No") as string}
                handle={handleOrderNo}
                keydown=""
                value={orderNo}
                type={"text"}
                disable={disabled}

              />
            </Grid>
            <Grid>
              <InputField
                label={t("dcmWork_Order") as string}
                handle={handleWorkOrder}
                keydown=""
                value={workOrder}
                type={"text"}
                disable={disabled}
              />
            </Grid>

          </Stack>
          <Stack width={"45%"} justifyContent={"center"} spacing={1} >
            <Grid alignItems={"center"} >
              <InputField
                label={t("dcmMaterial_No") as string}
                handle={handleMaterialNo}
                keydown=""
                value={materialNo}
                type={"text"}
                disable={disabled}
              />
            </Grid>

            <Grid container columnSpacing={5} display={'flex'} alignItems={'center'}>
              <Grid item xs={1} >
                {isloading && <CircularProgress size={'24px'} color="info" />}
              </Grid>
              <Grid item >
                <FormControlLabel sx={styletext} className="text" control={<Checkbox sx={{ color: "white" }} value={""} />} label={t("dcpDDBH")} />
              </Grid>
              <Grid item >
                <FormControlLabel sx={styletext} className="text" control={<Checkbox sx={{ color: "white" }} value={chxRePrint} onChange={handleChxRePrint} />} label={t("chxReprint")} />
              </Grid>
              <Grid item >
                <FormControlLabel sx={styletext} className="text" control={<Checkbox sx={{ color: "white" }} value={chxRY} onChange={handleChxRY} />} label={t("chxAll")} checked />
              </Grid>
            </Grid>
          </Stack>
        </Stack>
        <Stack width={"100%"} direction={"row"} justifyContent={"center"} spacing={3} alignItems={'center'}>
          <MyButton name={t("btnSearch")} disabled={disabled} onClick={handleSearch} />
          <MyButton name={t("btnClean")} disabled={disabled} onClick={handlleRefresh} />
          <MyButton name={t("btnDelete")} disabled={disabled} onClick={handleDelete} />
          <MyButton name={t("btnPrint")} disabled={disabled} onClick={handlePrint} />
          <MyButton name={t("btnPrivewPrint")} disabled={disabled} onClick={() => setOpenPrintReview(true)} />
        </Stack>
        {openPrintReview && <Formprint rows={listChx} onClose={() => setOpenPrintReview(false)} open={openPrintReview} />}
        {open && <ModalCofirm onPressOK={handlePrint} onClose={() => setOpen(false)} open={open} title={t("msgCofirmPrint") as string} />}
        {cofirmType === 'delete-error' && <ModalCofirm title={t("msgDeleteError") as string} onClose={handleCloseConfirm} open={openCofirm} onPressOK={handleCloseConfirm} />}
        {cofirmType === 'print' && <ModalCofirm onPressOK={handlePrintOK} open={openCofirm} onClose={handleCloseConfirm} title={t("msgCofirmPrint") as string} />}
        {cofirmType === 'print-error' && <ModalCofirm title={t("msgPrintErrror") as string} onClose={handleCloseConfirm} open={openCofirm} onPressOK={handleCloseConfirm} />}
        {cofirmType === 'error-data' && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("msgChooseStamp") as string} />}
        {cofirmType === 'print-permission' && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("lblPrintPermission") as string} />}
      </Box>
      <Stack overflow={"hidden"} sx={{ height: "100%" }}>
        <Stack sx={{ height: "50%" }}>
          <TableCheckBox
            columns={columnsUp}
            rows={rowUps}
            listChx={(params: any) => setListChx(params)}
            arrNotShowCell={["_id"]}
          />
        </Stack>
        <Stack sx={{ height: "50%" }}>
          <TableDateTimePicker
            columns={columnsDown}
            rows={ArrayRowDowns}
            onDoubleClick={handleDoubleClick}
            arrEditCell={[
              "V_Total_Qty",
              "Roll",
              "ywpm_Material",
              "Arrial_Qty",
              "Color",
              "Size",
              "ZLBH_Work_Order",
              "CGDate_Date"
            ]}
            arrNotShowCell={["_id", "ywsm_Production", "zsdh_Supplier_No"]}
          />
        </Stack>
      </Stack>
    </FullScreenContainerWithNavBar>
  );
};

export default DataHistoryPrintScreen;
