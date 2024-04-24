//#region import
import FullScreenContainerWithNavBar from "../../components/FullScreenContainerWithNavBar";
import { Box, Grid, FormControlLabel, Checkbox, Button, Stack } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import DatePickerField from "../../components/DatePickerField";
import InputField from "../../components/InputField";
import MyButton from "../../components/MyButton";
import './style.scss'
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { createConfig } from "../../utils/api";
import { connect_string } from "../LoginScreen/ChooseFactory";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import TableOrigin from "../../components/TableOrigin";
import { useTranslation } from "react-i18next";
import { copyArrayInventory, clearArrayInventory } from "../../redux/ArrayInventory";
import { styletext } from "../StockinScreenv2/StockinForm";
import * as ExcelJS from "exceljs";
import QRScanner from "../../components/QRScanner";
import { successSound } from "../../utils/pathsound";
//#endregion
const InventoryScreen = () => {
  const { t } = useTranslation();
  const { state } = useLocation();
  const dispatch = useDispatch()

  //#region column header table
  const columns: GridColDef[] = [
    {
      field: '_id',
      headerName: t("dcpNum") as string,
      width: 70,
      headerClassName: 'custom-header'
    },
    {
      field: 'Material_No',
      headerName: t("dcpMaterial_No_Show") as string,
      width: 150,
      headerClassName: 'custom-header'
    },
    {
      field: 'Rack',
      headerName: t("lblRack_ID") as string,
      width: 110,
      headerClassName: 'custom-header'
    },
    {
      field: 'Material_Name',
      headerName: t("dcmMaterial_Name") as string,
      width: 300,
      headerClassName: 'custom-header'
    },
    {
      field: 'Total_Qty',
      headerName: t("dcmQTY") as string,
      width: 160,
      headerClassName: 'custom-header'
    },
    {
      field: 'Stamp_Qty_ERP',
      headerName: t("dcpQTY_ERP") as string,
      width: 160,
      headerClassName: 'custom-header'
    },
    {
      field: 'Stamp_Caculator',
      headerName: t("dcpDeviations") as string,
      width: 160,
      headerClassName: 'custom-header'
    },
    {
      field: 'Unit',
      headerName: t("lblUnit") as string,
      width: 160,
      headerClassName: 'custom-header'
    },
    {
      field: 'Content',
      headerName: t("dcpContent") as string,
      width: 160,
      headerClassName: 'custom-header'
    },
    {
      field: 'Count_Roll',
      headerName: t("dcpRoll") as string,
      width: 160,
      headerClassName: 'custom-header'
    },
  ];
  //#endregion

  //#region useSelector
  const dataUser = useSelector((state: any) => state.UserLogin.user);
  const ArrayInventory = useSelector((state: any) => state.ArrayInventory.deliverys);
  const dataFOC = useSelector((state: any) => state.FOC.foc);

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

  const [isLoading, setIsLoading] = useState(false)
  const [rows, setRows] = useState<any[]>([]);
  const [chxMaterial_No, setchxMaterial_No] = useState(false)
  const [chxDate_Auto, setchxDate_Auto] = useState(true)
  const [chxChose, setchxChose] = useState(false)
  const [chxPallet, setchxPallet] = useState(false)
  const [dtpDate, setdtpDate] = useState(moment().format("MM/DD/YYYY"))
  const [txtScan, settxtScan] = useState(state !== 'stock-in' ? state : "")
  const [txtValue_UserID, settxtValue_UserID] = useState('')
  const [disable, setDisable] = useState(false)
  const [modalScan, setModalScan] = useState(false)

  //#endregion

  //#region Func OnChange Input
  const handlechxMaterial_No = (event: React.ChangeEvent<HTMLInputElement>) => {
    setchxMaterial_No(event.target.checked);
  };

  const handlechxDate_Auto = (event: React.ChangeEvent<HTMLInputElement>) => {
    setchxDate_Auto(event.target.checked);
  };

  const handlechxChose = (event: React.ChangeEvent<HTMLInputElement>) => {
    setchxChose(event.target.checked);
  };

  const handlechxPallet = (event: React.ChangeEvent<HTMLInputElement>) => {
    setchxPallet(event.target.checked);
  };

  const handletxtScan = (event: React.ChangeEvent<HTMLInputElement>) => {
    settxtScan(event.target.value);
  };

  const handletxtValue_UserID = (event: React.ChangeEvent<HTMLInputElement>) => {
    settxtValue_UserID(event.target.value);
  };

  //#endregion

  //#region useEffect
  useEffect(() => {
    if (chxMaterial_No === true) {
      const sortedData = [...ArrayInventory].sort((a, b) => b.Material_No.localeCompare(a.Material_No));
      dispatch(copyArrayInventory(sortedData))
    }
    else {
      const sortedData = [...ArrayInventory].sort((a, b) => a.Material_No.localeCompare(b.Material_No))
      dispatch(copyArrayInventory(sortedData))
    }
  }, [chxMaterial_No])

  useEffect(() => {
    if (txtScan !== null && txtScan.length >= 15) {
      Search()
    }
  }, [txtScan])
  //#endregion

  //#region Func Logic


  const Search = () => {
    setIsLoading(true)
    setDisable(true)
    const date = dtpDate.split("/")
    const url = connect_string + 'api/getData_Counting_Inventory'
    const data = {
      chxMaterial_No: chxMaterial_No,
      chxDate_Auto: chxDate_Auto,
      chxChose: chxChose,
      ValuechxPallet: chxPallet,
      dtpDate: date[2] + "/" + date[0] + "/" + date[1],
      txtScan: txtScan === null ? '' : txtScan,
      txtValue_UserID: txtValue_UserID,
      clsLanguage: "1",
      User_Serial_Key: dataUser[0].UserId,
      get_version:  dataFOC === true ? "FOC" : dataUser[0].WareHouse,
      saFactory: dataUser[0].factoryName
    }

    axios.post(url, data, configNew,).then(response => {
      if ( response.data.length === 0 || response.data[0].Material_No !== '') {
        const arr = response.data.map((item: any, index: any) => ({
          _id: index + 1,
          Material_No: item.Material_No,
          Rack: item.Rack,
          Material_Name: item.Distinct_String,
          Total_Qty: item.Total_Qty,
          Stamp_Qty_ERP: item.Stamp_Qty_ERP,
          Stamp_Caculator: item.Stamp_Caculator,
          Unit: item.Unit,
          Content: item.Content,
          Count_Roll: item.Count_Roll
        }))
        dispatch(copyArrayInventory(arr))
        setRows(arr)
        if (arr.length > 0) {
          settxtScan('')
        }
      }
    }).finally(() => {
      setIsLoading(false)
      setDisable(false)
    })
  }

  const handleClick = (name: string) => {
    if (name === '-') {
      const newDate = moment(dtpDate, "MM/DD/YYYY").subtract(1, "month");

      setdtpDate(moment(newDate).format("MM/DD/YYYY"));
    } else if (name === '+') {
      const newDate = moment(dtpDate, "MM/DD/YYYY").add(1, 'month');

      setdtpDate(moment(newDate).format("MM/DD/YYYY"));
    }
  };
  //#region Excel
  const exportToExcel = () => {
    var tong = 0;
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    const data = [
      ["", "", "", "", "", "", "", "", "", ""],
      ["DANH SÁCH KIỂM KÊ"],
      [
        t("dcpNum"),
        t("dcmMaterial_No"),
        t("dcpRack"),
        t("dcmMaterial_Name"),
        t("dcmQTY"),
        t("dcpQTY_ERP"),
        t("dcpDeviations"),
        t("dcmUnit"),
        t("dcpContent"),
        t("dcpRoll"),
      ],
      ...ArrayInventory.map((row: any, i: any) => {
        return [
          i + 1,
          row.Material_No,
          row.Rack,
          row.Material_Name,
          row.Total_Qty,
          row.Stamp_Qty_ERP,
          row.Stamp_Caculator,
          row.Unit,
          row.Content,
          row.Count_Roll,
        ];
      }),
    ];
    // Gán giá trị cho các ô dựa trên dữ liệu
    data.forEach((row, rowIndex) => {
      row.forEach((cellValue: any, columnIndex: any) => {
        const cell = worksheet.getCell(rowIndex + 1, columnIndex + 1);
        cell.value = cellValue;
        cell.alignment = {
          wrapText: true,
          vertical: "middle", // Canh giữa dọc
          horizontal: "center",
        };

        if (rowIndex > 1 && row[4] !== row[5]) {
          cell.font = {
            color: { argb: 'FFA500' },
          };
        }
        if (rowIndex > 1) {
          cell.border = {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          };


        }

      });
    });
    const columnWidths = [5, 15, 20, 30, 15, 15, 15, 15, 30, 15];
    columnWidths.forEach((width, columnIndex) => {
      const column = worksheet.getColumn(columnIndex + 1);
      column.width = width;
    });
    const firstRow = worksheet.getRow(2);
    firstRow.font = {
      bold: true,
      size: 25,
    };
    firstRow.alignment = {
      vertical: "middle", // Canh giữa dọc
      horizontal: "center", // Canh giữa ngang
    };
    // Định dạng dòng thứ hai (index dòng là 2)
    const secondRow = worksheet.getRow(3);
    secondRow.font = {
      bold: true, // Chữ in đậm
    };
    secondRow.alignment = {
      vertical: "middle", // Canh giữa dọc
      horizontal: "center", // Canh giữa ngang
    };
    worksheet.mergeCells(`A2:J2`);
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Danh sách kiểm kê.xlsx";
      link.click();
    });
  };
  //#endregion

  const handleScanClick = () => {
    setModalScan(true);
  }
  const handleScan = async (result: any | null) => {

    if (result || result.text) {
      if (result.text.length >= 15) {
        CheckScanMaterialNo(result.text)
      } else if (result.text.length <= 6) {
        settxtScan(result.text)
      }
      // setModalScan(false);
      modalScan && successSound.play();
    }
  }
  const CheckScanMaterialNo = (barcode: string) => {

    const url = connect_string + 'api/Get_Material_No_Scan'
    const data = {
      Barcode_Scan: barcode
    }
    axios.post(url, data, configNew).then(response => {
      const arr = response.data;
      settxtScan(arr)

    })
  }
  //#endregion

  return (
    <FullScreenContainerWithNavBar
      hidden={true}
      sideBarDisable={true}
      onShowScan={handleScanClick}
      sideBarNavigate=""
      title={t("lblList_Delivery") as string}
      navigate={state === 'stock-in' ? "/stock-in" : "/"}
      cancelRequest={cancelRequest}>
      <Box
        paddingX={1}
        paddingBottom={1}
        className={"dark-bg-secondary border-bottom-white"}
      >
        <Grid container display={'flex'} justifyContent={'center'} >
          {/* Vật tư */}
          <Grid item >
            <FormControlLabel
              sx={styletext}
              control={<Checkbox onChange={handlechxMaterial_No} defaultChecked={false} value={chxMaterial_No} />}
              label={t("dcpMaterial_No_Show") as string}
            />
          </Grid>
          {/* Ngày chốt tự động */}
          <Grid item xs={2}>
            <FormControlLabel
              sx={styletext}
              control={<Checkbox defaultChecked={true} onChange={handlechxDate_Auto} value={chxDate_Auto} />}
              label={t("chxDate_Auto") as string}
            />
          </Grid>
          {/* Check box kế ngày */}
          <Grid item xs={0.5}>
            <Checkbox defaultChecked={false} onChange={handlechxChose} value={chxChose} />
          </Grid>
          {/* < */}
          <Grid item xs={0.5} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Box className="btn-date">
              <ArrowBackIosNewOutlinedIcon onClick={() => handleClick('-')} />
            </Box>
          </Grid>
          {/* Chọn ngày */}
          <Grid item xs={1.5} display={'flex'} >
            <DatePickerField onValueChange={dtpDate} label="" valueDate={(params: any) => { setdtpDate(params) }} />
          </Grid>
          {/* > */}
          <Grid item xs={0.5} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Box className="btn-date">
              <ArrowForwardIosOutlinedIcon onClick={() => handleClick('+')} />
            </Box>
          </Grid>
          {/* Quét kệ, mã vật tư, qrcode */}
          <Grid item xs={1.5} display={'flex'}>
            <InputField focus={true} label="" handle={handletxtScan} keydown={null} value={txtScan} />
          </Grid>
          {/* Quét tên người dùng */}
          <Grid item xs={1} display={'flex'}>
            <InputField label="" handle={handletxtValue_UserID} keydown={null} value={txtValue_UserID} disable={disable} />
          </Grid>
          {/* Check Pallet */}
          <Grid item display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <FormControlLabel
              sx={styletext}
              control={<Checkbox defaultChecked={false} onChange={handlechxPallet} value={chxPallet} />}
              label="Pallet"
            />
            {isLoading && <CircularProgress size={'25px'} color="info" />}
          </Grid>
          {/* kệ tổng
          <Grid item display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <FormControlLabel
              sx={styletext}
              control={<Checkbox defaultChecked={false} onChange={handlechxPallet} value={chxPallet} />}
              label="Kệ tổng"
            />
          </Grid> */}
        </Grid>
        <Grid container display={'flex'} justifyContent={'center'} marginTop={'10px'} gap={5}>
          {/* Tìm kiếm */}
          <Grid item>
            <MyButton name={t("btnSearch") as string} onClick={Search} disabled={disable} />
          </Grid>
          {/* Xuất excel */}
          <Grid item>
            <MyButton name={t("btnExcel") as string} disabled={disable} onClick={exportToExcel} />
          </Grid>
        </Grid>
      </Box>
      <Stack overflow={"hidden"} sx={{ height: '100%' }}>
        {/* Table */}
        <TableOrigin columns={columns} rows={ArrayInventory} />
        {/* Máy ảnh */}
        {modalScan && <QRScanner onScan={handleScan} open={modalScan} onClose={() => { setModalScan(false); }} />}
      </Stack>
    </FullScreenContainerWithNavBar>
  )
};

export default InventoryScreen;
