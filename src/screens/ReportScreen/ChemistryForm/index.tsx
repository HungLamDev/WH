//#region import
import {
  Box,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
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
import { config } from "../../../utils/api";
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
import { getWareHouse } from "../../../utils/localStorage";
import * as ExcelJS from "exceljs";
import { styletext } from "../../StockinScreenv2/StockinForm";
import QRScanner from "../../../components/QRScanner";
import { saFactory_LHG } from "../../../utils/constants";
import { successSound } from "../../../utils/pathsound";
import { copyArrayAccountingCard } from "../../../redux/ArrayAccountingCard";
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
const AccountingCardScreen = ({dataMaterialNo}: {dataMaterialNo?: any}) => {
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
      width: 70,
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
      width: 150,
      headerClassName: "custom-header",
    },
    {
      field: "Order_No_Out1",
      headerName: t("dcpArticle") as string,
      width: 200,
      headerClassName: "custom-header",
    },
    {
      field: "Date_Out2",
      headerName: t("dcmDate") as string,
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "Order_No_In3",
      headerName: t("dcpImport") as string,
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "Qty_Out",
      headerName: t("dcpExport") as string,
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "Qty_Redundant",
      headerName: t("dcpInventory") as string,
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "Img_DF",
      headerName: t("dcpSign_Account") as string,
      width: 200,
      headerClassName: "custom-header",
    },
    {
      field: "Note_Account",
      headerName: t("dcpNote_Account") as string,
      width: 400,
      headerClassName: "custom-header",
    },
  ];
  //#endregion

  //#region useSelector
  const dataUser = useSelector((state: any) => state.UserLogin.user);
  const chemistryRow = useSelector((state: any) => state.ArrayChemistry.items);
  const accountCardRow = useSelector((state: any) => state.ArrayAccountingCard.items);

  //#endregion

  //#region Variable
  const [dtpFrom_Date, setDtpFrom_Date] = useState(
    currentDay.startOf("month").format("MM/DD/YYYY")
  );
  const [dtpTo_Date, setDtpTo_Date] = useState(
    currentDay.endOf("month").format("MM/DD/YYYY")
  );
  const [chxChemistry, setChxChemistry] = useState(false);
  const [chxOrder_No, setChxOrder_No] = useState(false);
  const [lblMaterialNo, setLblMaterialNo] = useState(true);
  const [openmodal, setOpenModal] = useState(false);
  const [txtMaterial_No, setTxtMaterial_No] = useState( dataMaterialNo ? dataMaterialNo :  "");
  const [txtOrder_No, setTxtOrder_No] = useState("");
  const [rows, setRows] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [rowsMaterial, setRowsMaterial] = useState([]);
  const [itemToProcess, setItemToProcess] = useState<any>();
  const [date, setDate] = useState(accountCardRow.Value_Date_Card);
  const [materialName, setMaterialName] = useState(accountCardRow.Value_Material_Name);
  const [materialNo, setMaterialNo] = useState(accountCardRow.Value_Material_No );
  const [unit, setUnit] = useState(accountCardRow.Value_Unit_Card);
  const [mess, setMess] = useState("");
  const [rowsExcel, setRowsExcel] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [modalScan, setModalScan] = useState(false)
  //#endregion

  //#region useEffect
  useEffect(() => {
    if (txtMaterial_No.length >= 10) {
      Material_Accounting_Card_Textchanged(txtMaterial_No);
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

    setLoading(true);
    const url =
      connect_string + "api/Get_Data_Material_Label_Accounting_Card_frmLoad";
    const data = {
      User_Serial_Key: dataUser[0].UserId,
      V_Warehouse: dataUser[0].WareHouse,
      dtpFrom_Date: moment(dtpFrom_Date).format("YYYY/MM/DD"),
      dtpTo_Date: moment(dtpTo_Date).format("YYYY/MM/DD"),
      lblMaterialNo: lblMaterialNo,
      saFactory: saFactory_LHG,
      Rack: "",
      get_version: dataUser[0].WareHouse
    };
    axios
      .post(url, data, config)
      .then((response) => {
        const arr = response.data.map((item: any, index: any) => ({
          _id: index + 1,
          ...item,
        }));
        setRowsMaterial(arr);
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
      V_Warehouse: dataUser[0].WareHouse,
      chxChemistry: chxChemistry,
      dtpFrom_Date: moment(dtpFrom_Date).format("YYYY/MM/DD"),
      dtpTo_Date: moment(dtpTo_Date).format("YYYY/MM/DD"),
      lblMaterialNo: lblMaterialNo,
      saFactory: saFactory_LHG,
      Barcode: "",
      get_version: dataUser[0].WareHouse

    };
    axios
      .post(url, data, config)
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
      V_Warehouse: dataUser[0].WareHouse,
      chxChemistry: chxChemistry,
      dtpFrom_Date: moment(dtpFrom_Date).format("YYYY/MM/DD"),
      dtpTo_Date: moment(dtpTo_Date).format("YYYY/MM/DD"),
      lblMaterialNo: lblMaterialNo,
      saFactory: saFactory_LHG,
      get_version: dataUser[0].WareHouse

    };
    axios
      .post(url, data, config)
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
      })
      .finally(() => {
        setLoading(false);
        setDisable(false)
      });
  };

  const handlerowClickMaterial = (params: any, item: any) => {
    setTxtMaterial_No(item.Material_No);
    Material_Accounting_Card_Textchanged(item.Material_No);
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
      get_version: dataUser[0].WareHouse

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
        }
      })
      .finally(() => {
        setLoading(false);
      });
    setOpenModal(false);
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

  const handleSearchUserID = (event: any) => {
    if (event.key === 'Enter' && chxOrder_No === true && (dataUser[0].UserRole === 'Administrator' || dataUser[0].UserRole === 'Manager' || dataUser[0].UserRole === 'Account')) {
      dispatch(clearChemistry());

      setLoading(true);
      const url =
        connect_string + "api/Get_Data_Material_Label_Accounting_Card_frmLoad";
      const data = {
        User_Serial_Key: txtOrder_No,
        V_Warehouse: getWareHouse(),
        dtpFrom_Date: moment(dtpFrom_Date).format("YYYY/MM/DD"),
        dtpTo_Date: moment(dtpTo_Date).format("YYYY/MM/DD"),
        lblMaterialNo: lblMaterialNo,
        saFactory: saFactory_LHG,
        Rack: "",
        get_version: dataUser[0].WareHouse

      };
      axios
        .post(url, data, config)
        .then((response) => {
          const arr = response.data.map((item: any, index: any) => ({
            _id: index + 1,
            ...item,
          }));
          setRowsMaterial(arr);
        })
        .finally(() => {
          setLoading(false);
        });
    } else
      if (event.key === 'Enter' && chxOrder_No === false && dataUser[0].UserRole !== 'Administrator' && dataUser[0].UserRole !== 'Manager' && dataUser[0].UserRole !== 'Account') {
        LoadMaterial();
      }
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
          "",
          row.Qty_Redundant,
          "",
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
    >
      <Box
        paddingX={1}
        paddingBottom={1}
        className={"dark-bg-secondary border-bottom-white"}
      >
        <Grid container alignItems={"center"} justifyContent={"center"}>
          <Grid item display={"flex"}>
            <Box className="textsize">
              {" "}
              {t("dcmDate") as string}: {date}
            </Box>
          </Grid>
        </Grid>
        {/*Thông tin vật tư gồm '{t("lblMaterial_Name") as string}', '{t("lblMaterial_No") as string}','{t("lblUnit") as string}'*/}
        <Grid container alignItems={"center"} justifyContent={"center"} width={"100%"}>
          <Grid item display={"flex"} sx={{ width: "50%", paddingX: "5px" }}>
            <Box sx={{ width: "100%" }}>
              <Typography className="textsize" noWrap sx={{ wordWrap: "break-word", width: "100%" }}>
                {t("lblMaterial_Name") as string}:{" "}
                <span style={{ color: "yellow" }}>{materialName}</span>
              </Typography>
            </Box>
          </Grid>
          <Grid item display={"flex"} sx={{ width: "25%", paddingX: "5px" }}>
            <Box className="textsize" >
              {t("lblMaterial_No") as string}:{" "}
              <span style={{ color: "yellow" }}>{materialNo}</span>
            </Box>
          </Grid>
          <Grid item display={"flex"} sx={{ width: "10%", paddingX: "5px" }}>
            <Box className="textsize" >
              {t("lblUnit") as string}:{" "}
              <span style={{ color: "yellow" }}>{unit}</span>
            </Box>
          </Grid>
        </Grid>
        {/* Chứa checkbox và input */}
        <Grid
          spacing={0.5}
          container
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Grid item xs={2} textAlign={"right"}>
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
          </Grid>
          {/* Input {t("lblMaterial_No") as string} */}
          <Grid item xs={3}>
            <Box
              paddingX={"0"}
              alignItems={"center"}
              justifyContent={"center"}
              display={"flex"}
            >
              <InputField
                customClass="customStack1"
                handle={handleChangeTxtMaterialNo}
                keydown={null}
                value={txtMaterial_No}
                type={"text"}
                disable={loading}
              />
            </Box>
          </Grid>
          <Grid item xs={2} justifyContent={"center"} textAlign={"right"}>
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
          </Grid>
          <Grid item xs={3} justifyContent={"center"} display={"flex"}>
            <InputField
              customClass="customStack1"
              handle={handleChangeTxtOrderNo}
              keydown={handleSearchUserID}
              value={txtOrder_No}
              type={"text"}
              disable={loading}
            />
          </Grid>
          <Grid item xs={2}>
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
          </Grid>
        </Grid>
        {/* Chứa khoảng thời gian {t("dcmDate") as string} tháng năm */}
        <Grid
          container
          alignItems={"center"}
          spacing={0.5}
          justifyContent={"center"}
        >
          <Grid
            item
            xs={1}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Typography className="textsize">{t("lblFrom") as string}</Typography>
          </Grid>

          <Grid
            item
            xs={0.5}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            onClick={() => handleClickDateFrom("-")}
          >
            <Stack display={"flex"} className="btn-date">
              <ArrowBackIosNewOutlinedIcon display={"flex"} />
            </Stack>
          </Grid>
          <Grid
            item
            xs={2}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Box
              sx={{ width: "100%" }}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <DatePickerField
                readonly={true}
                onValueChange={dtpFrom_Date}
                valueDate={(params: any) => {
                  setDtpTo_Date(params);
                }}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={0.5}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            onClick={() => handleClickDateFrom("+")}
          >
            <Stack display={"flex"} className="btn-date">
              <ArrowForwardIosOutlinedIcon display={"flex"} />
            </Stack>
          </Grid>
          <Grid item xs={0.5}></Grid>
          <Grid
            item
            xs={1.5}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Typography className="textsize">{t("lblTo") as string}</Typography>
          </Grid>
          <Grid
            item
            xs={0.5}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            onClick={() => handleClickDateTo("-")}
          >
            <Box className="btn-date">
              <ArrowBackIosNewOutlinedIcon />
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Box
              sx={{ width: "100%" }}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <DatePickerField
                readonly={loading}
                onValueChange={dtpTo_Date}
                valueDate={(params: any) => {
                  setDtpTo_Date(params);
                }}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={0.5}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            onClick={() => handleClickDateTo("+")}
          >
            <Box className="btn-date">
              <ArrowForwardIosOutlinedIcon />
            </Box>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
        {/* Các button */}
        <Grid
          container
          alignItems={"center"}
          // spacing={4}
          // display={}
          justifyContent={"center"}
        >
          <Grid item xs={1.5}></Grid>
          <Grid
            item
            xs={1.5}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ paddingTop: "5px" }}
          >

            <MyButton name={t("btnSearch") as string} onClick={Search} disabled={loading ? loading : disable} />

          </Grid>
          <Grid
            item
            xs={1.5}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ paddingTop: "5px" }}
          >
            <MyButton name={t("btnExcel") as string} disabled={loading ? loading : disable} onClick={exportToExcel} />
          </Grid>
          <Grid
            item
            xs={1.5}
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
          <Grid
            item
            xs={1.5}
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
          <Grid
            item
            xs={1.5}
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
            {loading ? loading : disable && (<CircularProgress size={'25px'} color="info" />)}
          </Grid>
        </Grid>
      </Box>

      {/* Bảng show */}

      <Stack overflow={"hidden"} direction="row" sx={{ height: "100%" }}>
        <Grid sx={{ width: "14%" }}>
          <TableOrigin
            columns={columnsMaterial}
            rows={rowsMaterial}
            handlerowClick={handlerowClickMaterial}
            handleDoubleClick={null}
            arrNotShowCell={["_id"]}
            border
          />
        </Grid>
        <Grid sx={{ width: "86%", borderLeft: '1px solid' }} >
          <TableOrigin
            columns={columns}
            rows={chemistryRow}
            handlerowClick={null}
            handleDoubleClick={handleRow2ClickSign}
            arrNotShowCell={["_id"]}
            border
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
        {modalScan && <QRScanner onScan={handleScan} open={modalScan} onClose={() => { setModalScan(false); }} />}
      </Stack>
    </FullScreenContainerWithNavBar>
  );
};

export default AccountingCardScreen;
