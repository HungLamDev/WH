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
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import DatePickerField from "../../../components/DatePickerField";
import InputField from "../../../components/InputField";
import MyButton from "../../../components/MyButton";
// import "./style.scss";
import MyTable3 from "../../../components/MyTable3";
import { GridColDef } from "@mui/x-data-grid";
import moment, { Moment } from "moment";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { checkPermissionPrint, config, connect_string } from "../../../utils/api";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { currentDay } from "../../../utils/date";
import { useDispatch } from "react-redux";
import { changeMonth } from "../../../redux/Datetimepicker";
import { useLocation } from "react-router-dom";
import TableOrigin from "../../../components/TableOrigin";
import { useTranslation } from "react-i18next";
import TableCheckBox from "../../../components/TableCheckBox";
import ModalCofirm from "../../../components/ModalConfirm";
import Formprint from "../../../components/Formprint";
import FormprintChemistry from "../../../components/FormprintChemistry";
import { styletext } from "../../StockinScreenv2/StockinForm";
//#endregion
const DataHistoryPrintScreen = () => {
  const { t } = useTranslation();
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
      field: "QTY",
      headerName: t("dcpQty_ROLL") as string, //Số lượng cuộn
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "Print_QTY",
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
      field: "Print_QTY",
      headerName: t("dcpQty_ROLL") as string, // Số lượng cuộn
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "Arrival_Qty",
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
      field: "ywsm_Production",
      headerName: t("dcpProduction") as string, // Ngày sản xuất
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "zsdh_Supplier_No",
      headerName: t("dcmExpire_Date") as string, // Ngày hết hạn
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
  ];
  //#endregion
  
  //#region useSelector
  const dataUser = useSelector((state: any) => state.UserLogin.user);
  //#endregion
  
  //#region Variable
  const [rowDowns, setrowDowns] = useState<any[]>([]);
  const [rowUps, setrowUps] = useState<any[]>([]);
  const [chxPrintRY, setChxPrintRY] = useState(false);
  const [open, setOpen] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [orderNo, setOrderNo] = useState("");
  const [materialNo, setMaterialNo] = useState("");
  const [workOrder, setWorkOrder] = useState("");
  const [chxRY, setChxRY] = useState(false);
  const [chxRePrint, setChxRePrint] = useState(false);
  const [chxResidual_supplies, setchxResidual_supplies] = useState(false);
  const [listChx, setListChx] = useState<any[]>([]);
  const [openPrintReview, setOpenPrintReview] = useState(false);
  const [openCofirm, setOpenCofirm] = useState(false);
  const [confirmType, setCofirmType] = useState("");
  const [date, setDate] = useState(moment().format("YYYY/MM/DD"));
  //#endregion

  //#region Func OnChange Input
  const handleChxPrintRY = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChxPrintRY(event.target.checked);
  };
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

  const handleChxResidual_supplies = (event: React.ChangeEvent<HTMLInputElement>) => {
    setchxResidual_supplies(event.target.checked);
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

  const handleDoubleClick = (colName: string, params: any) => {
    const url = connect_string + "api/DoubleClick_Print_Chemistry"
    const ngay = params.CGDate_Date.split("/")
    const ngaysx = params.ywsm_Production.split("/")
    const ngayhd = params.zsdh_Supplier_No.split("/")
    const data = {
      RowIndex: true,
      dcmOrder_No: params.CGNO_Order_No,
      dcmMaterial_No: params.CLBH_Material_No,
      dcmMaterial_Type: params.cllb_Material_Type,
      dcmColor: params.Color,
      dcmUnit: params.dwbh_Units,
      dcmQty_ROLL: params.Print_QTY,
      dcmArrival_QTY: params.Arrival_Qty,
      dcmQTY: params.QTY,
      dcmRoll: params.Roll,
      dcmSize: params.Size,
      dcmMaterial: params.ywpm_Material,
      dcmProduction: params.ywsm_Production,
      dcmWork_Order: params.ZLBH_Work_Order,
      dcmExpire_Date: params.zsdh_Supplier_No,
      dcmSupplier: params.zsywjc_Supplier,
      dcmDate: params.CGDate_Date,
      User_Serial_Key: dataUser[0].UserId,
      chxReprint: chxRePrint,
      chxResidual_supplies: chxResidual_supplies,
      chxRY: chxRY,
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
          Production: item.Production,
          Expired_Date: item.Expired_Date,
          Work_Order: item.Work_Order,
          Material_Type: item.Material_Type,
          Barcode: item.Barcode,
        }))
        // setrowUps(prevRowUps => [...prevRowUps, ...arr]);
        const uniqueArr = arr.filter((item: any) => {
          return !rowUps.some((row) => row.Barcode === item.Barcode);
        });

        setrowUps((prevRowUps) => [...prevRowUps, ...uniqueArr]);
      }
    }).finally(() => {
      setIsLoading(false)
      setOpen(false)
    })

  }
  const handleDelete = () => {
    const url = connect_string + "api/Delete_Label_Print_Chemistry"
    const arr = listChx.map((item: any) => item.Barcode)
    const data = {
      dcpBarcode: arr,
      chxResidual_supplies: false,
      chxReprint: chxRePrint,
      chxRY: chxRY,
      dcpCheck: true,
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
    })
  }
  const handlePrint = async () => {
    if(await checkPermissionPrint(dataUser[0].UserId)){
      if (listChx.length > 0) {
        setOpen(true)
        const url = connect_string + "api/Print_Chemistry_CLick"
        const arr = listChx.map((item: any) => item.Barcode)
        const data = {
          User_Serial_Key: dataUser[0].UserId,
          dcpBarcode: arr,
          dcpCheck: true,
          get_version: dataUser[0].WareHouse
        }
        axios.post(url, data, config).then(response => {
          if (response.data === true) {
            handleOpenConfirm('print-success')
          }
        }).finally(() => {
          setIsLoading(false)
          setOpen(false)
        })
      }
      else{
        handleOpenConfirm('error-data')
      }
  
    }
    else{
      handleOpenConfirm('print-permission')
    }

  
  }
  const handleSearch = () => {
    setIsLoading(true);
    setDisabled(true);
    const url = connect_string + "api/btnSearch_Print_Chemistry";
    const data = {
      chxRY: chxRY,
      txtOrderNo: orderNo,
      txtMaterial_No: materialNo,
      txtOrder_Word: workOrder,
      txtOutsource: "",
      get_version: dataUser[0].WareHouse
    };
    axios
      .post(url, data, config)
      .then((response) => {
        const arr = response.data.map((item: any, index: any) => ({
          _id: index,
          zsywjc_Supplier: item.zsywjc_Supplier,
          CLBH_Material_No: item.CLBH_Material_No,
          ywpm_Material: item.ywpm_Material,
          Color: item.Color,
          Size: item.Size,
          Print_QTY: item.Print_QTY,
          Arrival_Qty: item.Arrival_Qty,
          QTY: item.QTY,
          dwbh_Units: item.dwbh_Units,
          CGNO_Order_No: item.CGNO_Order_No,
          Roll: item.Roll,
          CGDate_Date: item.CGDate_Date,
          ywsm_Production: item.ywsm_Production,
          zsdh_Supplier_No: item.zsdh_Supplier_No,
          ZLBH_Work_Order: item.ZLBH_Work_Order,
          cllb_Material_Type: item.cllb_Material_Type,
          // Name_M: item.Name_M,
        }));
        setrowDowns(arr);
        // console.log(arr);
      })
      .finally(() => {
        setIsLoading(false);
        setDisabled(false);
      });
  };
  //#endregion
  
  return (
    <FullScreenContainerWithNavBar
      sideBarDisable={true}
      sideBarNavigate=""
      title={t("lblSM_Print_Chemistry") as string}
      navigate={"/"}
    >
      <Box
        paddingX={1}
        paddingBottom={1}
        className={"dark-bg-secondary border-bottom-white"}
      >
        <Stack direction={"row"}>
          <Stack
            width={"auto"}
            spacing={1}
            paddingRight="30px"
            justifyContent={"center"}
            flexDirection="column"
            alignItems={"start"}
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
                label={t("dcmMaterial_No") as string}
                handle={handleMaterialNo}
                keydown=""
                value={materialNo}
                type={"text"}
                disable={disabled}
              />
            </Grid>
            <Stack width={"auto"} spacing={6} direction={"row"}>
              <Grid>
                <FormControlLabel
                  sx={styletext}
                  control={
                    <Checkbox checked sx={{ color: "white" }} value={""} />
                  }
                  label={t("chxAll")}
                />
              </Grid>
              <Grid>
                <FormControlLabel
                  sx={styletext}
                  className="text"
                  control={
                    <Checkbox
                      sx={{ color: "white" }}
                      value={chxRY}
                      onChange={handleChxRY}
                    />
                  }
                  label={"RY"}
                />
              </Grid>
            </Stack>
          </Stack>
          <Stack width={"auto"} justifyContent={"center"} spacing={0} >
            <Grid>
              <FormControlLabel
                className="text"
                sx={styletext}
                control={
                  <Checkbox
                    sx={{ color: "white" }}
                    value={chxRePrint}
                    onChange={handleChxRePrint}
                  />
                }
                label={t("chxReprint")}
              />
            </Grid>

            <Grid container>
              <Grid
                item
                xs={chxPrintRY || chxRY ? 3 : 12}
                sx={{ display: "flex" }}
              >
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

              <Grid
                item
                // xs={(chxRY && chxPrintRY) || (chxRY && !chxPrintRY) ? 3 : 0}
                xs={(chxRY && !chxPrintRY) ? 7 : 5}
                sx={{

                  "& .css-ahj2mt-MuiTypography-root": {
                    marginX: "10px",
                  },
                }}
                justifyContent={"left"}
                alignItems={"left"}
              >
                <Box

                  sx={{ height: '100%', display: (chxRY || chxPrintRY) ? "flex" : "none" }}
                  justifyContent={"left"}
                  alignItems={"left"}
                  width="100%"
                >
                  <InputField
                    label={t("dcmWork_Order") as string}
                    handle={handleWorkOrder}
                    keydown=""
                    value={workOrder}
                    type={"text"}
                    disable={disabled}
                  />

                </Box>
              </Grid>

              <Grid
                item
                xs={3}
                sx={{ display: "flex" }}
                justifyContent={"center"}
                alignItems={"center"}
              // sx={{ display: "flex" }}
              >
                <Box
                  sx={{ display: "flex" }}
                  justifyContent={"center"}
                  alignItems={"center"}
                  width="100%"
                >
                  {chxPrintRY ? (
                    <DatePickerField label="" onValueChange={date} />
                  ) : (
                    ""
                  )}
                </Box>
              </Grid>
            </Grid>
            <Grid>
              {(dataUser[0].UserRole === 'Manager' || dataUser[0].UserRole === "Administrator") &&

                <FormControlLabel
                  className="text"
                  control={
                    <Checkbox
                      sx={{ color: "white" }}
                      value={chxResidual_supplies}
                      onChange={handleChxResidual_supplies}
                    />
                  }
                  label={t("chxResidual_supplies")}
                />
              }
            </Grid>
          </Stack>
        </Stack>

        <Stack
          width={"100%"}
          direction={"row"}
          spacing={3}
          alignItems={"center"}
        >
          <MyButton
            name={t("btnSearch")}
            disabled={disabled}
            onClick={handleSearch}
          />
          <MyButton name={t("btnClean")} disabled={disabled} />
          <MyButton name={t("btnDelete")} disabled={disabled} onClick={handleDelete} />
          <MyButton name={t("btnPrint")} disabled={disabled} onClick={handlePrint} />
          <MyButton name={t("btnPrivewPrint")} disabled={disabled} onClick={() => setOpenPrintReview(true)} />
          {open && <CircularProgress size={"24px"} color="info" />}
          {openPrintReview && <FormprintChemistry rows={listChx} onClose={() => setOpenPrintReview(false)} open={openPrintReview} />}
          {open && <ModalCofirm onClose={() => setOpen(false)} open={open} title={t("msgCofirmPrint") as string} />}
          {confirmType === 'delete-error' && <ModalCofirm title={t("msgDeleteError") as string} onClose={handleCloseConfirm} open={openCofirm} onPressOK={handleCloseConfirm} />}
          {confirmType === 'error-data' && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("msgChooseStamp") as string} />}
          {/* {confirmType === 'print-success' && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("msgPrintSuccess") as string} />} */}
          {confirmType === 'print-permission' && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("lblPrintPermission") as string} />}
        </Stack>
      </Box>
      <Stack overflow={"hidden"} sx={{ height: "100%" }}>
        <Stack sx={{ height: "50%" }}>
          <TableCheckBox
            columns={columnsUp}
            rows={rowUps}
            listChx={(params: any) => {
              setListChx(params);
            }}
            arrNotShowCell={["_id"]}
          />
        </Stack>
        <Stack sx={{ height: "50%" }}>
          <TableCheckBox
            columns={columnsDown}
            rows={rowDowns}
            onDoubleClick={handleDoubleClick}
            arrEditCell={[
              "Print_QTY",
              "Roll",
              "ywpm_Material",
            ]}
            arrNotShowCell={["_id"]}
          />
        </Stack>
      </Stack>
    </FullScreenContainerWithNavBar>
  );
};

export default DataHistoryPrintScreen;
