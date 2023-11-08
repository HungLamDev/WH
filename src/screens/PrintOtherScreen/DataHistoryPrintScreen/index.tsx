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
import { GridColDef } from "@mui/x-data-grid";
import moment, { Moment } from "moment";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { config, connect_string } from "../../../utils/api";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import TableOrigin from "../../../components/TableOrigin";
import { useTranslation } from "react-i18next";
//#endregion
const DataHistoryPrintScreen = () => {
  const { t } = useTranslation();
  //#region List Data
  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: t("dcpNum") as string, // STT
      width: 70,
      headerClassName: "custom-header",
    },
    {
      field: "Supplier",
      headerName: t("dcpSupplier") as string, // Nhà cung ứng
      width: 150,
      headerClassName: "custom-header",
    },
    {
      field: "Material_Name",
      headerName: t("dcmMaterial_Name") as string, // Tên vật tư
      width: 110,
      headerClassName: "custom-header",
    },
    {
      field: "Color",
      headerName: t("dcmColor") as string, // Màu
      width: 300,
      headerClassName: "custom-header",
    },
    {
      field: "Size",
      headerName: t("dcmSize") as string, // Kích thước
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "QTY",
      headerName: t("dcmQTY") as string, // Số lượng
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "Print_QTY",
      headerName: t("dcpPrint_QTY") as string, // Số lượng in
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
      field: "Supplier_No",
      headerName: t("dcpSupplier_no") as string, // Mã nhà cung ứng
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "Material_No",
      headerName: t("dcmMaterial_No") as string, // Mã vật tư
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "Work_Order",
      headerName: t("dcmWork_Order") as string, // Lệnh
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
      field: "ngay",
      headerName: t("dcpModify_Date") as string, // Ngày sửa đổi
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "User_Serial_Key",
      headerName: t("dcpInspectorID") as string, // Tài khoản
      width: 160,
      headerClassName: "custom-header",
    },
  ];
  //#endregion
  
  //#region useSelector
  const dataUser = useSelector((state: any) => state.UserLogin.user);
  //#endregion

  //#region Variable
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false)
  const [rows, setRows] = useState([]);
  const [txtSupplier, setTxtSupplier] = useState('');
  const [txtMaterial_No, setTxtMaterial_No] = useState('');
  const [txtMaterial_Name, setTxtMaterial_Name] = useState('');
  const [txtOrderNo, setTxtOrderNo] = useState('');
  const [cboUser_Name, setCboUser_Name] = useState('');
  const [chxLblFrom, setChxlblFrom] = useState(true);
  const [dtpDateFrom, setdtpDateFrom] = useState(moment().format("YYYY/MM/DD"));
  const [dtpDateTo, setdtpDateTo] = useState(moment().format("YYYY/MM/DD"));
  //#endregion

  //#region Func OnChange Input
  const handleTxtSupplier = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTxtSupplier(event.target.value);
  };

  const handleTxtMaterial_No = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTxtMaterial_No(event.target.value);
  };

  const handleTxtMaterial_Name = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTxtMaterial_Name(event.target.value);
  };

  const handleTxtOrderNo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTxtOrderNo(event.target.value);
  };

  const handleCboUser_Name = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCboUser_Name(event.target.value);
  };

  const handleChxlblFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChxlblFrom(event.target.checked);
  };

  //#endregion
  
  //#region Func Logic
  const handleSearch = () => {
    setDisabled(true)
    setIsLoading(true)
    const url = connect_string + "api/Search_Click_History_Print"
    const data =
    {
      txtSupplier: txtSupplier,
      txtMaterial_ID: txtMaterial_No,
      txtMaterial_Name: txtMaterial_Name,
      txtOrderNo: txtOrderNo,
      lblFrom: chxLblFrom,
      dtpFrom_Date: dtpDateFrom,
      dtpTo_Date: dtpDateTo,
      cboUser_Name: cboUser_Name,
      get_version: dataUser[0].WareHouse

    }
    axios.post(url, data, config).then(response => {
      if (response.data.length > 0) {
        const arr = response.data.map((item: any, index: any) => ({
          _id: index + 1,
          ngay: item.Modify_Date,
          ...item
        }))
        setRows(arr)
      }
    }).finally(() => {
      setDisabled(false)
      setIsLoading(false)
    })
  }

  const handleRefresh = () => {
    setRows([])
    setTxtSupplier('')
    setTxtMaterial_No('')
    setTxtMaterial_Name('')
    setTxtOrderNo('')
    setCboUser_Name('')
  }
  //#endregion
 
  return (
    <FullScreenContainerWithNavBar
      sideBarDisable={true}
      sideBarNavigate=""
      title={t("tsmData_History_Print") as string}
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
                label={t("dcmOrder_No") as string}
                handle={handleTxtOrderNo}
                keydown=""
                value={txtOrderNo}
                type={"text"}
                disable={disabled}
              />
            </Grid>
            <Grid>
              <InputField
                label={t("dcmMaterial_No") as string}
                handle={handleTxtMaterial_No}
                keydown=""
                value={txtMaterial_No}
                type={"text"}
                disable={disabled}
              />
            </Grid>
            <Grid>
              <InputField
                label={t("dcmMaterial_Name") as string}
                handle={handleTxtMaterial_Name}
                keydown=""
                value={txtMaterial_Name}
                type={"text"}
                disable={disabled}
              />
            </Grid>
          </Stack>
          <Stack width={"45%"} justifyContent={"center"} spacing={1} >
            <Grid alignItems={"center"} >
              <InputField
                label={t("dcpSupplier") as string}
                handle={handleTxtSupplier}
                keydown=""
                value={txtSupplier}
                type={"text"}
                disable={disabled}
              />
            </Grid>
            <Grid alignItems={"center"} >
              <InputField
                label={t("dcpInspectorID") as string}
                handle={handleCboUser_Name}
                keydown=""
                value={cboUser_Name}
                type={"text"}
                disable={disabled}
              />
            </Grid>
            <Grid container >
              <Grid item xs={1}>
                <FormControlLabel className="text" control={<Checkbox checked sx={{ color: "white" }} value={chxLblFrom} onChange={handleChxlblFrom} />} label={""} />
              </Grid>
              <Grid width={'100%'}
                item
                xs={5.5}
                sx={{

                  display: 'flex',
                  "& .css-1jv2z0n-MuiStack-root": {
                    justifyContent: "left",
                  },
                }}
              >
                <DatePickerField
                  label={t("lblFrom") as string + "\u2002"}
                  valueDate={(value:any) => setdtpDateFrom(moment(value).format("YYYY/MM/DD"))}
                />
                <span>&nbsp;</span>
              </Grid>
              <Grid
                item
                xs={5.5}
                sx={{
                  display: 'flex',
                  "& .css-1jv2z0n-MuiStack-root": {
                    justifyContent: "left",
                  },
                }}
              >
                <DatePickerField
                  label={t("lblTo") as string + "\u2002"}
                  valueDate={(value:any) => setdtpDateTo(moment(value).format("YYYY/MM/DD"))}
                />
              </Grid>
            </Grid>
          </Stack>
        </Stack>
        <Stack width={"100%"} direction={"row"} justifyContent={"center"} spacing={2} alignItems={'center'}>
          <MyButton name={t("btnSearch")} onClick={handleSearch} disabled={disabled} />
          <MyButton name={t("btnClean")} disabled={disabled} onClick={handleRefresh} />
          {isLoading && <CircularProgress size={'24px'} color="info" />}
        </Stack>
      </Box>
      <Stack overflow={"hidden"} sx={{ height: '100%' }}>
        <TableOrigin columns={columns} rows={rows} />
      </Stack>
    </FullScreenContainerWithNavBar>
  );
};

export default DataHistoryPrintScreen;
