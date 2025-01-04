//#region import
import {
  Backdrop,
  Box,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
  makeStyles,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import FullScreenContainerWithNavBar from "../../../components/FullScreenContainerWithNavBar";
import moment from "moment";
import InputField from "../../../components/InputField";
import DatePickerField from "../../../components/DatePickerField";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { GridColDef } from "@mui/x-data-grid";
import { currentDay } from "../../../utils/date";
import MyButton from "../../../components/MyButton";
import Statistics from "../../StockinScreenv2/StatisticsForm";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import axios from "axios";
import { config, createConfig } from "../../../utils/api";
import { connect_string } from "../../LoginScreen/ChooseFactory";

import { useSelector } from "react-redux";
import TableOrigin from "../../../components/TableOrigin";
import { useTranslation } from "react-i18next";
import ReactDOM from "react-dom";
import ModalCofirm from "../../../components/ModalConfirm";
import { useDispatch } from "react-redux";
import ArrayChemistry, {
  copyValues,
  editItem,
  clearChemistry,
} from "../../../redux/ArrayChemistry";
import { getWareHouse, getWareHouseAcount } from "../../../utils/localStorage";
import * as ExcelJS from "exceljs";
import { styletext } from "../../StockinScreenv2/StockinForm";
import QRScanner from "../../../components/QRScanner";
import { successSound } from "../../../utils/pathsound";
import { copyArrayAccountingCard } from "../../../redux/ArrayAccountingCard";
import TableOriginEdit from "../../../components/TableOriginEdit";
import TableVirtual from "../../../components/TableVirtual";
import { copyValuesAccountingCardMaterial } from "../../../redux/ArrayAccountingCardMaterial";
export interface Chemistry {
  _id: number;
  Order_No_In1: string;
  Order_No_In2: string;
  Order_No_Out: string;
  RY: string;
  Order_No_In6: string;
  Order_No_Out2: string;
  Order_No_In3: string;
  Order_No_Out4: string;
  Order_No_In4: string;
  Img_DF: string;
  Order_No_Out1: string;
}
//#endregion
const AccountingCardScreen = ({ dataMaterialNo }: { dataMaterialNo?: any }) => {
  const { t } = useTranslation();
  const navigato = useNavigate();
  const dispatch = useDispatch();

  //#region column header table
  const columnsMaterial: GridColDef[] = [
    {
      field: "Num",
      headerName: "",
      width: 10,
      headerClassName: "custom-header",
    },
    {
      field: "Material_No",
      headerName: t("lblMaterial_No") as string,
      width: 120,
      headerClassName: "custom-header",
    },
  ];
  const columns: GridColDef[] = [
    {
      field: "Order_No_In1",
      headerName: t("dcmDate") as string,
      width: 80,
      headerClassName: "custom-header",
    },
    {
      field: "Order_No_In2",
      headerName: t("dcpOrder_No_In") as string,
      width: 150,
      headerClassName: "custom-header",
    },
    {
      field: "Order_No_Out",
      headerName: t("dcpOrder_No_Out") as string,
      width: 150,
      headerClassName: "custom-header",
    },
    {
      field: "Arr_Material",
      headerName: t("dcpRemak_RY") as string,
      width: 200,
      headerClassName: "custom-header",
    },
    {
      field: "Order_No_Out1",
      headerName: t("dcpArticle") as string,
      width: 150,
      headerClassName: "custom-header",
    },
    {
      field: "Date_Out",
      headerName: t("dcmDate") as string,
      width: 80,
      headerClassName: "custom-header",
    },
    {
      field: "Order_No_In3",
      headerName: t("dcpImport") as string,
      width: 100,
      headerClassName: "custom-header",
    },
    {
      field: "Qty_Out",
      headerName: t("dcpExport") as string,
      width: 100,
      headerClassName: "custom-header",
    },
    {
      field: "Qty_Redundant",
      headerName: t("dcpInventory") as string,
      width: 100,
      headerClassName: "custom-header",
    },
    {
      field: "Img_DF",
      headerName: t("dcpSign_Account") as string,
      width: 150,
      headerClassName: "custom-header",
    },
    {
      field: "Note_Account",
      headerName: t("dcpNote_Account") as string,
      width: 250,
      headerClassName: "custom-header",
    },
  ];
  //#endregion

  //#region useSelector
  const dataUser = useSelector((state: any) => state.UserLogin.user);
  const chemistryRow = useSelector((state: any) => state.ArrayChemistry.items);
  const accountCardRow = useSelector((state: any) => state.ArrayAccountingCard.items);
  const dataFOC = useSelector((state: any) => state.FOC.foc);
  const ArrayAccountingCardMaterial = useSelector((state: any) => state.ArrayAccountingCardMaterial.items);

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

  const [dtpFrom_Date, setDtpFrom_Date] = useState(
    currentDay.startOf("month").format("MM/DD/YYYY")
  );
  const [dtpTo_Date, setDtpTo_Date] = useState(
    currentDay.endOf("month").format("MM/DD/YYYY")
  );
  const [chxChemistry, setChxChemistry] = useState(false);
  const [chxTotalOrder, setChxTotalOrder] = useState(false);
  const [chxRY, setChxRY] = useState(false);
  const [chxOrder_No, setChxOrder_No] = useState(false);
  const [lblMaterialNo, setLblMaterialNo] = useState(true);
  const [openmodal, setOpenModal] = useState(false);
  const [txtMaterial_No, setTxtMaterial_No] = useState(dataMaterialNo ? dataMaterialNo : "");
  const [txtOrder_No, setTxtOrder_No] = useState("");
  const [rows, setRows] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [rowsMaterial, setRowsMaterial] = useState([]);
  const [itemToProcess, setItemToProcess] = useState<any>();
  const [date, setDate] = useState(accountCardRow.Value_Date_Card);
  const [materialName, setMaterialName] = useState(accountCardRow.Value_Material_Name);
  const [materialNo, setMaterialNo] = useState(accountCardRow.Value_Material_No);
  const [unit, setUnit] = useState(accountCardRow.Value_Unit_Card);
  const [mess, setMess] = useState("");
  const [rowsExcel, setRowsExcel] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [modalScan, setModalScan] = useState(false)
  const [modalUserCofirm, setModalUserCofirm] = useState(false)
  const [dataUserNote, setDataUserNote] = useState<any>()
  const [isApi, setIsApi] = useState(true)
  //#endregion

  //#region useEffect
  useEffect(() => {
    if (txtMaterial_No.length >= 10) {
      Material_Accounting_Card_Textchanged(txtMaterial_No.trim());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txtMaterial_No]);

  useEffect(() => {
    setRows(chemistryRow);
    // dispatch(clearChemistry());
  }, [chemistryRow]);

  useEffect(() => {
    // dispatch(clearChemistry());
    dataUser[0].UserRole !== 'Administrator' && dataUser[0].UserRole !== 'Manager' && dataUser[0].UserRole !== 'Account' ? LoadMaterial() : '';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //#endregion

  //#region Func OnChange Input
  const handleChangeTxtMaterialNo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTxtMaterial_No(event.target.value);
  };
  const handleChangeTxtOrderNo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTxtOrder_No(event.target.value);
  };
  //#endregion

  //#region Func Logic
  const handleOpen = (name: any) => {
    setModalType(name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setModalType("");
  };

  const handleClickDateFrom = (name: string) => {
    let newDate = moment(dtpFrom_Date, "MM/DD/YYYY");
    if (name === "-") {
      newDate = newDate.subtract(1, "month");
      // setDtpTo_Date(moment(newDate).format("MM/DD/YYYY"));
    } else if (name === "+") {
      newDate = newDate.add(1, "month");
    }
    newDate = newDate.startOf("month");
    if (moment(newDate) > moment(dtpTo_Date)) {
      const NewToDate = moment(dtpTo_Date, "MM/DD/YYYY");
      NewToDate.add(1, "month");
      setDtpTo_Date(moment(NewToDate).format("MM/DD/YYYY"));
    }
    setDtpFrom_Date(moment(newDate).format("MM/DD/YYYY"));
  };

  const handleClickDateTo = (name: string) => {
    let newDate = moment(dtpTo_Date, "MM/DD/YYYY");
    if (name === "-") {
      newDate = newDate.subtract(1, "month");
      // setDtpTo_Date(moment(newDate).format("MM/DD/YYYY"));
    } else if (name === "+") {
      newDate = newDate.add(1, "month");
    }
    newDate = newDate.endOf("month");
    if (moment(newDate) < moment(dtpFrom_Date)) {
      const NewFromDate = moment(dtpFrom_Date, "MM/DD/YYYY");
      NewFromDate.subtract(1, "month");
      setDtpFrom_Date(moment(NewFromDate).format("MM/DD/YYYY"));
    }
    setDtpTo_Date(newDate.format("MM/DD/YYYY"));
  };


  const LoadMaterial = () => {
    // Load data list material no 
    setLoading(true);
    const url =
      connect_string + "api/Get_Data_Material_Label_Accounting_Card_frmLoad";
    const data = {
      User_Serial_Key: txtOrder_No,
      V_Warehouse: dataFOC === true ? "FOC" : getWareHouseAcount(),
      dtpFrom_Date: moment(dtpFrom_Date).format("YYYY/MM/DD"),
      dtpTo_Date: moment(dtpTo_Date).format("YYYY/MM/DD"),
      lblMaterialNo: lblMaterialNo,
      saFactory: dataUser[0].factoryName,
      Rack: "",
      get_version: dataFOC === true ? "FOC" : getWareHouseAcount(),
      User_Login: dataUser[0].UserId
    };
    axios
      .post(url, data, configNew)
      .then((response) => {
        const arr = response.data.map((item: any, index: any) => ({
          _id: index + 1,
          ...item,
        }));
        setRowsMaterial(arr);
        dispatch(copyValuesAccountingCardMaterial(arr))
      })
      .finally(() => {
        setLoading(false);

      });
  }; 

  const Search = () => {
    dispatch(clearChemistry());
    setLoading(true);
    const url =
      connect_string + "api/Get_Data_Material_Label_Accounting_Card_Search";
    const data = {
      txtMaterial_No: txtMaterial_No,
      txtOrder_No: txtOrder_No,
      User_Serial_Key: dataUser[0].UserId,
      V_Warehouse: dataFOC === true ? "FOC" : getWareHouseAcount(),
      chxChemistry: chxChemistry,
      dtpFrom_Date: moment(dtpFrom_Date).format("YYYY/MM/DD"),
      dtpTo_Date: moment(dtpTo_Date).format("YYYY/MM/DD"),
      lblMaterialNo: lblMaterialNo,
      saFactory: dataUser[0].factoryName,
      Barcode: "",
      get_version: dataFOC === true ? "FOC" : getWareHouseAcount(),
      chxTotal_Order: chxTotalOrder,
      chxRy: chxRY
    };
    axios
      .post(url, data, configNew)
      .then((response) => {
        const arr: Chemistry[] = [];
        response.data.forEach((item: any, index: any) => {
          arr.push({
            _id: index,
            ...item,
          });
        });

        setRows(arr);
        dispatch(copyValues(arr));
        setRowsExcel(arr)
      })
      .finally(() => {
        setLoading(false);
      });
  };
  //Select chemistry form Material_No
  const Material_Accounting_Card_Textchanged = (material_no: string) => {
    setIsApi(false)
    dispatch(clearChemistry());
    setLoading(true);
    setDisable(true)
    const url =
      connect_string +
      "api/Get_Data_Material_Label_Accounting_Card_Textchanged";
    const data = {
      txtMaterial_No: material_no,
      txtOrder_No: txtOrder_No,
      User_Serial_Key: dataUser[0].UserId,
      V_Warehouse: dataFOC === true ? "FOC" : getWareHouseAcount(),
      chxChemistry: chxChemistry,
      dtpFrom_Date: moment(dtpFrom_Date).format("YYYY/MM/DD"),
      dtpTo_Date: moment(dtpTo_Date).format("YYYY/MM/DD"),
      lblMaterialNo: lblMaterialNo,
      saFactory: dataUser[0].factoryName,
      get_version: dataFOC === true ? "FOC" : getWareHouseAcount(),
      chxRy: chxRY,
      chxTotal_Order: chxTotalOrder
    };
    axios
      .post(url, data, configNew)
      .then((response) => {
        const arr: Chemistry[] = [];
        response.data.forEach((item: any, index: any) => {

          arr.push({
            _id: index,
            ...item,
          });
        });
        const arrWithoutLastRow = arr.slice(0, arr.length - 1);
        // setRows(arrWithoutLastRow);
        const array = response.data;
        // setMaterialName(array[array.length - 1].Value_Material_Name);
        // setMaterialNo(array[array.length - 1].Value_Material_No);
        // setUnit(array[array.length - 1].Value_Unit_Card);
        // setDate(array[array.length - 1].Value_Date_Card);
        ReactDOM.unstable_batchedUpdates(() => {
          setRows(arrWithoutLastRow);
          const body = {
            "Value_Material_Name": array[array.length - 1].Value_Material_Name,
            "Value_Material_No": array[array.length - 1].Value_Material_No,
            "Value_Unit_Card": array[array.length - 1].Value_Unit_Card,
            "Value_Date_Card": array[array.length - 1].Value_Date_Card,

          }
          dispatch(copyArrayAccountingCard(body))
          setMaterialName(array[array.length - 1].Value_Material_Name);
          setMaterialNo(array[array.length - 1].Value_Material_No);
          setUnit(array[array.length - 1].Value_Unit_Card);
          setDate(array[array.length - 1].Value_Date_Card);
        });
        dispatch(copyValues(arrWithoutLastRow));
        setIsApi(true)
        setRowsExcel(arr)
      })
      .finally(() => {
        setLoading(false);
        setDisable(false)
      });
  };

  const handlerowClickMaterial = (params: any, item: any) => {
    if (isApi === true) {
      setTxtMaterial_No(item.Material_No);
    }
    // Material_Accounting_Card_Textchanged(item.Material_No);
  };
  const handleRow2ClickSign = (params: any, item: any) => {
    if (params === "Img_DF" && item.Qty_Redundant !== "" && dataUser[0].UserRole === 'Account') {
      if (item.Img_DF !== null) {
        setMess((t("btnDelete") as string) + "?");
      } else {
        setMess(t("dcpSign") as string);
      }
      setOpenModal(true);
      setItemToProcess(item);
    }
  };
  const handleOK = () => {
    let status = true;

    if (itemToProcess.Img_DF !== null) {
      status = false;
    }
    const url = connect_string + "api/CellDoubleClick_Sign_Image";
    const data = {
      Delivery_Serial: "",
      RowCount: rows.length,
      Column_Name: "dcpSign_Account",
      Article: itemToProcess.Article ? itemToProcess.Article : "",
      Qty_Redundant: itemToProcess.Qty_Redundant,
      Qty_Out: itemToProcess.Qty_Out,
      User_Serial_Key: dataUser[0].UserId,
      Date_Count: itemToProcess.Date_Count,
      Material_No: itemToProcess.Material_No,
      Note_Account: itemToProcess.Note_Account,
      RowIndex_Sign_Account: itemToProcess._id,
      Resual: status,
      get_version: getWareHouseAcount(),
      dtpFrom_Date: moment(dtpFrom_Date).format("YYYY/MM/DD"),
      dtpTo_Date: moment(dtpTo_Date).format("YYYY/MM/DD"),

    };
    axios
      .post(url, data, config)
      .then((response) => {
        if (response.data) {
          const updatedRow = {
            ...itemToProcess,
            Img_DF: response.data.Image_Sign,
          };
          dispatch(editItem(updatedRow));
          const updatedRowsMaterial: any = rowsMaterial.map((item: any) => {
            if (item.Material_No === txtMaterial_No && item.Num.includes('*')) {
              return { ...item, Num: item.Num.replace('*', '') };
            }
            else if (item.Material_No === txtMaterial_No && !item.Num.includes('*')) {
              return { ...item, Num: item.Num + "*" };
            }
            return item
          });
          setRowsMaterial(updatedRowsMaterial)
        }
      })
      .finally(() => {
        setLoading(false);
      });
    setOpenModal(false);
  };

  const handleUserCofirmNote = (colname: any, item: any) => {
    if (colname === 'Note_Account') {
      setDataUserNote(item)
    }
    setModalUserCofirm(true)
  }

  const handleAddNote = () => {

    setModalUserCofirm(false)
    const url = connect_string + "api/CellDoubleClick_Sign_Image";
    const data = {
      Delivery_Serial: "",
      RowCount: rows.length,
      Column_Name: "dcpNote_Account",
      Article: dataUserNote.Article ? dataUserNote.Article : "",
      Qty_Redundant: dataUserNote.Qty_Redundant,
      Qty_Out: dataUserNote.Qty_Out,
      User_Serial_Key: dataUser[0].UserId,
      Date_Count: dataUserNote.Date_Count,
      Material_No: dataUserNote.Material_No,
      Note_Account: dataUserNote.Note_Account,
      RowIndex_Sign_Account: dataUserNote._id,
      Resual: true,
      get_version: getWareHouseAcount()

    };
    axios
      .post(url, data, config)
      .then((response) => {
        const data = response.data
        // if (data.Qty_Redundant_result !== null &&  data.Qty_Out_result !== null && data.Note_Account !== null && data.Image_Sign !== null) {
        // }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteNote = () => {
    setModalUserCofirm(false)
    const url = connect_string + "api/CellDoubleClick_Sign_Image";
    const data = {
      Delivery_Serial: "",
      RowCount: rows.length,
      Column_Name: "dcpNote_Account",
      Article: dataUserNote.Article ? dataUserNote.Article : "",
      Qty_Redundant: dataUserNote.Qty_Redundant,
      Qty_Out: dataUserNote.Qty_Out,
      User_Serial_Key: dataUser[0].UserId,
      Date_Count: dataUserNote.Date_Count,
      Material_No: dataUserNote.Material_No,
      Note_Account: dataUserNote.Note_Account,
      RowIndex_Sign_Account: dataUserNote._id,
      Resual: false,
      get_version: getWareHouseAcount()


    };
    axios
      .post(url, data, config)
      .then((response) => {
        if (response.data) {
          const updatedRow = {
            ...dataUserNote,
            Note_Account: response.data.Note_Account,
          };
          dispatch(editItem(updatedRow));
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRefresh = () => {
    dispatch(clearChemistry());
    setDtpFrom_Date(currentDay.startOf("month").format("MM/DD/YYYY"));
    setDtpTo_Date(currentDay.endOf("month").format("MM/DD/YYYY"));
    setTxtMaterial_No("");
    setTxtOrder_No("");
    setMaterialName("");
    setMaterialNo("");
    setUnit("");
    setRows([]);
    // dispatch(clearChemistry());
    setRowsExcel([]);
  };

  // const handleKeyDownRack = (event: any) => {
  //   if (event.key === 'Enter') {
  //     dispatch(clearChemistry());
  //     setLoading(true);
  //     const url =
  //       connect_string + "api/Get_Data_Material_Label_Accounting_Card_frmLoad";
  //     const data = {
  //       User_Serial_Key: "",
  //       V_Warehouse: getWareHouse(),
  //       dtpFrom_Date: moment(dtpFrom_Date).format("YYYY/MM/DD"),
  //       dtpTo_Date: moment(dtpTo_Date).format("YYYY/MM/DD"),
  //       lblMaterialNo: lblMaterialNo,
  //       saFactory: dataUser[0].factoryName,
  //       Rack: txtMaterial_No,
  //       get_version: dataUser[0].WareHouse

  //     };
  //     axios
  //       .post(url, data, config)
  //       .then((response) => {
  //         const arr = response.data.map((item: any, index: any) => ({
  //           _id: index + 1,
  //           ...item,
  //         }));
  //         setRowsMaterial(arr);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   }
  // }


  const handleSearchUserID = (event: any) => {
    // find user id and rack
    if (event.key === 'Enter') {
      dispatch(clearChemistry());
      setLoading(true);
      const url =
        connect_string + "api/Get_Data_Material_Label_Accounting_Card_frmLoad";
      const data = {
        User_Serial_Key: txtOrder_No,
        V_Warehouse: dataFOC === true ? "FOC" : getWareHouse(),
        dtpFrom_Date: moment(dtpFrom_Date).format("YYYY/MM/DD"),
        dtpTo_Date: moment(dtpTo_Date).format("YYYY/MM/DD"),
        lblMaterialNo: lblMaterialNo,
        saFactory: dataUser[0].factoryName,
        Rack: "",
        get_version: dataFOC === true ? "FOC" : dataUser[0].WareHouse,
        User_Login: dataUser[0].UserId
      };
      axios
        .post(url, data, config)
        .then((response) => {
          const arr = response.data.map((item: any, index: any) => ({
            _id: index + 1,
            ...item,
          }));
          setRowsMaterial(arr);
          dispatch(copyValuesAccountingCardMaterial(arr))
        })
        .finally(() => {
          setLoading(false);
        });
    } //else
    // if (event.key === 'Enter' && chxOrder_No === false ) {
    //   LoadMaterial();
    // }
  };
  //#region Excel
  const exportToExcel = () => {
    // var tong = 0;
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    const data = [
      [
        "Đơn vị:Công ty TNHH Lạc Tỷ",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "Mẫu số S12-DN",
        "",
        "",
        "",
      ],
      [
        "Tên kho:........Kho G........",
        "",
        "",
        "",
        "",
        "",
        "",
        "Ban hành theo Thông Tư 200/2014/TT-",
        "",
        "",
        "",
        "",
      ],
      [
        "Tên kho:........Kho G........",
        "",
        "",
        "",
        "",
        "",
        "",
        "BTC ngày 22/12/2104 của Bộ trưởng BTC",
        "",
        "",
        "",
        "",
      ],
      ["", "", "", "", "", "", "", "", "", "", "", ""],
      ["THẺ KHO"],
      [""],
      ["Ngày lập thẻ : " + date],
      [
        "Tên, nhãn hiệu, qui cách vật tư :..........." +
        materialName +
        ".............Tờ số :....................",
      ],
      [
        "Đơn vị tính :......" +
        unit +
        "......Mã số :........" +
        materialNo +
        ".......",
      ],
      [""],
      [
        "Ghi chú",
        "Ngày tháng",
        "Số hiệu chứng từ",
        "",
        "Diễn giải",
        "Article",
        "Ngày nhập",
        "Số lượng",
        "",
        "",
        "Ký xác nhận của kế toán",
        "",
      ],
      ["", "", "Nhập", "Xuất", "", "", "", "Nhập", "Xuất", "Tồn", "", ""],
      ...rowsExcel.map((row, i) => {
        return [
          row.Order_No_In,
          row.Order_No_In1,
          row.Order_No_In2,
          row.Order_No_Out,
          row.RY,
          row.Arr_Material,
          row.Date_Out,
          row.Order_No_In3,
          row.Qty_Out,
          row.Qty_Redundant,
          row.Img_DF,
          row.Note_Account,
        ];
      }),
    ];

    // Gán giá trị cho các ô dựa trên dữ liệu
    data.forEach((row, rowIndex) => {
      row.forEach((cellValue, columnIndex) => {
        const cell = worksheet.getCell(rowIndex + 1, columnIndex + 1);

        if (columnIndex === 10 && rowIndex > 10 && row[10] !== "") {
          // Add the image to the worksheet
          const image = workbook.addImage({
            base64: ("data:image/png;base64," + row[10]) as string,
            extension: "png", // Replace with the actual image extension
          });
          cell.alignment = {
            wrapText: true,
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.addImage(image, {
            tl: { col: columnIndex, row: rowIndex }, // Specify the top-left cell for positioning
            ext: { width: 30, height: 25 }, // Specify the image dimensions
          });
        } else {
          cell.value = cellValue;
          cell.alignment = {
            vertical: "middle",
            horizontal: "center",
          };
        }
        // if (rowIndex > 1 && row[4] !== row[5]) {
        //   cell.font = {
        //     color: { argb: "FFA500" },
        //   };
        // }
        if (rowIndex > 9) {
          cell.border = {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          };
          cell.alignment = {
            wrapText: true,
            vertical: "middle",
            horizontal: "center",
          };
        }
      });
    });
    const columnWidths = [7, 10, 15, 15, 30, 20, 10, 10, 10, 10, 15, 15];
    columnWidths.forEach((width, columnIndex) => {
      const column = worksheet.getColumn(columnIndex + 1);
      column.width = width;
    });
    for (let i = 5; i <= 10; i++) {
      const Row = worksheet.getRow(i);
      Row.font = {
        bold: true,
      };
      Row.alignment = {
        vertical: "middle", // Canh giữa dọc
        horizontal: "center", // Canh giữa ngang
      };
      worksheet.mergeCells(`A${i}:L${i}`);
    }
    worksheet.mergeCells(`A11:A12`);
    worksheet.mergeCells(`B11:B12`);
    worksheet.mergeCells(`C11:D11`);
    worksheet.mergeCells(`E11:E12`);
    worksheet.mergeCells(`F11:F12`);
    worksheet.mergeCells(`G11:G12`);
    worksheet.mergeCells(`H11:J11`);
    worksheet.mergeCells(`K11:L12`);

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Thẻ kho.xlsx";
      link.click();
    });
  };
  //#endregion

  const handleScanClick = () => {

    setModalScan(true);
  };

  const handleScan = async (result: any | null) => {
    if (result || result.text) {
      if (result.text.length >= 15) {
        CheckScanMaterialNo(result.text)
      }
      setModalScan(false);
      modalScan && successSound.play();
    }
  };
  const CheckScanMaterialNo = (barcode: string) => {
    const url = connect_string + 'api/Get_Material_No_Scan'
    const data = {
      Barcode_Scan: barcode
    }
    axios.post(url, data, config).then(response => {
      const arr = response.data;
      setTxtMaterial_No(arr)
    })
  };
  //#endregion

  return (
    <FullScreenContainerWithNavBar
      sideBarDisable={true}
      sideBarNavigate=""
      title={t("lblAccounting_Card") as string}
      navigate="/"
      hidden={true}
      onShowScan={handleScanClick}
      cancelRequest={cancelRequest}
    >
      <Box
        paddingX={0.5}
        paddingBottom={1}
        className={"dark-bg-secondary border-bottom-white"}
      >
        <Stack>
          <Stack >
            <Grid container alignItems={"center"} justifyContent={"center"}>
              <Grid item display={"flex"}>
                {/* Ngày */}
                <Box className="textsize">
                  {" "}
                  {t("dcmDate") as string}: {date}
                </Box>
              </Grid>
            </Grid>
          </Stack>
          <Stack  >
            <Stack direction={'row'} width={'100%'} justifyContent={'space-between'}>
              <Box flex={2} textAlign={'center'} overflow={'hidden'}>
                <Typography className="textsize" noWrap sx={{ wordWrap: "break-word", width: "100%", textAlign: 'center' }}>
                  {t("lblMaterial_Name") as string}:{" "}
                  <span style={{ color: "yellow" }}>{materialName}</span>
                </Typography>
              </Box>
              <Box flex={1} textAlign={'center'}>
                <Typography className="textsize" style={{ textAlign: 'center' }} >
                  {t("lblMaterial_No") as string}:{" "}
                  <span style={{ color: "yellow" }}>{materialNo}</span>
                </Typography>
              </Box>
              <Box className="textsize" flex={1} textAlign={'center'}>
                {t("lblUnit") as string}:{" "}
                <span style={{ color: "yellow" }}>{unit}</span>
              </Box>
            </Stack>
            <Stack direction={'row'} >
              <Stack direction={'row'} flexBasis={'33%'} justifyContent={'center'}>
                {/* Check mã vật tư */}
                <Box className="flex-center">
                  <FormControlLabel
                    sx={styletext}
                    control={
                      <Checkbox
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setLblMaterialNo(e.target.checked)
                        }
                        defaultChecked={true}
                        value={lblMaterialNo}
                      />
                    }
                    label={t("lblMaterial_No") as string}
                  />
                </Box>
                {/* Input mã vật tư */}
                <Box className="dateTimeContainer flex-center" >
                  <InputField
                    customClass="customStack1"
                    handle={handleChangeTxtMaterialNo}
                    keydown={null}
                    value={txtMaterial_No}
                    type={"text"}
                    disable={loading}
                  />
                </Box>
              </Stack>

              <Box flexBasis={'7%'}></Box>
              <Stack direction={'row'} flexBasis={'33%'} justifyContent={'center'}>
                {/* Check số phiếu */}
                <Box className="flex-center">
                  <FormControlLabel
                    sx={styletext}
                    control={
                      <Checkbox
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setChxOrder_No(e.target.checked)
                        }
                        defaultChecked={false}
                        value={chxOrder_No}
                      />
                    }
                    label={t("dcmOrder_No") as string}
                  />
                </Box>

                {/* Input số phiêú */}
                <Box className="dateTimeContainer flex-center">
                  <InputField
                    customClass="customStack1"
                    handle={handleChangeTxtOrderNo}
                    keydown={handleSearchUserID}
                    value={txtOrder_No}
                    type={"text"}
                    disable={loading}
                  />
                </Box>
              </Stack>
              <Box flexBasis={'7%'}></Box>
              <Stack direction={'row'} flexBasis={'20%'}>

                {/* Check hóa chất */}
                <Box  >
                  <FormControlLabel
                    sx={styletext}
                    control={
                      <Checkbox
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                          setChxChemistry(event.target.checked)
                        }
                        defaultChecked={false}
                        value={chxChemistry}
                      />
                    }
                    label={t("chxChemistry") as string}
                  />
                </Box>
                {/* Check ry */}
                <Box>
                  <FormControlLabel
                    sx={styletext}
                    control={
                      <Checkbox
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                          setChxRY(event.target.checked)
                        }
                        defaultChecked={false}
                        value={chxRY}
                      />
                    }
                    label={"RY"}
                  />
                </Box>
              </Stack>
            </Stack>
            <Stack direction={'row'}>
              <Stack direction={'row'} gap={1} flexBasis={'40%'} justifyContent={'center'} alignItems={'center'}>
                {/* Từ */}
                <Box className="flex-center">
                  <Typography className="textsize">{t("lblFrom") as string}</Typography>
                </Box>
                {/* Mũi tên < từ */}
                <Stack display={"flex"} className="btn-date" onClick={() => handleClickDateFrom("-")}>
                  <ArrowBackIosNewOutlinedIcon display={"flex"} sx={{ width: '25px' }} />
                </Stack>
                {/* Date time từ */}
                <Box className="dateTimeContainer flex-center">
                  <DatePickerField
                    customClass="customDateTime"
                    readonly={true}
                    onValueChange={dtpFrom_Date}
                    valueDate={(params: any) => {
                      setDtpTo_Date(params);
                    }}
                  />
                </Box>
                {/* Mũi tên > từ */}
                <Stack display={"flex"} className="btn-date " onClick={() => handleClickDateFrom("+")}>
                  <ArrowForwardIosOutlinedIcon display={"flex"} sx={{ width: '25px' }} />
                </Stack>
              </Stack>

              <Stack direction={'row'} gap={1} justifyContent={'center'} flexBasis={'40%'} alignItems={'center'}>
                {/* Đến */}
                <Box className="flex-center">
                  <Typography className="textsize">{t("lblTo") as string}</Typography>
                </Box>
                {/* Mũi tên < đến */}
                <Box className="btn-date" onClick={() => handleClickDateTo("-")}>
                  <ArrowBackIosNewOutlinedIcon sx={{ width: '25px' }} />
                </Box>
                {/* Date time đến */}
                <Box className="dateTimeContainer flex-center">
                  <DatePickerField
                    customClass="customDateTime"
                    readonly={loading}
                    onValueChange={dtpTo_Date}
                    valueDate={(params: any) => {
                      setDtpTo_Date(params);
                    }}
                  />
                </Box>
                {/* Mũi tên > đến */}
                <Box className="btn-date" onClick={() => handleClickDateTo("+")}>
                  <ArrowForwardIosOutlinedIcon sx={{ width: '25px' }} />
                </Box>
              </Stack>
              {/* Check tổng đơn */}
              <Box flexBasis={'20%'}>
                <FormControlLabel
                  sx={styletext}
                  control={
                    <Checkbox
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setChxTotalOrder(event.target.checked)
                      }
                      defaultChecked={false}
                      value={chxTotalOrder}
                    />
                  }
                  label={t("chxTotalOrder")}
                />
              </Box>
            </Stack>
          </Stack>
          {/* Danh sách nút */}
          <Stack >
            <Grid
              container
              alignItems={"center"}
              // spacing={4}
              // display={}
              justifyContent={"center"}
              gap={5}
              flexWrap={'nowrap'}
            >
              {/* Loading */}
              {/* Loading */}
              <Grid item xs={1.5} display={"flex"} alignItems={"center"} justifyContent={'flex-end'}>
                {loading ? (
                  <>{loading}</> 
                ) : (
                  disable && <CircularProgress size={'25px'} color="info" />
                )}
              </Grid>
              {/* Nút tìm kiếm */}
              <Grid
                item

                alignItems={"center"}
                justifyContent={"center"}
                sx={{ paddingTop: "5px" }}
              >
                <MyButton name={t("btnSearch") as string} onClick={Search} disabled={loading ? loading : disable} />
              </Grid>
              {/* Xuất excel */}
              <Grid
                item
                alignItems={"center"}
                justifyContent={"center"}
                sx={{ paddingTop: "5px" }}
              >
                <MyButton name={t("btnExcel") as string} disabled={loading ? loading : disable} onClick={exportToExcel} />
              </Grid>
              {/* Làm mới */}
              <Grid
                item
                alignItems={"center"}
                justifyContent={"center"}
                sx={{ paddingTop: "5px" }}
              >
                <MyButton
                  name={t("btnClean") as string}
                  disabled={loading ? loading : disable}
                  onClick={handleRefresh}
                />
              </Grid>
              {/* Kiểm kê */}
              <Grid
                item
                alignItems={"center"}
                justifyContent={"center"}
                sx={{ paddingTop: "5px" }}
              >
                <MyButton
                  name={t("btnInventory") as string}
                  disabled={loading ? loading : disable}
                  onClick={() => {
                    navigato("/inventory", { state: txtMaterial_No });
                  }}
                />
              </Grid>
              {/* Thống kê */}
              <Grid
                item
                alignItems={"center"}
                justifyContent={"center"}
                sx={{ paddingTop: "5px" }}
              >
                <MyButton
                  name={t("btnStatistical") as string}
                  disabled={loading ? loading : disable}
                  onClick={() => handleOpen("statistic")}
                />
                {modalType === "statistic" && (
                  <Statistics
                    open={open}
                    onClose={handleClose}
                    materialNo={txtMaterial_No}
                  />
                )}
              </Grid>
              <Grid item xs={1.5} display={"flex"} alignItems={"center"} >
              </Grid>
            </Grid>
          </Stack>
        </Stack>
      </Box>

      {/* Bảng show */}
      <Stack overflow={"hidden"} direction="row" sx={{ height: "100%" }}>
        <Grid container sx={{ width: "14%", borderRight: '1px solid white' }}>
          <TableOrigin
            columns={columnsMaterial}
            rows={ArrayAccountingCardMaterial}
            handlerowClick={handlerowClickMaterial}
            handleDoubleClick={null}
            arrNotShowCell={["_id"]}
            border
          />
        </Grid>
        <Grid sx={{ width: "86%", borderLeft: '1px solid white' }} >
          <TableOriginEdit
            columns={columns}
            rows={chemistryRow}
            handlerowClick={null}
            handleDoubleClick={handleRow2ClickSign}
            handleLongPress={handleUserCofirmNote}
            arrNotShowCell={["_id"]}
            border
            arrEditCell={["Note_Account"]}
          />
        </Grid>
        {openmodal && (
          <ModalCofirm
            title={mess}
            open={openmodal}
            onClose={() => setOpenModal(false)}
            onPressOK={handleOK}
          />
        )}
        {modalUserCofirm && (
          <ModalCofirm
            title={t("msgYouWantUpdate") as string}
            open={modalUserCofirm}
            onClose={handleDeleteNote}
            onPressOK={handleAddNote}
          />
        )}

        {modalScan && <QRScanner onScan={handleScan} open={modalScan} onClose={() => { setModalScan(false); }} />}
      </Stack>
    </FullScreenContainerWithNavBar >
  );
};

export default AccountingCardScreen;
