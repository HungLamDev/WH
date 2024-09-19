//#region import
import FullScreenContainerWithNavBar from "../../../components/FullScreenContainerWithNavBar";
import {
  Box,
  Grid,
  FormControlLabel,
  Checkbox,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import DatePickerField from "../../../components/DatePickerField";
import InputField from "../../../components/InputField";
import MyButton from "../../../components/MyButton";
// import "./style.scss";
import { GridColDef } from "@mui/x-data-grid";
import moment, { Moment } from "moment";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { config, createConfig } from "../../../utils/api";
import { checkPermissionPrint } from "../../LoginScreen/ChooseFactory";
import { connect_string } from "../../LoginScreen/ChooseFactory";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { currentDay } from "../../../utils/date";
import { useDispatch } from "react-redux";
import { changeMonth } from "../../../redux/Datetimepicker";
import { useLocation } from "react-router-dom";
import TableOrigin from "../../../components/TableOrigin";
import { useTranslation } from "react-i18next";
import TableCheckBox from "../../../components/TableCheckBox";
import FormPrintSample from "../../../components/FormPrintSample";
import { styletext } from "../../StockinScreenv2/StockinForm";
import ModalCofirm from "../../../components/ModalConfirm";
import TableDateTimePicker from "../../../components/TableDateTimePicker";
import { clearArrayRowDowns, copyValues } from "../../../redux/ArrayRowDowns";
import { copyValuesRowUps, clearArrayRowUps, removeItemByBarcodeRowUps, changeItemsByBarcodeArrayRowUps, addItemRowUps, changeItemsArrayRowUps } from "../../../redux/ArrayRowUps";
import { clearArrayDeleteAndPrint, copyValuesArrayDeleteAndPrint, changeItemsByBarcodeArrayDeleteAndPrint } from "../../../redux/ArrayDeleteAndPrint";
import TableSample from "../../../components/TableSample";

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
      headerName: "State/Season", // State/Season
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
      field: "Production",
      headerName: t("dcpProduction") as string, // Ngày sản xuất
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "Work_Order",
      headerName: "Article", // Article
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "Material_Types",
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
    {
      field: "Type_Order",
      headerName: "", // Mã QR
      width: 160,
      headerClassName: "custom-header",
    },
  ];
  const columnsDown: GridColDef[] = [
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
      headerName: "Stage/Season", // Stage/Season
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "Print_QTY",
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
      field: "nhasx",
      headerName: t("dcpProduction") as string, // Ngày sản xuất
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "ZLBH_Work_Order",
      headerName: "Article", // Article
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
      headerName: "", //Name
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "Type_Order",
      headerName: "", //Name
      width: 160,
      headerClassName: "custom-header",
    },
  ];
  const columnsOrderNo: GridColDef[] = [

    {
      field: "CGNO_Order_No",
      headerName: t("dcmOrder_No") as string,
      width: 120,
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
  //#region  Cancel request axios
  const controllerRef = useRef(new AbortController());
  const configNew = createConfig(controllerRef.current.signal);
  // Func cancel Request
  const cancelRequest = () => {
    controllerRef.current.abort();
  };
  //#endregion

  const [open, setOpen] = useState(false)
  const [openPrintReview, setOpenPrintReview] = useState(false)
  const [isloading, setIsLoading] = useState(false)
  const [rowOrderNo, setrowOrderNo] = useState<any[]>([]);
  const [chxSize, setChxSize] = useState(false);
  const [chxResidual_supplies, setchxResidual_supplies] = useState(false)
  const [chxChange_Material, setChxChange_Material] = useState(false);
  const [chxAll_Outsource, setchxAll_Outsource] = useState(false);
  const [chxReprint, setchxReprint] = useState(false)
  const [chxPrintRY, setChxPrintRY] = useState(false);
  const [chxInventory, setChxInventory] = useState(false);
  const [txtOrderNo, setTxtOrderNo] = useState('')
  const [txtMaterial_No, setTxtMaterial_No] = useState('')
  const [txtInvoid_No, setTxtInvoid_No] = useState('')
  const [txtOutsource, setTxtOutsource] = useState('')
  const [listChxDown, setListChxDown] = useState<any[]>([])
  const [listChxOrder, setListChxOrder] = useState<any[]>([])
  const [dtpDateTo, setdtpDateTo] = useState(moment().format("YYYY/MM/DD"));
  const [openCofirm, setOpenCofirm] = useState(false)
  const [cofirmType, setCofirmType] = useState('')
  const [columnEdit, setColumnEdit] = useState('')
  //#endregion

  //#region Func OnChange Input
  const handleChxPrintRY = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChxPrintRY(event.target.checked);
  };

  const handlechxSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChxSize(event.target.checked);
    if (event.target.checked === true) {
      setColumnEdit('Size')
    }
    else {
      setColumnEdit('')
    }
  };

  const handlechxResidual_supplies = (event: React.ChangeEvent<HTMLInputElement>) => {
    setchxResidual_supplies(event.target.checked);
  };

  const handleChxChange_Material = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChxChange_Material(event.target.checked);
    if (event.target.checked === true) {
      setColumnEdit('CLBH_Material_No')
    }
    else {
      setColumnEdit('')
    }
  };

  const handlechxAll_Outsource = (event: React.ChangeEvent<HTMLInputElement>) => {
    setchxAll_Outsource(event.target.checked);
  };

  const handleChxInventory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChxInventory(event.target.checked);
  };

  const handlechxReprint = (event: React.ChangeEvent<HTMLInputElement>) => {
    setchxReprint(event.target.checked);
  };

  const handletxtOrderNo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTxtOrderNo(event.target.value);
  };
  const handlextMaterial_No = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTxtMaterial_No(event.target.value);
  };
  const handlextInvoid_No = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTxtInvoid_No(event.target.value);
  };
  const handlextOutsource = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTxtOutsource(event.target.value);
  };
  //#endregion

  //#region useEffect

  useEffect(() => {
    if (listChxOrder.length > 0) {
      const filteredListChx = ArrayRowDowns.filter((item: any) => {
        return listChxOrder.some(order => order.CGNO_Order_No === item.CGNO_Order_No);
      });
      setListChxDown(filteredListChx);
    } else {
      setListChxDown([]);
    }

  }, [listChxOrder]);

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
    if (txtOrderNo !== "" || txtMaterial_No !== "" || txtInvoid_No !== "" || txtOutsource !== "") {
      setOpen(true)
      setIsLoading(true)
      setListChxOrder([])
      setListChxDown([])
      dispatch(clearArrayRowDowns())

      const url = connect_string + "api/Search_Data_Print_Sample"
      const data = {
        txtInvoid_No: txtInvoid_No,
        txtOutsource: txtOutsource,
        txtOrderNo: txtOrderNo,
        txtMaterial_No: txtMaterial_No,
        RFID_ini: "",
        chxSize: chxSize,
        chxResidual_supplies: chxResidual_supplies,
        chxChange_Material: chxChange_Material,
        chxRY: false,
        chxAll_Outsourt: chxAll_Outsource,
        chxReprint: chxReprint,
        get_version: dataUser[0].WareHouse,
        Factory: dataUser[0].factoryName,
        cbxInventory: chxInventory

      }
      axios.post(url, data, configNew).then(response => {
        const arr = response.data.map((item: any, index: any) => ({
          _id: index,
          CLBH_Material_No: item.CLBH_Material_No,
          ywpm_Material: item.ywpm_Material,
          Color: item.Color,
          Size: item.Size,
          Print_QTY: item.Print_QTY,
          Arrial_Qty: item.Arrial_Qty,
          QTY: item.QTY,
          dwbh_Units: item.dwbh_Units,
          CGNO_Order_No: item.CGNO_Order_No,
          Roll: item.Roll,
          CGDate_Date: item.CGDate_Date,
          nhasx: item.ywsm_Production,
          ZLBH_Work_Order: item.ZLBH_Work_Order,
          cllb_Material_Type: item.cllb_Material_Type,
          zsdh_Supplier_No: item.zsdh_Supplier_No,
          zsywjc_Supplier: item.zsywjc_Supplier,
          Name_M: item.Name_M,
          Type_Order:item?.Type_Order
        })
        )
        console.log(arr)
        const arrfillter: any[] = [];

        response.data.forEach((item: any, index: any) => {
          if (!arrfillter.some(obj => obj.CGNO_Order_No === item.CGNO_Order_No)) {
            arrfillter.push({
              _id: index,
              CGNO_Order_No: item.CGNO_Order_No
            });
          }
        });
        dispatch(copyValues(arr))
        setrowOrderNo(arrfillter)
        // setrowDowns(arr)
      }).finally(() => {
        setIsLoading(false)
        setOpen(false)
      })
    }
  }

  const handleDoubleClick = (colname: string, item: any) => {
    // && listChxDown.includes(item)

    if (listChxDown) {
      setOpen(true)
      setIsLoading(true)
      const url = connect_string + "api/DoubleClick_Data_Print_Sample"
      const data =
      {
        txtInvoid_No: txtInvoid_No,
        txtOutsource: txtOutsource,
        txtOrderNo: txtOrderNo,
        txtMaterial_No: txtMaterial_No,
        RFID_ini: "",
        chxSize: chxSize,
        chxResidual_supplies: chxResidual_supplies,
        chxChange_Material: chxChange_Material,
        chxRY: false,
        chxAll_Outsourt: chxAll_Outsource,
        chxReprint: chxReprint,
        dcmCheck: true,
        User_Serial_Key: dataUser[0].UserId,
        dcmOrder_No: item.CGNO_Order_No,
        dcmMaterial_No: item.CLBH_Material_No,
        dcmMaterial_Type: item.cllb_Material_Type,
        dcmColor: item.Color,
        dcmUnit: item.dwbh_Units,
        dcmQty_ROLL: item.Print_QTY ? item.Print_QTY : "",
        dcmArrival_QTY: item.Arrial_Qty,
        dcmQTY: item.QTY,
        dcmRoll: item.Roll,
        dcmSize: item.Size,
        dcmMaterial: item.ywpm_Material,
        dcmProduction: item.nhasx,
        dcmWork_Order: item.ZLBH_Work_Order,
        dcmSupplier_no: item.zsdh_Supplier_No,
        dcmSupplier: item.zsywjc_Supplier,
        dcmDate: item.CGDate_Date,
        get_version: dataUser[0].WareHouse,
        Type_Order:item?.Type_Order

      }
      axios.post(url, data, configNew).then(response => {
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
            Print_Date: moment(item.Print_Date).format("DD/MM/YYYY"),
            Production: item.Production,
            Work_Order: item.Work_Order,
            Material_Types: item.Material_Types,
            Barcode: item.Barcode,
            Supplier_No: item.Supplier_No,
            Type_Order:item?.Type_Order
          }))

          const filteredDataInRowUps1 = ArrayRowUps.filter((oldItem: any) => {
            return !arr.some((newItem: any) => {
              return newItem.Barcode === oldItem.Barcode;
            });
          });

          const mergedDataInRowUps = [...filteredDataInRowUps1, ...arr];
          dispatch(copyValuesRowUps(mergedDataInRowUps));

          // setrowUps(mergedDataInRowUps);
        }
      }).finally(() => {
        setIsLoading(false)
        setOpen(false)
      })
    } else {
      handleOpenConfirm('checkdata')
      // alert('bạn phải check trước khi print')
    }
  }

  const handleDelete = () => {
    setOpen(true)
    setIsLoading(true)
    const url = connect_string + "api/Delete_Label_Sample"
    const data = ArrayDeleteAndPrint.map((item: any) => ({
      chxSize: chxSize,
      chxResidual_supplies: chxResidual_supplies,
      User_Serial_Key: dataUser[0].UserId,
      dcmCheck: true,
      dcpBarcode: item.Barcode,
      get_version: dataUser[0].WareHouse
    }))

    axios.post(url, data, configNew).then(response => {
      if (response.data === true) {
        const filteredArr1 = ArrayRowUps.filter((item1: any) => {
          return !ArrayDeleteAndPrint.some((item2: any) => item1.Barcode === item2.Barcode);
        });
        // setrowUps(filteredArr1)
        dispatch(copyValuesRowUps(filteredArr1));

      }
      else {
        handleOpenConfirm('delete-error')
      }
    }).finally(() => {
      setIsLoading(false)
      setOpen(false)
    })

  }

  const handlePrint = async () => {
    if (await checkPermissionPrint(dataUser[0].UserId)) {
      if (ArrayDeleteAndPrint.length > 0) {
        handleOpenConfirm('print')
      }
      else {
        handleOpenConfirm('print-error')
      }
    }
    else {
      handleOpenConfirm('print-permission')
    }

  }

  const handlePrintOK = () => {
    handleOpenConfirm('print-success')
    setOpen(true)
    setIsLoading(true)
    const url = connect_string + "api/Print_Sample_CLick"
    const data = ArrayDeleteAndPrint.map((item: any) => ({
      dcpBarcode: item.Barcode,
      User_Serial_Key: dataUser[0].UserId,
      Material_Name: item.Material_Name,
      Work_Order: item.Work_Order,
      dcpCheck: true,
      get_version: dataUser[0].WareHouse
    }))
    axios.post(url, data, config).then(response => {
      if (response.data === true) {

      }
      else {
        handleOpenConfirm('print-error')
      }
    }).finally(() => {
      setIsLoading(false)
      setOpen(false)
    })
  }


  const handleRefresh = () => {
    setListChxOrder([])
    setListChxDown([])
    dispatch(clearArrayRowDowns())
    dispatch(clearArrayRowUps())
    dispatch(clearArrayDeleteAndPrint())
  }

  //#endregion

  return (
    <FullScreenContainerWithNavBar
      sideBarDisable={true}
      sideBarNavigate=""
      title={t("frmPrint_Sample") as string}
      navigate={"/"}
      cancelRequest={cancelRequest}
    >
      <Box
        paddingX={1}
        paddingBottom={1}
        className={"dark-bg-secondary border-bottom-white"}
      >
        <Stack direction={"row"}>
          <Grid container>
            <Grid item display={'flex'} xs={4.5}>
              {/* Số phiếu */}
              <InputField
                focus={true}
                label={t("dcmOrder_No") as string}
                handle={handletxtOrderNo}
                keydown=""
                value={txtOrderNo}
                type={"text"}
                disable={isloading}
              />
            </Grid>
            <Grid item display={'flex'} xs={1.5}>
              {/* Check đơn tồn */}
              <FormControlLabel
                sx={styletext}
                className="text"
                control={<Checkbox sx={{ color: "white" }} value={chxInventory} onChange={handleChxInventory} />}
                label={t("cbxInventory")}
              />
            </Grid>
            <Grid item display={'flex'} xs={4.5}>
              {/* Đơn gia công */}
              <InputField
                label={t("lblOutsource") as string}
                handle={handlextOutsource}
                keydown=""
                value={txtOutsource}
                type={"text"}
                disable={isloading}
              />
            </Grid>
            <Grid item display={'flex'} xs={1.5}>
              {/* Check tất cả số phiếu bên phải*/}
              <FormControlLabel
                sx={styletext}
                className="text"
                control={<Checkbox sx={{ color: "white" }} value={chxAll_Outsource} onChange={handlechxAll_Outsource} />}
                label={t("chxAll")}
              />
            </Grid>
            <Grid item display={'flex'} xs={4.5}>
              {/* Mã vật tư */}
              <InputField
                label={t("dcmMaterial_No") as string}
                handle={handlextMaterial_No}
                keydown=""
                value={txtMaterial_No}
                type={"text"}
                disable={isloading}
              />
            </Grid>
            <Grid item display={'flex'} xs={1.5}>
              {/* Check size */}
              <FormControlLabel
                sx={styletext}
                className="text"
                control={<Checkbox sx={{ color: "white" }} value={chxSize} onChange={handlechxSize} />}
                label={"Size"}
              />
            </Grid>
            <Grid item display={'flex'} xs={4.5}>
              {/* Mã Invoice */}
              <InputField
                label={"Invoice"}
                handle={handlextInvoid_No}
                keydown=""
                value={txtInvoid_No}
                type={"text"}
                disable={isloading}
              />
            </Grid>
            <Grid item display={'flex'} xs={1.5}>
              {/* Check chuyển mã */}
              <FormControlLabel
                sx={{ width: "100%", display: "flex", ...styletext }}
                className="text"
                control={<Checkbox sx={{ color: "white" }} value={chxChange_Material} onChange={handleChxChange_Material} />}
                label={t("chxTranscoding")}
              />
            </Grid>
            <Grid item display={'flex'} xs={2}>
              {/* Check tất cả */}
              <FormControlLabel
                sx={styletext}
                className="text"
                control={<Checkbox checked sx={{ color: "white" }} />}
                label={t("chxAll")} />
            </Grid>
            <Grid item display={'flex'} xs={2.5}>
              {/* Check in lại */}
              <FormControlLabel
                sx={styletext}
                className="text"
                control={<Checkbox sx={{ color: "white" }} value={chxReprint} onChange={handlechxReprint} />}
                label={t("chxReprint")}
              />
            </Grid>
            <Grid item display={'flex'} xs={1.5}>
              {/* Check in lại RY */}
              <FormControlLabel
                sx={{ width: "100%", display: "flex", ...styletext }}
                className="text"
                control={
                  <Checkbox
                    sx={{ color: "white" }}
                    checked={chxPrintRY}
                    onChange={handleChxPrintRY}
                  />
                }
                label={t("chxReprint") + ' ' + t("chxRY") as string}
              />
            </Grid>
            {chxPrintRY ? (
              <>
                {/* Lệnh */}
                <Grid item xs={2.8} display={'flex'}>
                  <InputField label={t("dcpWork_Order") as string + "\u2002"} handle={null} keydown={null} value={""} />
                </Grid>
                {/* Chọn ngày */}
                <Grid item xs={1.5} display={'flex'}>
                  <DatePickerField onValueChange={dtpDateTo} />
                </Grid>

              </>
            ) : <Grid item xs={4.3} display={'flex'}></Grid>
            }
            <Grid item display={'flex'} xs={0.2}></Grid>
            <Grid item display={'flex'} xs={1.5}>
              {(dataUser[0].UserRole === 'Manager' || dataUser[0].UserRole === "Administrator") &&
                // Check in bù
                <FormControlLabel
                  sx={{ width: "100%", display: "flex", ...styletext }}
                  className="text"
                  control={<Checkbox sx={{ color: "white" }} value={chxResidual_supplies} onChange={handlechxResidual_supplies} />}
                  label={t("chxResidual_supplies")}
                />
              }
            </Grid>
          </Grid >
        </Stack>

        <Stack
          width={"100%"}
          direction={"row"}
          spacing={3}
          alignItems={"center"}
        >
          {/* Nút tìm kiếm */}
          <MyButton name={t("btnSearch")} onClick={handleSearch} disabled={isloading} />
          {/* Nút làm mới */}
          <MyButton name={t("btnClean")} onClick={handleRefresh} disabled={isloading} />
          {/* Nút xóa */}
          <MyButton name={t("btnDelete")} onClick={handleDelete} disabled={isloading} />
          {/* Nút in */}
          <MyButton name={t("btnPrint")} onClick={handlePrint} disabled={isloading} />
          {/* Nút xem trc khi in */}
          <MyButton name={t("btnPrivewPrint")} disabled={isloading} onClick={() => setOpenPrintReview(true)} />
          {open && <CircularProgress size={'24px'} color="info" />}
          {openPrintReview && <FormPrintSample rows={ArrayDeleteAndPrint} onClose={() => setOpenPrintReview(false)} open={openPrintReview} />}
          {/* {cofirmType === 'print' && <ModalCofirm title={t("msgPrintSuccess") as string} onClose={handleCloseConfirm} open={openCofirm} onPressOK={handleCloseConfirm} />} */}
          {cofirmType === 'print-error' && <ModalCofirm title={t("msgPrintErrror") as string} onClose={handleCloseConfirm} open={openCofirm} onPressOK={handleCloseConfirm} />}
          {cofirmType === 'print-permission' && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("lblPrintPermission") as string} />}
          {cofirmType === 'delete-error' && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("msgDeleteError") as string} />}
          {cofirmType === 'checkdata' && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("lblCheck") as string} />}
          {cofirmType === 'print' && <ModalCofirm onPressOK={handlePrintOK} open={openCofirm} onClose={handleCloseConfirm} title={t("msgCofirmPrint") as string} />}
        </Stack>
      </Box>
      <Stack overflow={"hidden"} sx={{ height: "100%" }}>
        <Stack sx={{ height: "50%" }}>
          <TableCheckBox
            columns={columnsUp}
            rows={ArrayRowUps}
            listChx={(params: any) => { dispatch(copyValuesArrayDeleteAndPrint(params)) }}
            arrNotShowCell={["_id", "Supplier_No"]}
          />
        </Stack>
        <Stack direction="row" sx={{ height: "50%" }}>
          <Stack width={'85%'} height={'100%'} >
            <TableSample
              columns={columnsDown}
              rows={ArrayRowDowns}
              onDoubleClick={handleDoubleClick}
              arrEditCell={[
                "Size",
                "Print_QTY",
                "Roll",
                "ywpm_Material",
                "Arrial_Qty",
                "nhasx",
                "CGDate_Date",
                "Color",
                "ZLBH_Work_Order"
              ]}
              dschx={listChxDown}
              arrNotShowCell={["_id", "zsdh_Supplier_No", "zsywjc_Supplier"]}
              columnEdit={columnEdit}
            />
          </Stack>
          <Stack width={'15%'} height={'100%'} sx={{ borderLeft: '2px solid white' }}>
            <TableCheckBox
              columns={columnsOrderNo}
              rows={rowOrderNo}

              onDoubleClick={null}
              listChx={(params: any) => setListChxOrder(params)}
              arrNotShowCell={["_id"]}
            />
          </Stack>
        </Stack>
      </Stack>
    </FullScreenContainerWithNavBar>
  );
};

export default DataHistoryPrintScreen;
