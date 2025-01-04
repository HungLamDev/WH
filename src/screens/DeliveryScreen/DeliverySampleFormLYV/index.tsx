//#region  import
import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react'
import { IconButton, Box, Stack, Typography, Divider, Grid, Checkbox, FormControlLabel, FormGroup, TextField, Button, Modal, MenuItem, Autocomplete, CircularProgress, Backdrop } from "@mui/material";
import { GridColDef } from '@mui/x-data-grid';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import FullScreenContainerWithNavBar from "../../../components/FullScreenContainerWithNavBar";
import MyButton from "../../../components/MyButton";
import { useState } from "react";
import moment from 'moment';
import { connect_string } from '../../LoginScreen/ChooseFactory';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next";
import * as ExcelJS from "exceljs";
import { listSupplier } from '../Data';
import ModalCofirm from '../../../components/ModalConfirm';
import { createConfig, config } from '../../../utils/api';
import InputFieldV1 from '../../../components/InputField/index_new';
import ImportAndExport from '../../StockinScreenv2/ModelImportandExport';
import TableStockOut from '../../../components/TableStockOut';
import { addTotalQtyOut, clearTotalQtyOut } from "../../../redux/TotalQtyOut";
import { addItemArrayStockout, removeArrayStockoutByBarcode, copyValuesArrayStockout, clearArrayStockout } from "../../../redux/ArrayStockout";
import useDebounced from '../../../components/CustomHook/useDebounce';
import Decimal from 'decimal.js';
import './sidebar.scss'
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ERPLogin from '../../../components/ERPLogin';
import LogoutIcon from '@mui/icons-material/Logout';
import { clearUserERP } from '../../../redux/UserERP';
import EnterIcon from '../../../assets/enter.png'
import TableOrigin from '../../../components/TableOrigin';
import TableOriginEdit from '../../../components/TableOriginEdit';
import { barcodeToMaterial, handleCheckUserERP, isEmptyOrNull } from '../../../utils/api_global';
import { random, result, set } from 'lodash';
import MyTableNew from '../../../components/MyTableNew';
import Statistics from '../../StockinScreenv2/StatisticsForm';
import ConfirmDelivery from '../../../components/ConfirmDelivery';
import CreateMergeBom from './CreateMergeBOMForm';
import ReturnStamp from '../../../components/ReturnStamp';
import GenericAutocomplete from '../../../components/GenericAutocomplete';
import QRScannerV1 from '../../../components/QRScanner/indexV1';
import { styletext } from '../../StockinScreenv2/StockinForm';
import SampleSearchERP from '../../SampleSearchERP';

//#endregion

const DeliverySampleLYVScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const stockout = location.state && location.state.data;

  //#region  Style
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '70%',
    width: '25%',
    bgcolor: '#1c2538',
    border: '2px solid white',
    borderRadius: 3,
    boxShadow: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingX: '20px'
  };
  //#endregion

  //#region column header table
  const columns: any[] = [
    // {
    //   field: "TestNo",
    //   headerName: "Test No",
    //   align: "center",
    //   headerAlign: 'center',
    //   width: 150,

    // },
    {
      field: "PONO",
      headerName: "PONO",
      align: "center",
      headerAlign: 'center',
      width: 150,

    },
    {
      field: "Material_No",
      headerName: "Material No",
      align: "center",
      headerAlign: 'center',
      width: 150,
    },
    {
      field: "Barcode",
      headerName: "Barcode",
      align: "center",
      headerAlign: 'center',
      width: 150,
      hightlight: true

    },
    {
      field: "QTY_Bom",
      headerName: "QTY Bom",
      align: "center",
      headerAlign: 'center'
    },
    {
      field: "QTY_Sample",
      headerName: "QTY Sample",
      align: "center",
      headerAlign: 'center'
    },
    {
      field: "Size",
      headerName: "Size",
      align: "center",
      headerAlign: 'center',
      width: 150,

    },
    {
      field: "KFJD",
      headerName: "Stage",
      align: "center",
      headerAlign: 'center',
      width: 150,

    },
    {
      field: "YPZLBH",
      headerName: "Merge No",
      align: "center",
      headerAlign: 'center',
      width: 150,

    },
    {
      field: "LLNO",
      headerName: t("dcpOrder_No_Out"),
      align: "center",
      headerAlign: 'center',
      width: 150,

    },
    {
      field: "User_ID",
      headerName: "User ID",
      align: "center",
      headerAlign: 'center',
      width: 150,

    },
    {
      field: "Modify_Date",
      headerName: t("dcpModify_Date"),
      align: "center",
      headerAlign: 'center',
      width: 150,

    },

  ];

  const columnsBOM: GridColDef[] = [
    {
      field: "MatNo",
      headerName: "Material No",
      align: "center",
      headerAlign: 'center',
      width: 180,

    },
    {
      field: "MJBH",
      headerName: "MJBH",
      align: "center",
      headerAlign: 'center',
      width: 150,

    },
    {
      field: "USAGE",
      headerName: "USAGE",
      align: "center",
      headerAlign: 'center',
      width: 150,

    },
    {
      field: "Qty",
      headerName: "Qty",
      align: "center",
      headerAlign: 'center',
    },
    {
      field: "Unit",
      headerName: "Unit",
      align: "center",
      headerAlign: 'center'

    },
    {
      field: "SIZE",
      headerName: "SIZE",
      align: "center",
      headerAlign: 'center'

    },
    {
      field: "SuppID",
      headerName: "Supplier	ID",
      align: "center",
      headerAlign: 'center',
      width: 150,

    },
    {
      field: "Supplier",
      headerName: "Supplier",
      align: "center",
      headerAlign: 'center',
      width: 150,

    },
    {
      field: "ARTICLE",
      headerName: "ARTICLE",
      align: "center",
      headerAlign: 'center',
      width: 150,

    },
    {
      field: "MatName",
      headerName: "Material Name",
      align: "center",
      headerAlign: 'center',
      width: 150,
    },
  ];
  //#endregion

  //#region useSelector
  const dataUser = useSelector((state: any) => state.UserLogin.user);
  const dataUserERP = useSelector((state: any) => state.UserERP.user);
  const ArrayStockout = useSelector((state: any) => state.ArrayStockout.items);
  const TotalQtyOut = useSelector((state: any) => state.TotalQtyOut.items);
  const dataFOC = useSelector((state: any) => state.FOC.foc);

  //#endregion

  //#region Variable
  //#region  Cancel request axios
  const controllerRef = useRef(new AbortController());
  const configNew = createConfig(controllerRef.current.signal);
  const cancelRequest = () => {
    controllerRef.current.abort();
  };
  //#endregion
  const [disable, setDisable] = useState(false)
  const [totalqtyout, setTotalQtyOut] = useState('')
  const dataModal = {
    Value_Remain: "",
    chxColor: false, // nếu có check xuất theo màu thì bằng true khong thì false
    rbtColor_A: false,
    rbtColor_B: false,
    rbtColor_C: false,
    rbtColor_D: false,
    rbtColor_E: false,
    rbtColor_F: false,
    rbtColor_G: false,
    rbtColor_H: false,
    rbtColor_O: false,
  }
  const [open, setOpen] = useState(false)
  const [modalName, setModalName] = useState('')
  const [modalCofirm, setModalCofirm] = useState(false)
  const [qrcodedelte, setQRCodeDelete] = useState('')
  const [Material_Label_Serial, setMaterial_Label_Serial] = useState('')
  const [valuetotal, setValueTotal] = useState('')
  const [cofirmType, setCofirmType] = useState('')
  const [openCofirm, setOpenCofirm] = useState(false)
  const [qrcode, setQRCode] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState<any>('')
  const [rows, setRows] = useState([])
  const [stockoutDetailValue, setStockOutDetailValue] = useState(stockout && stockout[0].Value_Qty)
  const [stockoutTemp, setStockOutTemp] = useState(stockout && stockout[0].Value_Qty)
  const [message, setMessage] = useState('')
  const [openERPLogin, setOpenERPLogin] = useState(false)
  const [PO_NOAndTestNo, setPO_NOAndTestNo] = useState<any>("")
  const [listMaterialBOM, setListMaterialBOM] = useState([])
  const [listMaterialStockout, setListMaterialStockout] = useState<any[]>([])
  const [article, setArticle] = useState("")
  const [kfjd, setKFJD] = useState("")
  const [mergeNo, setMerNo] = useState("")
  const [testNo, setTestNo] = useState("")
  const [qtyOutSample, setQtyOutSample] = useState<any>({})
  const [isOpenSidebar, setIsOpenSibar] = useState(true)
  const [isLoadingCreateSlip, setIsLoadingCreateSlip] = useState(false)
  const sidebarRef = useRef<SidebarRef>(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [focusedInputId, setFocusedInputId] = useState<string | null>(null);

  //#endregion

  //#region Func OnChange Input
  const handleClose = () => {
    setModalName('')
    setOpen(false);
  };

  const handleOpen = (name: string) => {
    setModalName(name)
    setOpen(true);
  }

  const handleOpenConfirm = (confirmName: string) => {
    setCofirmType(confirmName)
    setOpenCofirm(true)
  }

  const handleCloseConfirm = () => {
    setCofirmType('')
    setOpenCofirm(false)
  }



  const handleQRcode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQRCode(event.target.value);
  };

  //#endregion

  //#region useDebounced
  const debouncedSearchTerm = useDebounced(qrcode, 200);
  useEffect(() => {
    //Phiên bản có kiểm tra chất lượng vật tư
    if (debouncedSearchTerm.length >= 15) {
      handleOutAll(debouncedSearchTerm)
    }
  }, [debouncedSearchTerm]);

  //#endregion

  //#region Func Logic

  const handleOutAll = (barcode: string) => {
    setDisable(true)
    setIsLoading(true)

    barcodeToMaterial(barcode).then(value => {
      const QTY_BOM = listMaterialBOM
        .filter((item: any) => item.MatNo === value.Material_No)
        .reduce(
          (accumulator: Decimal, currentValue: any) =>
            accumulator.plus(new Decimal(currentValue.Qty)),
          new Decimal(0)
        );

      const QTY_Da_Xuat = listMaterialStockout
        .filter((item) => item.Material_No === value.Material_No)
        .reduce(
          (accumulator: Decimal, currentValue: any) =>
            accumulator.plus(new Decimal(currentValue.QTY_Sample)),
          new Decimal(0)
        )


      const QTY_Dinh_Muc = (QTY_BOM.minus((new Decimal(value.QTY).plus(QTY_Da_Xuat)))).toNumber()

      const checkBarcode = listMaterialBOM.some((item: any) => item.MatNo === value.Material_No)


      if (listMaterialBOM.length === 0) {
        handleOpenConfirm("no-list-bom")
      }
      else if (checkBarcode === false && value.Material_No !== null) {
        handleOpenConfirm("no-material")
      }
      else if (value?.Stock_In_Out_Status.toLowerCase().includes("in") && QTY_Dinh_Muc < 0) {
        handleOpenConfirm("no-stockout")
      }
      else if (listMaterialBOM.length > 0 && checkBarcode === true && value?.Stock_In_Out_Status.toLowerCase().includes("in")) {

        // Xuất ngoài
        if (!stockout) {
          const data = {
            Version_ini: dataFOC === true ? "FOC" : dataUser[0].WareHouse,
            txtScan: barcode,
            User_Serial_Key: dataUser[0].UserId,
            get_version: dataFOC === true ? "FOC" : dataUser[0].WareHouse
          }
          const url = connect_string + 'api/getData_TextChange_Stock_Out'
          axios.post(url, data, config).then(response => {
            if (response.data.Barcode !== null) {
              const item = response.data;
              const newItem = {
                _id: item.Barcode,
                Barcode: item.Barcode,
                Material_No: item.Material_No,
                Supplier: item.Supplier,
                Material_Name: item.Material_Name,
                Color: item.colorValue,
                Size: item.Size,
                QTY: item.QTY,
                Print_QTY: item.Print_QTY,
                Order_No: item.Order_No,
                Roll: item.Roll,
                Production: item.Production,
                Supplier_No: item.Supplier_No,
                Work_Order: item.Work_Order,
                ngay: moment(item.Modify_Date).format("DD/MM/YYYY HH:mm:ss"),
                Modify_Date: moment(item.Modify_Date).format("DD/MM/YYYY HH:mm:ss"),
                User_Serial_Key: item.User_Serial_Key,
                Value_Total: item.Value_Total,
                Material_Label_Serial: item.Material_Label_Serial,
              };
              Insert_Material_Stock_Out_Sample(newItem.Material_No, newItem.Barcode, newItem.QTY, newItem.User_Serial_Key, PO_NOAndTestNo?.PONO, PO_NOAndTestNo?.TestNo, mergeNo, article, QTY_BOM, kfjd, value.size)
              // dispatch(addItemArrayStockout(newItem));
              // dispatch(addTotalQtyOut(response.data.Value_Qty_Out))
              setQRCode('')
            }
          }).finally(() => {
            setDisable(false)
            setIsLoading(false)
          })

        }
        // Xuất giao hàng
        else {
          const url = connect_string + 'api/getData_TextChange_Stock_Out_Detail'
          const data = {
            txtScan: barcode,
            User_Serial_Key: dataUser[0].UserId,
            txtQty: "",
            Value_Qty_Out: "",
            Value_Total: "",
            Value_Remain: stockout[0].Value_Qty,
            Check_ScanMore: rows.findIndex((item: any) => item.Barcode == qrcode) != -1, //nếu tồn tại barcode trong bảng thì true không thì fale
            chxColor: false, // nếu có check xuất theo màu thì bằng true khong thì false
            rbtColor_A: false,
            rbtColor_B: false,
            rbtColor_C: false,
            rbtColor_D: false,
            rbtColor_E: false,
            rbtColor_F: false,
            rbtColor_G: false,
            rbtColor_H: false,
            rbtColor_O: false,
            get_version: dataUser[0].WareHouse
          }
          axios.post(url, data, config).then(response => {
            if (response.data.Barcode !== null) {

              response.data.map((item: any, index: any) => {
                const newItem = {
                  _id: item.Barcode,
                  Barcode: item.Barcode,
                  Material_No: item.Material_No,
                  Supplier: item.Supplier,
                  Material_Name: item.Material_Name,
                  Color: item.colorValue,
                  Size: item.Size,
                  QTY: item.QTY,
                  Print_QTY: item.Print_QTY,
                  Order_No: item.Order_No,
                  Roll: item.Roll,
                  Production: item.Production,
                  Supplier_No: item.Supplier_No,
                  Work_Order: item.Work_Order,
                  ngay: moment(item.Modify_Date).format("DD/MM/YYYY HH:MM:SS"),
                  User_Serial_Key: item.User_Serial_Key,
                  Value_Total: item.Value_Total,
                  Material_Label_Serial: item.Material_Label_Serial,
                  Modify_Date: moment(item.Modify_Date).format("DD/MM/YYYY HH:MM:SS"),
                };

                // dispatch(addItemArrayStockout(newItem));
                Insert_Material_Stock_Out_Sample(newItem.Material_No, newItem.Barcode, newItem.QTY, newItem.User_Serial_Key, PO_NOAndTestNo?.PONO, PO_NOAndTestNo?.TestNo, mergeNo, article, QTY_BOM, kfjd, value.size)

                if (response.data[0].Material_No === stockout[0].Value_Material) {
                  dispatch(addTotalQtyOut(response.data[0].Value_Qty_Out))
                  const result = new Decimal(stockoutTemp).minus(response.data[0].Value_Qty_Out).toNumber();
                  setStockOutDetailValue(result)
                }
              });

              // Làm tròn 4 chữ số trừ tổng
              setQRCode('')

              const totalQtyOut = new Decimal(TotalQtyOut);
              const valueRemain = new Decimal(response.data[0].Value_Remain);
              const valueTotal = totalQtyOut.minus(valueRemain).toString();

              setValueTotal(valueTotal)
            }
            else {
              handleOpenConfirm('materialOut')
            }
          }).finally(() => {
            setDisable(false)
            setIsLoading(false)
          })
        }
      }
    }).finally(() => {
      setDisable(false)
      setIsLoading(false)
      setQRCode("")
    })
  }

  const handleRefresh = () => {
    if (sidebarRef.current) {
      sidebarRef.current.refreshData();
    }
  };

  // Gom hàng khi PO và Material No giống nhau
  const addOrUpdateMaterialStockout = (prev: any[], newItem: any) => {
    handleRefresh()
    // Tìm xem đã có phần tử nào trong mảng trong không, nếu ko có trả về -1
    const existingItemIndex = prev.findIndex(
      (item) => item.TestNo === newItem.TestNo && item.Material_No === newItem.Material_No
    );

    // Nếu khác -1 thì gom hàng
    if (existingItemIndex !== -1) {
      return prev.map((item, index) => {
        if (index === existingItemIndex) {
          return {
            ...item,
            Size: newItem.Size + "\r\n" + item.Size,
            Barcode: newItem.Barcode + "\r\n" + item.Barcode,
            QTY_Sample: new Decimal(item.QTY_Sample).plus(new Decimal(newItem.QTY_Sample)).toNumber(),
            Modify_Date: newItem.Modify_Date + "\r\n" + item.Modify_Date,
          };
        }
        return item;
      });
    }
    // Ngược lại thì ko
    else {
      return [newItem, ...prev];
    }
  };

  const Insert_Material_Stock_Out_Sample =
    (Material_No: string,
      Barcode: string,
      QTY_Sample: string,
      User_ID: string,
      PO_NO: string,
      TestNo: string,
      YPZLBH: string,
      Article: string,
      QTY_BOM: any,
      KFJD: any,
      Size: any) => {
      const url = connect_string + "api/insert_Key_Material_Stock_Out_Sample"
      const data = {
        Material_No: Material_No,
        Barcode: Barcode,
        QTY_Sample: QTY_Sample,
        User_ID: User_ID,
        PONO: PO_NO,
        TestNo: TestNo,
        YPZLBH: YPZLBH,
        Article: Article,
        QTY_Bom: QTY_BOM,
        Size: Size,
        KFJD: KFJD
      }

      axios.post(url, data).then(res => {
        if (res?.data?.Material_No !== null) {
          const _id = Math.floor(Math.random() * 10000000) + 1;
          const newItem = {
            ...res.data,
            _id: _id,
            Barcode: res.data.Barcode + " ➪ " + res.data.QTY_Sample,
            // Modify_Date: res.data.Modify_Date,
            // PONO: res.data.PONO,
            // Material_No: res.data.Material_No,
            // QTY_Bom: res.data.QTY_Bom,
            // QTY_Sample: res.data.QTY_Sample,
            // User_ID: res.data.User_ID,
            // Article: res.data.Article
          }

          // if (newItem.QTY_Bom !== "" && ((new Decimal(newItem.QTY_Bom).toNumber() - new Decimal(newItem.QTY_Sample).toNumber()) === 0)) {

          //   const UpdatelistMaterialBOM = listMaterialBOM.map((item: any) => {
          //     if (item.MatNo === newItem.Material_No) {
          //       return {
          //         ...item,
          //         Status: "done",
          //       };
          //     }
          //     return item;
          //   }).sort((a: any, b: any) => {
          //     const statusComparison = b.Status.localeCompare(a.Status);
          //     if (statusComparison !== 0) return statusComparison;

          //     return b.MJBH.localeCompare(a.MJBH);
          //   });
          //   setListMaterialBOMFilter(UpdatelistMaterialBOM)
          // }

          setListMaterialStockout((prev: any[]) => addOrUpdateMaterialStockout(prev, newItem));
        }
      })
    }

  //Tô màu dòng trong bảng------------------------------------------
  const paintingRow = (item: any, row: any) => {


    if (row.Material_No !== null && row.QTY_Bom !== "" && ((new Decimal(row.QTY_Bom).minus(new Decimal(row.QTY_Sample))).toNumber() !== 0)) {
      return "orange"
    }

    return "white"
  };


  const highlightText = (item: any, row: any) => {
    if (typeof item !== "string") {
      return item;
    }

    // Chuyển `row.Barcode` từ chuỗi thành mảng
    const barcodes = row?.Barcode?.split("\r\n");

    // Tạo regex từ mảng `barcodes`
    const regex = new RegExp(`(${barcodes?.join("|")})`, "gi");

    // Tách `item` thành các phần dựa trên regex
    const parts = item.split(regex); // Loại bỏ dấu '*' trong chuỗi

    return (
      <>
        {parts.map((part: any, index: any) => (
          <React.Fragment key={index}>
            {part.includes("*") ? (
              <span style={{ color: "lightgreen" }}>{part.replace(/\*/g, "")}</span>
            ) : (
              part
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  //----------------------------------------------------------------

  const handleCreateSlip = (value: any) => {
    handleCloseConfirm()
    if (
      !isEmptyOrNull(value?.CKBH || "") &&
      !isEmptyOrNull(mergeNo) &&
      !isEmptyOrNull(dataUser[0]?.UserId) &&
      !isEmptyOrNull(dataUser[0]?.factoryName)
    ) {
      setIsLoadingCreateSlip(true)
      const url = connect_string + "api/creat_Stock_Out_No"
      const data = {
        Factory: dataUser[0]?.factoryName,
        Cb_WH: value?.CKBH || "",
        User_ID: dataUser[0]?.UserId,
        MergeNo: mergeNo
      }

      axios.post(url, data).then(res => {
        if (res.data === true) {
          sidebarRef.current?.refreshMaterial_Stock_Out_Sample()
          handleOpenConfirm("insert-slip-sucess")
        }
        else {
          handleOpenConfirm("insert-slip-error")
        }
      }).finally(() => {
        setIsLoadingCreateSlip(false)
      })
    }
    else {
      handleOpenConfirm("no-information")
    }
  }

  const handleGet_qty_out_Sample = (value: any, materialNo: any) => {
    const url = connect_string + "api/get_qty_out_Sample"
    const data = {
      PONO: value?.PONO,
      TestNo: value?.TestNo,
      barcode: "",
      Material_No: materialNo
    }
    axios.post(url, data).then(res => {
      const data = {
        Material_No: materialNo,
        QTY: res.data
      }
      setQtyOutSample(data)
    })
  }

  const handleFocus = (id: string) => {
    setFocusedInputId(id);
  };

  const handleScan = (data: any | null) => {
    if (data && focusedInputId) {
      setTimeout(() => {
        const inputElement = document.getElementById(focusedInputId) as HTMLInputElement;
        if (inputElement) {
          if (focusedInputId === "scan-po") {
            sidebarRef.current?.setPoNoValue(data?.text)
          }
          else if (focusedInputId === "scan-stock-out") {
            setQRCode(data?.text)
          }
        }
      }, 500); // Độ trễ 500ms
    }
  };

  //#endregion
  return (
    <FullScreenContainerWithNavBar
      hidden={true}
      sideBarDisable={true}
      onShowScan={() => setIsScannerOpen(true)}
      sideBarNavigate='/history-delivery-sample-lyv'
      title={t("lblStock_Out") + " " + t("btnAccounting_Sample")}
      navigate="/"
      cancelRequest={cancelRequest}>
      <Stack style={{ height: '100%', borderTop: '1px solid rgba(255,255,255, 0.5)', overflow: 'hidden' }}>
        <Stack style={{ position: 'relative', height: '100%', }}>
          {/* Phần Merge BOM */}
          <Sidebar
            column={columnsBOM}
            PO_NOAndTestNo={(value: any) => setPO_NOAndTestNo(value)}
            listMaterialBOM={(value: any) => setListMaterialBOM(value)}
            listMaterialStockOut={(value: any) => setListMaterialStockout(value)}
            Article={(value: any) => setArticle(value)}
            ref={sidebarRef}
            KFJD={(value: any) => setKFJD(value)}
            MergeNo={(value: any) => setMerNo(value)}
            TestNo={(value: any) => setTestNo(value)}
            isOpenSidebar={(value: any) => setIsOpenSibar(value)}
            get_qty_out_Sample={handleGet_qty_out_Sample}
            handleFocusInput={(id: any) => handleFocus(id)}
          />
          <div className="main-content">
            <Box
              className={"dark-bg-secondary border-bottom-white"}
              style={{
                flexShrink: 0,
                minHeight: isOpenSidebar === true ? 'calc(80dvh/ 3)' : 'calc(80dvh/ 5)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Stack direction={'row'} height={'100%'}>
                <Stack direction={'row'} width={'100%'} padding={0.5} height={'100%'} alignItems={'flex-end'}>
                  <Stack padding={0.5} width={'100%'} gap={1} flexDirection={isOpenSidebar === true ? 'column' : 'row'}>
                    <Grid container >
                      <Grid item xs={12} display={'flex'}>
                        {/* Test No */}
                        <Stack direction={'row'} justifyContent={'center'} width={'100%'} >
                          <span className='textsize' style={{ color: 'orangered', width: '50%' }}>{mergeNo ? "Merge No: " + mergeNo : ""}</span>
                          <span className='textsize' style={{ color: 'orangered', width: '50%' }}>{testNo ? "Test No: " + testNo : ""}</span>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} display={'flex'}>
                        {/* Merge No */}
                        <Stack direction={'row'} justifyContent={'space-evenly'} width={'100%'} >
                          <span className='textsize' style={{ color: 'orangered', width: '50%' }}>{qtyOutSample?.Material_No ? "Material No: " + qtyOutSample?.Material_No : ""}</span>
                          <span className='textsize' style={{ color: 'orangered', width: '50%' }}>{qtyOutSample?.QTY ? "QTY: " + qtyOutSample?.QTY : ""}</span>
                        </Stack>
                      </Grid>
                      <Grid item xs={isOpenSidebar === true ? 10 : 8}>
                        {/* Scan xuất */}
                        <InputFieldV1
                          xsLabel={2}
                          xsInput={9}
                          label={t("gpbScan") as string}
                          disable={disable}
                          value={qrcode}
                          handle={handleQRcode}
                          id='scan-stock-out'
                          handleOnFocus={() => handleFocus("scan-stock-out")}
                        />
                      </Grid>
                      <Grid item display={'flex'} alignItems={'center'} xs={1}>
                        {isLoading && <CircularProgress size={'24px'} color='info' />}
                      </Grid>
                    </Grid>
                    <Grid container direction={'row'} gap={'10px'} justifyContent={isOpenSidebar === true ? 'center' : 'flex-start'} >
                      {/* Xuất chi tiết */}
                      <Grid item display={'flex'} alignItems={'flex-end'} xs={2}>
                        <MyButton height='2rem' name={t("dcpExport")} onClick={() => handleOpen('ImportAndExport')} disabled={disable} />
                        {modalName === 'ImportAndExport' && <ImportAndExport listMaterialStockout={listMaterialStockout} KFJD={kfjd} PoNoAndTestNo={PO_NOAndTestNo} MergeNo={mergeNo} Article={article} listMaterialBOM={listMaterialBOM} dataColor={dataModal} onClose={handleClose} open={open} form={'stockout'} Insert_Material_Stock_Out_Sample={Insert_Material_Stock_Out_Sample} />}
                      </Grid>

                      <Grid item display={'flex'} alignItems={'flex-end'} xs={2}>
                        {/* Thống kê */}
                        <MyButton height='2rem' name={t("btnStatistical")} onClick={() => handleOpen('Statistics')} disabled={disable} />
                        {modalName === 'Statistics' && <Statistics open={open} onClose={handleClose} materialNo='' />}
                      </Grid>
                      <Grid item display={'flex'} alignItems={'flex-end'} xs={2}>
                        {/* Tem xuất */}
                        <MyButton height='2rem' name={t("btnExportStamp")} onClick={() => handleOpen('ReturnStamp')} disabled={disable} />
                        {modalName === 'ReturnStamp' && <ReturnStamp open={open} onClose={handleClose} />}
                      </Grid>
                      <Grid item display={'flex'} alignItems={'flex-end'} xs={2}>
                        {/* Tìm ERP */}
                        <MyButton height='2rem' name={"Xem ERP"} onClick={() => handleOpen('SearchERPSample')} disabled={disable} />
                        {modalName === 'SearchERPSample' && <SampleSearchERP open={open} onClose={handleClose} />}
                      </Grid>
                    </Grid>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
            <Stack sx={{ height: '100%', overflow: 'hidden' }}>
              {/* Bảng */}
              <MyTableNew
                columns={columns}
                rows={listMaterialStockout}
                checkBox={false}
                paintingRow={paintingRow}
                highlightText={highlightText}
              />
              <Stack alignItems={'flex-end'} paddingRight={'10px'}>
                {/* Tạo phiếu */}
                <MyButton height='2rem' name={t('btnCreate')} onClick={() => handleOpenConfirm("create-slip")} disabled={disable} />
              </Stack>
            </Stack>
            {/* Loading khi tạo phiếu */}
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={isLoadingCreateSlip}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </div>
        </Stack>
        {cofirmType === "no-list-bom" && <ModalCofirm showOk={false} open={openCofirm} onClose={handleCloseConfirm} title={t("lblNoBOM") as string} />}
        {cofirmType === "no-material" && <ModalCofirm showOk={false} open={openCofirm} onClose={handleCloseConfirm} title={t("lblNoMaterial") as string} />}
        {cofirmType === "no-stockout" && <ModalCofirm showOk={false} open={openCofirm} onClose={() => { handleCloseConfirm(), setQRCode("") }} title={t("lblNoStockOut") as string} />}
        {cofirmType === "insert-slip-sucess" && <ModalCofirm showOk={false} open={openCofirm} onClose={handleCloseConfirm} title={t("btnCreateSlipSucess") as string} />}
        {cofirmType === "insert-slip-error" && <ModalCofirm showOk={false} open={openCofirm} onClose={handleCloseConfirm} title={t("lblCreateSlipError") as string} />}
        {cofirmType === "no-information" && <ModalCofirm showOk={false} open={openCofirm} onClose={handleCloseConfirm} title={t("msgCompleteInformation") as string} />}
        {cofirmType === "create-slip" && <ConfirmDelivery onPressOK={handleCreateSlip} open={openCofirm} onClose={handleCloseConfirm} title={t("lblConfirmCreateSlip") as string} />}
        {/* Quét Camera */}
        {isScannerOpen && <QRScannerV1 onScan={handleScan} open={isScannerOpen} onClose={() => { setIsScannerOpen(false); }} />}
      </Stack>
    </FullScreenContainerWithNavBar>
  )
}

interface SidebarProps {
  column: any,
  PO_NOAndTestNo: any,
  listMaterialBOM: any,
  listMaterialStockOut: any,
  Article: any,
  KFJD: any,
  MergeNo: any,
  TestNo: any,
  isOpenSidebar: any,
  get_qty_out_Sample: any,
  handleFocusInput: any
}

interface SidebarRef {
  refreshData: () => void;
  refreshMaterial_Stock_Out_Sample: () => void;
  setPoNoValue: (value: any) => void
}

//#region Tạo BOM
const Sidebar = forwardRef<SidebarRef, SidebarProps>((props, ref) => {
  const {
    column,
    PO_NOAndTestNo,
    listMaterialBOM,
    listMaterialStockOut,
    Article,
    KFJD,
    MergeNo,
    TestNo,
    isOpenSidebar,
    get_qty_out_Sample,
    handleFocusInput
  } = props
  const { t } = useTranslation();

  //#region Variable
  const [isOpen, setIsOpen] = useState(true);
  const [openCreateBOM, setOpenCreateBOM] = useState(false);
  const [valueAutocomplete, setValueAutocomplete] = React.useState<any>(null);
  const [listSampleOrder, setListSampleOrder] = useState<any[]>([])
  const [listDataWaiting, setListDataWaiting] = useState<any[]>([])
  const [PoNo, setPoNo] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [disable, setDisable] = useState(false)
  const [infoPO, setInfoPO] = useState<any>({})
  const [listWH, setListWH] = useState<any[]>([])
  const [checkSole, setCheckSole] = useState(false)
  const [loadingState, setLoadingState] = useState(false)
  const [loadingAll, setLoadingAll] = useState("")
  const [onFocus, setOnFocus] = useState(false)

  //#endregion

  //#region ref
  useImperativeHandle(ref, () => ({
    refreshData,
    refreshMaterial_Stock_Out_Sample,
    setPoNoValue
  }));

  const refreshData = () => {
    getDataWaiting(valueAutocomplete);
  };

  const refreshMaterial_Stock_Out_Sample = () => {
    get_Material_Stock_Out_Sample(valueAutocomplete)
  };

  const setPoNoValue = (value: any) => {
    setPoNo(value)
  }

  //#endregion


  //#region useSelector
  const dataUser = useSelector((state: any) => state.UserLogin.user);
  //#endregion

  const handlePoNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPoNo(event.target.value);
  };

  //#region useDebounced
  const debouncedSearchTerm = useDebounced(PoNo, 300);

  useEffect(() => {
    if (
      debouncedSearchTerm !== "" &&
      debouncedSearchTerm.length > 10 &&
      debouncedSearchTerm.includes("-")
    ) {
      getAllPoNo(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);
  
  //#endregion


  //#region Func Logic
  const getDataWaiting = (value: any) => {
    if (value !== '') {
      setListDataWaiting([])
      setIsLoading(true)
      setDisable(true)
      console
      getInfoPO(value)
      const url = connect_string + "api/get_Merge_Bom_ERP"
      const data = {
        TestNo: value?.TestNo,
        checkSole: checkSole
      }

      axios.post(url, data).then(res => {
        const arr = res.data.map((item: any, index: any) => ({

          _id: index,
          ...item
        }))

        arr.sort((a: any, b: any) => {
          const statusComparison = b.Status.localeCompare(a.Status);
          if (statusComparison !== 0) return statusComparison;

          return b.MJBH.localeCompare(a.MJBH);
        });



        // const arr1 = res.data.Item2.map((item: any, index: any) => ({
        //   ...item,
        //   _id: index,
        //   Modify_Date: item.Modify_Date
        // }))

        // listMaterialStockOut(arr1)
        setListDataWaiting(arr)
        listMaterialBOM(arr)
      })
        .finally(() => {
          setIsLoading(false)
          setDisable(false)
        })
    }
  }

  const get_Material_Stock_Out_Sample = (value: any) => {
    listMaterialStockOut([])
    setIsLoading(true)
    setDisable(true)
    const url = connect_string + "api/get_Material_Stock_Out_Sample"
    const data = {
      TestNo: value?.TestNo
    }

    axios.post(url, data).then(res => {
      const arr = res.data.map((item: any, index: any) => ({
        _id: index + 1,
        ...item
        // PONO: item.PONO,
        // Material_No: item.Material_No,
        // Barcode: item.Barcode,
        // QTY_Bom: item.QTY_Bom,
        // QTY_Sample: item.QTY_Sample,
        // User_ID: item.User_ID,
        // Modify_Date: item.Modify_Date,
        // Article: item.Article

      }))
      listMaterialStockOut(arr)
    })
      .finally(() => {
        setIsLoading(false)
        setDisable(false)
      })

  }

  const getInfoPO = (value: any) => {
    setInfoPO("")
    Article("")
    KFJD("")
    MergeNo("")
    TestNo("")

    setIsLoading(true)
    setDisable(true)
    const url = connect_string + "api/get_info_pono"
    const data = {
      TestNo: value?.TestNo
    }

    axios.post(url, data).then(res => {
      setInfoPO(res.data)
      Article(res?.data?.ARTICLE)
      KFJD(res?.data?.KFJD)
      MergeNo(res?.data?.YPZLBH)
      TestNo(res?.data?.TestNo)
    })
      .finally(() => {
        setIsLoading(false)
        setDisable(false)
      })
  }

  const getDataWaitingAndgetInfoPO = async (value: any) => {
    setLoadingAll("load")
    setLoadingState(true)


    Promise.all([getDataWaiting(value), get_Material_Stock_Out_Sample(value)])
      .finally(() => {
        setLoadingAll("")
        setLoadingState(false)
      })
  };

  const getAllPoNo = (value: any) => {
    const POAndTestNo = value.split("-")
    setOnFocus(false)
    const url = connect_string + "api/get_Merge_Bom_To_PONO"

    const data = {
      TestNo: POAndTestNo[1]?.trim(),
      Po_No: POAndTestNo[0]?.trim(),
      User_WH: dataUser[0].UserId
    }

    axios.post(url, data).then(res => {
      if (res.data.length > 0) {
        setListSampleOrder(res.data)

        const filterListPo = res?.data.filter((item: any) => item.TestNo === POAndTestNo[1]?.trim())

        const newValue = {
          PONO: filterListPo[0]?.PONO?.trim(),
          TestNo: filterListPo[0]?.TestNo?.trim(),
        };


        PO_NOAndTestNo(newValue);

        setValueAutocomplete(
          newValue
        );

        getDataWaitingAndgetInfoPO(
          newValue
        )
        setPoNo('')
      }
      else {
        setListSampleOrder([])
        setValueAutocomplete(null)
      }
      

    }).finally(() => {
      setOnFocus(true)
    })
  }

  // Hàm để chuyển đổi trạng thái sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    isOpenSidebar(!isOpen)
  };

  const handleClean = () => {
    setListDataWaiting([])
    listMaterialBOM([])
    listMaterialStockOut([])
  }

  //#endregion

  //Tô màu dòng trong bảng------------------------------------------
  const paintingRow = (item: any, row: any) => {
    if (typeof item !== "string") {
      return item;
    }


    if (row.Status === "done") {
      return "grey"
    }


    return "white"
  };
  //----------------------------------------------------------------


  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? <SkipPreviousIcon color='action' /> : <SkipNextIcon color='action' />}
      </button>
      {
        !isOpen &&
        (
          <div style={{
            position: 'absolute',
            top: 'calc(80dvh/2)',
            left: '3px'
          }}>
            <span style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>MERGE BOM</span>
          </div>
        )
      }

      <div className="content" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box
          className={"dark-bg-secondary border-bottom-white"}
          style={{ minHeight: 'calc(80dvh/ 3)', flexShrink: 0 }}
        >
          <Stack direction={'row'} height={'100%'} alignItems={'flex-end'}>
            <Stack width={'100%'} padding={0.5}>
              <Grid container columnSpacing={1} justifyContent={'center'}>

                <Grid item xs={3} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                  {/* Article */}
                  <span className='textsize' style={{ color: 'orangered', overflow: "hidden", textOverflow: "ellipsis" }}> {infoPO?.ARTICLE ? "Article: " + infoPO.ARTICLE : ""}</span>
                </Grid>
                <Grid item xs={3} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                  {/* Stage */}
                  <span className='textsize' style={{ color: 'orangered', overflow: "hidden", textOverflow: "ellipsis" }}> {infoPO?.KFJD ? "Stage: " + infoPO.KFJD : ""}</span>
                </Grid>
                <Grid item xs={3} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                  {/* Pairs */}
                  <span className='textsize' style={{ color: 'orangered', overflow: "hidden", textOverflow: "ellipsis" }}> {infoPO?.PAIRS ? "Pairs: " + infoPO.PAIRS : ""}</span>
                </Grid>
              
                <Grid item xs={6} display={'flex'}>
                  {/* Quét PO */}
                  <InputFieldV1
                    xsLabel={4}
                    xsInput={8}
                    label={t("gpbScan") as string}
                    disable={loadingAll === "load" ? loadingState : disable}
                    value={PoNo}
                    focus ={true}
                    onFocus={onFocus}
                    handle={handlePoNoChange}
                    id='scan-po'
                    handleOnFocus={() => handleFocusInput('scan-po')}
                  />
                </Grid>

                <Grid container item xs={6} display={'flex'} alignItems={'center'}>
                  {/* List PO */}
                  <Grid item display={'flex'} xs={3}>
                    <span className='textsize'>PO NO</span>
                  </Grid>
                  <Grid item display={'flex'} xs={9}>
                    {/* <Autocomplete
                      value={valueAutocomplete?.PONO || valueAutocomplete}
                      onChange={(event: any, newValue: any | null) => {
                        setValueAutocomplete(newValue?.PONO || newValue);
                        PO_NO(newValue?.PONO || newValue);
                        getDataWaitingAndgetInfoPO(newValue?.PONO || newValue)
                      }}
                      onInputChange={(event, newInputValue: any) => {
                        setValueAutocomplete(newInputValue?.PONO || newInputValue);
                        PO_NO(newInputValue?.PONO || newInputValue);
                      }}

                      freeSolo
                      className="dark-bg-primary "
                      disablePortal
                      getOptionLabel={(option) => (typeof option === 'string' ? option : option?.PONO || '')}
                      isOptionEqualToValue={(option, value) => {
                        if (typeof value === 'string') {
                          return option.PONO === value; // So sánh chuỗi với chuỗi
                        }
                        return option.PONO === value?.PONO; // So sánh object với object
                      }}
                      options={Array.isArray(listSampleOrder) ? listSampleOrder : []}
                      id="combo-box-demo"
                      disabled={disable}
                      sx={{
                        borderRadius: "50px",
                        border: "1px solid",
                        width: '100%',
                        height: "2rem !important",

                        "& .MuiInputBase-root": {
                          height: "2rem !important",
                          padding: 0,
                          paddingLeft: 0.5,

                          '@media screen and (max-width: 1200px)': {
                            height: "1.8rem !important",
                          },

                          '@media screen and (max-width: 900px)': {
                            height: "1.5rem !important",
                          },
                        },



                      }}
                      componentsProps={{
                        popper: {
                          sx: {
                            "& .MuiAutocomplete-listbox": {
                              '@media screen and (max-width: 1200px)': {
                                fontSize: '14px !important',
                              },
                              '@media screen and (max-width: 900px)': {
                                fontSize: '12px !important',
                              },
                            },
                          },
                        },
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          className="dark-bg-primary"
                          sx={{
                            borderRadius: "50px",
                            color: "white",
                            height: "1.9rem !important",
                            "& fieldset": {
                              borderColor: "white",
                              border: "none",
                            },
                            "& .MuiInputBase-input": {
                              '@media screen and (max-width: 1200px)': {
                                fontSize: '14px'
                              },

                              '@media screen and (max-width: 900px)': {
                                fontSize: '12px'
                              },
                            },
                            '@media screen and (max-width: 1200px)': {
                              height: "1.8rem  !important",
                            },

                            '@media screen and (max-width: 900px)': {
                              height: "1.5rem  !important",
                            },
                          }}
                        />
                      )}
                    />  */}
                    <GenericAutocomplete
                      options={Array.isArray(listSampleOrder) ? listSampleOrder : []}
                      value={valueAutocomplete}
                      onChange={(newValue: any | null) => {
                        if (newValue !== null) {
                          setValueAutocomplete(newValue);
                          PO_NOAndTestNo(newValue);
                          getDataWaitingAndgetInfoPO(newValue)
                        }
                      }}

                      getOptionLabel={(option) =>
                        typeof option === "string" ? option : option.PONO
                      }
                      isOptionEqualToValue={(option, value) => {
                        if (typeof value === 'string') {
                          return option.TestNo === value;
                        }
                        return option.TestNo === value?.TestNo;
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item display={'flex'} alignItems={'center'} xs={6}>
                    <FormControlLabel
                      sx={styletext}
                      control={
                        <Checkbox
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setCheckSole(event.target.checked)
                          }
                          defaultChecked={false}
                          checked={checkSole}
                        />
                      }
                      label={t("btnAccounting_Sole")}
                    />
                  </Grid>

                {/* Đơn gia công */}
                <Grid container item xs={6} display={'flex'} alignItems={'center'}>
                  <Grid item display={'flex'} xs={3}>
                    <span className='textsize'>JGNO</span>
                  </Grid>
                  <Grid item display={'flex'} xs={9}>
                    <GenericAutocomplete
                      options={[]}
                      value={""}
                      onChange={(newValue: any | null) => {
                        // if (newValue !== null) {
                        //   setValueAutocomplete(newValue);
                        //   PO_NOAndTestNo(newValue);
                        //   getDataWaitingAndgetInfoPO(newValue)
                        // }
                      }}

                      getOptionLabel={(option) =>
                        typeof option === "string" ? option : option.PONO
                      }
                      isOptionEqualToValue={(option, value) => {
                        if (typeof value === 'string') {
                          return option.TestNo === value;
                        }
                        return option.TestNo === value?.TestNo;
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container item xs={12} justifyContent={'center'} gap={"20px"}>

                  <Grid item display={'flex'} alignItems={'center'} xs={2} >
                    {/* Nút tìm kiếm */}
                    <MyButton height='2rem' name={t('btnSearch')} onClick={() => getDataWaitingAndgetInfoPO(valueAutocomplete)} disabled={loadingAll === "load" ? loadingState : disable} />
                  </Grid>
                  <Grid item display={'flex'} alignItems={'center'} xs={2}>
                    {/* Nút làm mới */}
                    <MyButton height='2rem' name={t('btnClean')} onClick={handleClean} disabled={loadingAll === "load" ? loadingState : disable} />
                  </Grid>
                  {/* <Grid item display={'flex'}>
                    <MyButton height='2rem' name={t('btnExcel')} onClick={undefined} disabled={disable} />
                  </Grid> */}
                  <Grid item display={'flex'} alignItems={'center'} xs={2} >
                    {/* Nút tạo BOM */}
                    <MyButton height='2rem' name={t('btnCreateBOM')} onClick={() => setOpenCreateBOM(true)} disabled={loadingAll === "load" ? loadingState : disable} />
                    {openCreateBOM && <CreateMergeBom open={openCreateBOM} onClose={() => setOpenCreateBOM(false)} />}
                  </Grid>
                
                </Grid>
              </Grid>
            </Stack>
          </Stack>
        </Box>
        <Stack
          overflow={"hidden"}
          sx={{ height: '100%', width: '100%', backgroundColor: '#1c2538' }}
        >
          {/* Bảng */}
          <MyTableNew
            columns={column}
            rows={listDataWaiting}
            paintingRow={paintingRow}
            checkBox={false}
            handlerowClick={(params: any, item: any) => get_qty_out_Sample(valueAutocomplete, item?.MatNo || "")}
            selectedFirstRow={true}
          />
        </Stack>
      </div>
    </div >
  );
});
//#endregion

export default DeliverySampleLYVScreen;


