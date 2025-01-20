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
import ImportAndExportSample from '../../StockinScreenv2/ModelImportandExport/index_sample';
import { BiArrowBack } from 'react-icons/bi';
import DataHistoryPrintScreen from '../../PrintOtherScreen/PrintSampleScreen';
import { NewReleases } from '@mui/icons-material';

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

  const columnsOutSource: any[] = [
    {
      field: "CLBH",
      headerName: "Material No",
      align: "center",
      headerAlign: 'center',
      width: 150,
    },
    {
      field: "JGNO",
      headerName: "JGNO",
      align: "center",
      headerAlign: 'center',
      width: 150,
    },
    {
      field: "Qty",
      headerName: "QTY",
      align: "center",
      headerAlign: 'center'
    },
    {
      field: "SCBH",
      headerName: "Article",
      align: "center",
      headerAlign: 'center'
    },
    {
      field: "LLNO",
      headerName: t("dcpOrder_No_Out"),
      align: "center",
      headerAlign: 'center',
      width: 150,

    },
    {
      field: "USERID",
      headerName: "User ID",
      align: "center",
      headerAlign: 'center',
      width: 150,

    },
    {
      field: "USERDATE",
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

  const columnsBOMOutSource: GridColDef[] = [
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
  const [valuetotal, setValueTotal] = useState('')
  const [cofirmType, setCofirmType] = useState('')
  const [openCofirm, setOpenCofirm] = useState(false)
  const [qrcode, setQRCode] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState<any>('')
  const [rows, setRows] = useState([])
  const [stockoutDetailValue, setStockOutDetailValue] = useState(stockout && stockout[0].Value_Qty)
  const [stockoutTemp, setStockOutTemp] = useState(stockout && stockout[0].Value_Qty)
  const [PO_NOAndTestNo, setPO_NOAndTestNo] = useState<any>("")
  const [listMaterialBOM, setListMaterialBOM] = useState([])
  const [listMaterialStockout, setListMaterialStockout] = useState<any[]>([])
  const [listMaterialStockoutOutSource, setListMaterialStockoutOutSource] = useState<any[]>([])
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
  const [JGNO, setJGNO] = useState<any>(null)
  const [JGNO_Check, setJGNO_Check] = useState<any>(null)
  const [onFocus, setOnFocus] = useState(false)
  const [listCheckStockoutOutSource, setListCheckStockoutOutSource] = useState<any[]>([])

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

  // scan xuất hết số lượng tem
  const handleOutAll = (barcode: string) => {
    if (JGNO === null) {
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
                setOnFocus(true)
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
                setOnFocus(true)

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

  // thêm vật tư đã xuất vào bảng Stock_Out_Sample
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

          }

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

  // xử lý tô màu xanh vs nhưng qrcode đã tạo phiếu xuất
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

  // Tạo phiếu xuất
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

  // lấy thông tin tem
  const handleGet_qty_out_Sample = (value: any, materialNo: any) => {
    setQtyOutSample("")
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


  // Tạo phiếu xuất đơn gia công
  const create_Material_Stock_Out_Sample_Outsource = async () => {
    if (JGNO !== null && JGNO !== "" && mergeNo !== "" && JGNO_Check?.check === false) {
      handleCloseConfirm()
      setIsLoadingCreateSlip(true)
      const url = connect_string + "api/Insert_Stock_Out_Sample_OutSource";
      const data = {
        JGNO: JGNO,
        YPZLBH: mergeNo,
        User_ID: dataUser[0].UserId
      }
      try {
        const res = await axios.post(url, data);
        if (res.data === true) {
          handleOpenConfirm("insert-slip-sucess")
          await sidebarRef.current?.refreshMaterial_Stock_Out_Sample_Outsource()
          const arrJGNO = await sidebarRef.current?.refreshLoadDataJGNO()
          await sidebarRef.current?.refreshGetDataWatingOutSource(JGNO, arrJGNO)
          setJGNO_Check((prev: any) => ({
            ...prev,
            check: true
          }));
        }
        else {
          handleOpenConfirm("insert-slip-error")
        }

        setIsLoadingCreateSlip(false)

      } catch (error) {
        console.error("Error fetching Material Stock Out Sample:", error);
        handleOpenConfirm("insert-slip-error")
        setIsLoadingCreateSlip(false)
      }
    }
  };

  // Xuất vật tư cho vật tư gia công về
  const handleStockoutOutsource = async () => {
    setIsLoadingCreateSlip(true);
    handleCloseConfirm()
    const arrFilter = listCheckStockoutOutSource.filter(
      (item: any) => item?.CLZMLB === "Y" && item?.MJBH === "ZZZZZZZZZZ"
    );

    try {
      // Duyệt từng phần tử tuần tự
      if (arrFilter.length > 0) {
        for (const newItem of arrFilter) {
          await handleImport_Material_Stock_Out_Sample(
            newItem.MatNo,
            "Outsource",
            newItem?.Qty,
            dataUser[0].UserId,
            PO_NOAndTestNo?.PONO,
            PO_NOAndTestNo?.TestNo,
            mergeNo,
            article,
            newItem?.Qty,
            kfjd,
            newItem.SIZE
          );
        }
        if (sidebarRef.current) {
          handleRefresh()
          sidebarRef.current.refreshMaterial_Stock_Out_Sample()
        }
      }
    } catch (error) {
      console.error("Error during stock out:", error);
    } finally {
      setIsLoadingCreateSlip(false);

    }
  };

  const handleImport_Material_Stock_Out_Sample = async (
    Material_No: string,
    Barcode: string,
    QTY_Sample: string,
    User_ID: string,
    PO_NO: string,
    TestNo: string,
    YPZLBH: string,
    Article: string,
    QTY_BOM: any,
    KFJD: any,
    Size: any
  ) => {
    const url = connect_string + "api/insert_Key_Material_Stock_Out_Sample";
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
    };

    try {
      await axios.post(url, data);
    } catch (error) {
      console.error("Error inserting material stock out sample:", error);
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
            columnOutSource={columnsBOMOutSource}
            PO_NOAndTestNo={(value: any) => setPO_NOAndTestNo(value)}
            listMaterialStockOut_Outsource={(value: any) => setListMaterialStockoutOutSource(value)}
            JGNO={(value: any) => setJGNO(value)}
            JGNO_Check={(value: any) => setJGNO_Check(value)}
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
            listCheckMaterialStockout={(value: any) => setListCheckStockoutOutSource(value)}
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
                          <span className='textsize' style={{ color: 'orangered', width: '50%' }}>{JGNO === null && qtyOutSample?.Material_No ? "Material No: " + qtyOutSample?.Material_No : ""}</span>
                          <span className='textsize' style={{ color: 'orangered', width: '50%' }}>{JGNO === null && qtyOutSample?.QTY ? "QTY: " + qtyOutSample?.QTY : ""}</span>
                        </Stack>
                      </Grid>
                      <Grid item xs={isOpenSidebar === true ? 10 : 8}>
                        {/* Scan xuất */}
                        <InputFieldV1
                          xsLabel={2}
                          xsInput={9}
                          label={t("gpbScan") as string}
                          disable={JGNO === null ? disable : true}
                          value={qrcode}
                          handle={handleQRcode}
                          id='scan-stock-out'
                          handleOnFocus={() => handleFocus("scan-stock-out")}
                          onFocus={onFocus}
                        />
                      </Grid>
                      <Grid item display={'flex'} alignItems={'center'} xs={1}>
                        {isLoading && <CircularProgress size={'24px'} color='info' />}
                      </Grid>
                    </Grid>
                    <Grid container direction={'row'} gap={'10px'} justifyContent={isOpenSidebar === true ? 'center' : 'flex-start'} >
                      {/* Xuất chi tiết */}
                      <Grid item display={'flex'} alignItems={'flex-end'} xs={2}>
                        <MyButton height='2rem' name={t("dcpExport")} onClick={() => handleOpen('ImportAndExport')} disabled={JGNO === null ? disable : true} />
                        {modalName === 'ImportAndExport' && <ImportAndExportSample listMaterialStockout={listMaterialStockout} KFJD={kfjd} PoNoAndTestNo={PO_NOAndTestNo} MergeNo={mergeNo} Article={article} listMaterialBOM={listMaterialBOM} dataColor={dataModal} onClose={handleClose} open={open} form={'stockout'} Insert_Material_Stock_Out_Sample={Insert_Material_Stock_Out_Sample} />}
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
                        <MyButton height='2rem' name={t("btnViewERP")} onClick={() => handleOpen('SearchERPSample')} disabled={disable} />
                        {modalName === 'SearchERPSample' && <SampleSearchERP open={open} onClose={handleClose} />}
                      </Grid>
                    </Grid>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
            <Stack sx={{ height: '100%', overflow: 'hidden' }}>
              {/* Bảng */}
              {
                JGNO === null ?
                  (
                    <MyTableNew
                      columns={columns}
                      rows={listMaterialStockout}
                      checkBox={false}
                      paintingRow={paintingRow}
                      highlightText={highlightText}
                    />
                  )
                  :
                  (
                    <MyTableNew
                      columns={columnsOutSource}
                      rows={listMaterialStockoutOutSource}
                      checkBox={false}
                    />
                  )
              }
              <Stack alignItems={'flex-end'} paddingRight={'10px'} paddingLeft={'10px'} flexDirection={"row"}>

                <Stack width={"50%"} alignItems={'flex-start'}>
                  <MyButton height='2rem' name={"Xuất gia công"} onClick={ () => handleOpenConfirm("stockout-outsource")} disabled={disable} />
                </Stack>

                <Stack width={"50%"} alignItems={'flex-end'}>
                  {/* Tạo phiếu */}
                  {
                    JGNO === null ?
                      (
                        <MyButton height='2rem' name={t('btnCreate')} onClick={() => handleOpenConfirm("create-slip")} disabled={disable} />
                      )
                      :
                      (
                        <MyButton height='2rem' name={t("btnCreateSlipOutsource")} onClick={() => handleOpenConfirm("create-slip-outsource")} disabled={JGNO_Check?.check === true ? true : disable} />
                      )
                  }
                </Stack>

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
        {cofirmType === "create-slip-outsource" && <ModalCofirm onPressOK={create_Material_Stock_Out_Sample_Outsource} open={openCofirm} onClose={handleCloseConfirm} title={t("msgCreateSlipOutsource") as string} />}
        {cofirmType === "stockout-outsource" && <ModalCofirm onPressOK={handleStockoutOutsource} open={openCofirm} onClose={handleCloseConfirm} title={t("msgStockOutOutsource") as string} />}

        {/* Quét Camera */}
        {isScannerOpen && <QRScannerV1 onScan={handleScan} open={isScannerOpen} onClose={() => setIsScannerOpen(false)} />}
      </Stack>
    </FullScreenContainerWithNavBar>
  )
}

interface SidebarProps {
  column: any,
  columnOutSource: any,
  PO_NOAndTestNo: any,
  JGNO: any
  listMaterialBOM: any,
  listMaterialStockOut: any,
  listMaterialStockOut_Outsource: any,
  Article: any,
  KFJD: any,
  MergeNo: any,
  TestNo: any,
  isOpenSidebar: any,
  get_qty_out_Sample: any,
  handleFocusInput: any,
  JGNO_Check: any,
  listCheckMaterialStockout: any
}

interface SidebarRef {
  refreshData: () => Promise<void>;
  refreshMaterial_Stock_Out_Sample: () => Promise<void>;
  refreshMaterial_Stock_Out_Sample_Outsource: () => Promise<void>;
  refreshLoadDataJGNO: () => Promise<any[]>;
  setPoNoValue: (value: any) => void
  refreshGetDataWatingOutSource: (value: any, arrJGNO: any) => Promise<void>
}

//#region Tạo BOM
const Sidebar = forwardRef<SidebarRef, SidebarProps>((props, ref) => {
  const {
    column,
    columnOutSource,
    PO_NOAndTestNo,
    JGNO,
    JGNO_Check,
    listMaterialBOM,
    listMaterialStockOut,
    listMaterialStockOut_Outsource,
    Article,
    KFJD,
    MergeNo,
    TestNo,
    isOpenSidebar,
    get_qty_out_Sample,
    handleFocusInput,
    listCheckMaterialStockout = []
  } = props
  const { t } = useTranslation();

  //#region Variable
  const [isOpen, setIsOpen] = useState(true);
  const [openCreateBOM, setOpenCreateBOM] = useState(false);
  const [valueAutocomplete, setValueAutocomplete] = React.useState<any>(null);
  const [listSampleOrder, setListSampleOrder] = useState<any[]>([])
  const [listDataWaiting, setListDataWaiting] = useState<any[]>([])
  const [PoNo, setPoNo] = useState("")
  const [listDataWaitingOutsource, setListDataWaitingOutsource] = useState<any[]>([])
  const [PoOutsource, setPoOutsource] = useState<any>(null)
  const [mergeNo, setMergeNo] = useState<any>("")
  const [disable, setDisable] = useState(false)
  const [infoPO, setInfoPO] = useState<any>({})
  const [checkSole, setCheckSole] = useState(false)
  const [onFocus, setOnFocus] = useState(false)
  const [openModalPrintSample, setOpenModalPrintSample] = useState(false)

  const listChooseMaterial = [
    {
      value: "all",
      title: t("chxAll")
    },
    {
      value: "lieu_don",
      title: t("lblSingleMaterials")
    },
    {
      value: "lieu_gia_cong",
      title: t("lblOutsourceMaterials")
    },
  ]

  const [valueChooseMaterial, setValueChooseMaterial] = useState({
    value: "all",
    title: t("chxAll")
  })

  const listChooseWarehouse = [
    {
      value: "all",
      title: t("chxAll")
    },
    {
      value: "da-vai-pu",
      title: t("lblLeather-Fabric-PU")
    },
    {
      value: "may-baobi",
      title: t("lblSewing-Packaging")
    },
    {
      value: "kho_de",
      title: t("lblSoleWarehouse")
    },
  ]

  const [valueChooseWarehouse, setValueChooseWarehouse] = useState({
    value: "all",
    title: t("chxAll")
  })

  //#endregion

  //#region ref
  useImperativeHandle(ref, () => ({
    refreshData,
    refreshMaterial_Stock_Out_Sample,
    refreshMaterial_Stock_Out_Sample_Outsource,
    refreshGetDataWatingOutSource,
    refreshLoadDataJGNO,
    setPoNoValue
  }));

  const refreshData = async () => {
    await getDataWaiting(valueAutocomplete);
  };

  const refreshMaterial_Stock_Out_Sample = async () => {
    await get_Material_Stock_Out_Sample(valueAutocomplete)
  };

  const refreshMaterial_Stock_Out_Sample_Outsource = async () => {
    await get_Material_Stock_Out_Sample_Outsource(PoOutsource)
  };

  const refreshGetDataWatingOutSource = async (value: any, arrJGNO: any) => {
    await getDataWatingOutSource(value, arrJGNO)
  };


  const refreshLoadDataJGNO = async () => {
    return await loadDataJGNO(mergeNo)
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

  // lấy danh sách vật tư liệu đơn của BOM 
  const getDataWaiting = async (value: any) => {
    if (value !== "") {
      setListDataWaiting([]);
      await getInfoPO(value);

      const url = connect_string + "api/get_Merge_Bom_ERP";
      const data = {
        TestNo: value?.TestNo,
        check_de: valueChooseWarehouse?.value,
        check_Gia_Cong_Lieu_Don: valueChooseMaterial?.value
      };

      try {
        const res = await axios.post(url, data);

        const arr = res.data.map((item: any, index: any) => ({
          _id: index,
          ...item,
        }));

        arr.sort((a: any, b: any) => {
          const statusComparison = b.Status.localeCompare(a.Status);
          if (statusComparison !== 0) return statusComparison;

          return b.MJBH.localeCompare(a.MJBH);
        });

        setListDataWaiting(arr);
        listMaterialBOM(arr);

        // Nếu cần, bạn có thể mở lại phần xử lý khác (như listMaterialStockOut):
        // const arr1 = res.data.Item2.map((item: any, index: any) => ({
        //   ...item,
        //   _id: index,
        //   Modify_Date: item.Modify_Date,
        // }));
        // listMaterialStockOut(arr1);

      } catch (error) {
        console.error("Error fetching data from get_Merge_Bom_ERP:", error);
      }
    }
  };

  // lấy danh sách xuất tem
  const get_Material_Stock_Out_Sample = async (value: any) => {
    listMaterialStockOut([]);

    const url = connect_string + "api/get_Material_Stock_Out_Sample";
    const data = {
      TestNo: value?.TestNo,
    };

    try {
      const res = await axios.post(url, data);

      const arr = res.data.map((item: any, index: any) => ({
        _id: index + 1,
        ...item,
      }));

      listMaterialStockOut(arr);
    } catch (error) {
      console.error("Error fetching Material Stock Out Sample:", error);
    }
  };

  // lấy thông tin test no
  const getInfoPO = async (value: any) => {
    setInfoPO("");
    Article("");
    KFJD("");
    MergeNo("");
    TestNo("");
    setMergeNo("")

    const url = connect_string + "api/get_info_pono";
    const data = {
      TestNo: value?.TestNo,
    };

    try {

      const res = await axios.post(url, data);
      setInfoPO(res.data);
      Article(res?.data?.ARTICLE || "");
      KFJD(res?.data?.KFJD || "");
      MergeNo(res?.data?.YPZLBH || "");
      setMergeNo(res?.data?.YPZLBH || "")
      TestNo(res?.data?.TestNo || "");
      await loadDataJGNO(res?.data?.YPZLBH || "")
    } catch (error) {
      console.error("Error fetching PO info:", error);
    }
  };

  // tìm kiếm lại 
  const handleSearch = async () => {
    if (PoOutsource === null) {
      await getDataWaitingAndgetInfoPO(valueAutocomplete)
    }
    else {
      await getDataWaitingAndgetInfoPOOutSource(PoOutsource)
      await get_Material_Stock_Out_Sample_Outsource(PoOutsource)
      await loadDataJGNO(mergeNo)
    }
  }

  // lấy danh sách vật tư liệu đơn của BOM, danh sách tem xuất, thông tin test no
  const getDataWaitingAndgetInfoPO = async (value: any) => {
    setDisable(true)
    Promise.all([await getDataWaiting(value), await get_Material_Stock_Out_Sample(value)]).finally(() => {
      setDisable(false)
    })
  };

  // lấy danh sách vật tư gia công của BOM, danh sách vật tư gia công đã xuất
  const getDataWaitingAndgetInfoPOOutSource = async (value: any) => {
    setDisable(true)
    Promise.all([await getDataWatingOutSource(value, listDataWaitingOutsource)]).finally(() => {
      setDisable(false)
    })

  };

  // lấy toàn bộ test no của merge no
  const getAllPoNo = async (value: any) => {
    setDisable(true)
    setValueAutocomplete("")
    setPoOutsource(null)
    JGNO(null)
    const POAndTestNo = value.split("-");
    setOnFocus(false);

    const url = connect_string + "api/get_Merge_Bom_To_PONO";
    const data = {
      TestNo: POAndTestNo[1]?.trim(),
      Po_No: POAndTestNo[0]?.trim(),
      User_WH: dataUser[0].UserId,
    };

    try {
      const res = await axios.post(url, data);

      if (res.data.length > 0) {
        setListSampleOrder(res.data);

        const filterListPo = res?.data.filter((item: any) => item.TestNo === POAndTestNo[1]?.trim());

        const newValue = {
          PONO: filterListPo[0]?.PONO?.trim(),
          TestNo: filterListPo[0]?.TestNo?.trim(),
        };

        PO_NOAndTestNo(newValue);

        setValueAutocomplete(newValue);

        await getDataWaitingAndgetInfoPO(newValue);

        setPoNo('');
      } else {
        setListSampleOrder([]);
        setValueAutocomplete(null);
      }
    } catch (error) {
      console.error("Error fetching PO data:", error);
    } finally {
      setOnFocus(true);
      setDisable(false)
    }
  };

  // load danh sách đơn gia công của merge no
  const loadDataJGNO = async (value: any) => {
    let arrJGNO = []
    if (value !== "") {
      setListDataWaitingOutsource([])
      // setPoOutsource(null)
      const url = connect_string + "api/get_JGNO_to_YPZLBH"
      const data = {
        YPZLBH: value
      }

      try {
        const res = await axios.post(url, data)
        setListDataWaitingOutsource(res.data)
        arrJGNO = res.data || []
      } catch (error) {

      }
    }
    return arrJGNO
  }

  // lấy danh sách vật tư gia công của đơn
  const getDataWatingOutSource = async (value: any, arrJGNO: any) => {
    setListDataWaiting([]);
    if (value === null) {
      await getDataWaiting(valueAutocomplete);
    } else if (value !== null && value !== "") {
      const url = connect_string + "api/get_Merge_Bom_ERP_OutSource";
      const data = {
        JGNO: value,
      };

      try {
        const res = await axios.post(url, data);

        const checkOutsourceComplete: any = arrJGNO.filter((item: any) => item.JGNO === value)

        let arr = []

        if (checkOutsourceComplete[0]?.check === true) {
          arr = res.data.map((item: any, index: any) => ({
            _id: index,
            ...item,
            Status: "done",
          }));
        }
        else {
          arr = res.data.map((item: any, index: any) => ({
            _id: index,
            ...item,
            Status: ""
          }));
        }
        setListDataWaiting(arr);
      } catch (error) {
        console.error("Error fetching data from get_Merge_Bom_ERP_OutSource:", error);
      }
    }
  };

  // lấy danh sách vật tư gia công đã xuất của đơn
  const get_Material_Stock_Out_Sample_Outsource = async (value: any) => {

    if (value !== null) {
      listMaterialStockOut_Outsource([])
      const url = connect_string + "api/get_list_Material_To_JGNO"
      const data = {
        JGNO: value
      }

      try {
        const res = await axios.post(url, data)

        const arr = res.data.map((item: any, index: any) => ({
          _id: index + 1,
          ...item
        }))

        listMaterialStockOut_Outsource(arr)

      } catch (error) {
        console.log(error)
      }
    }


  }

  // Hàm để chuyển đổi trạng thái sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    isOpenSidebar(!isOpen)
  };

  // làm mới
  const handleClean = () => {
    setListDataWaiting([])
    listMaterialBOM([])
    listMaterialStockOut([])
    setListDataWaitingOutsource([])
    setListSampleOrder([])
    setValueAutocomplete("")
    setPoOutsource(null)
    setInfoPO("");
    Article("");
    KFJD("");
    MergeNo("");
    TestNo("");
    JGNO(null)
    get_qty_out_Sample()
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

  const handleRowClick = (MatNo: any) => {
    if (PoOutsource === null) {
      get_qty_out_Sample(valueAutocomplete, MatNo)
    }
  }

  // Kiểm tra điều kiện xem phải gia công về ko
  const handleCheckBox = (item: any) => {
    if (item?.CLZMLB === "Y" && item?.MJBH === "ZZZZZZZZZZ") {
      return true
    }
    return false
  }

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
              <Grid container columnSpacing={1} rowSpacing={0.5} justifyContent={'center'}>

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
                    disable={disable}
                    value={PoNo}
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
                <Grid item display={'flex'} alignItems={'center'} xs={3}>
                  {/* Chọn kho */}
                  <GenericAutocomplete
                    options={listChooseWarehouse}
                    value={valueChooseWarehouse}
                    onChange={(newValue: any | "") => {
                      if (newValue === null) {
                        setValueChooseWarehouse({
                          value: "all",
                          title: t("chxAll")
                        })
                      }
                      else {
                        setValueChooseWarehouse(newValue || "")
                      }
                    }}

                    getOptionLabel={(option) =>
                      typeof option === "string" ? option : option.title
                    }
                    isOptionEqualToValue={(option, value) => {
                      if (typeof value === 'string') {
                        return option.title === value;
                      }
                      return option.title === value.title;
                    }}
                  />
                </Grid>
                <Grid item display={'flex'} alignItems={'center'} xs={3}>
                  {/* Chọn loại vật tư */}
                  <GenericAutocomplete
                    options={listChooseMaterial}
                    value={valueChooseMaterial}
                    onChange={(newValue: any | "") => {
                      if (newValue === null) {
                        setValueChooseMaterial({
                          value: "all",
                          title: t("chxAll")
                        })
                      }
                      else {
                        setValueChooseMaterial(newValue || "")
                      }
                    }}

                    getOptionLabel={(option) =>
                      typeof option === "string" ? option : option.title
                    }
                    isOptionEqualToValue={(option, value) => {
                      if (typeof value === 'string') {
                        return option.title === value;
                      }
                      return option.title === value.title;
                    }}
                  />
                </Grid>
                {/* Đơn gia công */}
                <Grid container item xs={6} display={'flex'} alignItems={'center'}>
                  <Grid item display={'flex'} xs={3}>
                    <span className='textsize'>JGNO</span>
                  </Grid>
                  <Grid item display={'flex'} xs={9}>
                    <GenericAutocomplete
                      options={listDataWaitingOutsource || []}
                      value={PoOutsource}
                      onChange={(newValue: any | null) => {
                        setPoOutsource(newValue?.JGNO || null);
                        JGNO(newValue?.JGNO || null)
                        JGNO_Check(newValue || null)
                        getDataWaitingAndgetInfoPOOutSource(newValue?.JGNO || null)
                        get_Material_Stock_Out_Sample_Outsource(newValue?.JGNO || null)
                      }}

                      getOptionLabel={(option) =>
                        typeof option === "string" ? option : option.JGNO
                      }
                      isOptionEqualToValue={(option, value) => {
                        if (typeof value === 'string') {
                          return option.JGNO === value;
                        }
                        return option.JGNO === value?.JGNO;
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container item xs={12} justifyContent={'center'} gap={"20px"}>

                  <Grid item display={'flex'} alignItems={'center'} xs={2} >
                    {/* Nút tìm kiếm */}
                    <MyButton height='2rem' name={t('btnSearch')} onClick={handleSearch} disabled={disable} />
                  </Grid>
                  <Grid item display={'flex'} alignItems={'center'} xs={2}>
                    {/* Nút làm mới */}
                    <MyButton height='2rem' name={t('btnClean')} onClick={handleClean} disabled={disable} />
                  </Grid>
                  <Grid item display={'flex'} alignItems={'center'} xs={2} >
                    {/* Nút tạo BOM */}
                    <MyButton height='2rem' name={t('btnCreateBOM')} onClick={() => setOpenCreateBOM(true)} disabled={disable} />
                    {openCreateBOM && <CreateMergeBom open={openCreateBOM} onClose={() => setOpenCreateBOM(false)} />}
                  </Grid>
                  <Grid item display={'flex'}>
                    <MyButton height='2rem' name={t('btnPrint_sample')} onClick={() => setOpenModalPrintSample(true)} disabled={disable} />
                    {openModalPrintSample && <ModalPrintSample open={openModalPrintSample} handleClose={() => setOpenModalPrintSample(false)} data={PoOutsource || ""} />}
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
            columns={PoOutsource === null ? column : columnOutSource}
            rows={listDataWaiting}
            paintingRow={paintingRow}
            checkBox={true}
            handlerowClick={(params: any, item: any) => handleRowClick(item?.MatNo || "")}
            selectedFirstRow={true}
            handleCheckBox={(item: any) => handleCheckBox(item)}
            listChx={(row) => listCheckMaterialStockout(row)}
          />
        </Stack>
      </div>
    </div >
  );
});
//#endregion


export const ModalPrintSample = ({ open, handleClose, data }: { open: any, handleClose: any, data: any }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    bgcolor: '#1c2538',
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{
          position: 'absolute',
          height: '10%',
          width: '10%',
          zIndex: '9',
          background: '#2f3b52'
        }}>
          <IconButton className={'back-button'} onClick={handleClose}>
            <BiArrowBack className=" icon-wrapper" />
          </IconButton>
        </Box>
        <DataHistoryPrintScreen data={data} />
      </Box>
    </Modal>
  )
}


export default DeliverySampleLYVScreen;