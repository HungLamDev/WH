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
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { config } from "../../../utils/api";
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
      field: "ywsm_Production",
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

  //#region Variable
  const [open, setOpen] = useState(false)
  const [openPrintReview, setOpenPrintReview] = useState(false)
  const [isloading, setIsLoading] = useState(false)
  const [rowDowns, setrowDowns] = useState<any[]>([]);
  const [rowUps, setrowUps] = useState<any[]>([]);
  const [rowOrderNo, setrowOrderNo] = useState<any[]>([]);
  const dataUser = useSelector((state: any) => state.UserLogin.user);
  const [chxSize, setChxSize] = useState(false);
  const [chxResidual_supplies, setchxResidual_supplies] = useState(false)
  const [chxChange_Material, setChxChange_Material] = useState(false);
  const [chxAll_Outsource, setchxAll_Outsource] = useState(false);
  const [chxReprint, setchxReprint] = useState(false)
  const [chxPrintRY, setChxPrintRY] = useState(false);
  const [txtOrderNo, setTxtOrderNo] = useState('')
  const [txtMaterial_No, setTxtMaterial_No] = useState('')
  const [txtInvoid_No, setTxtInvoid_No] = useState('')
  const [txtOutsource, setTxtOutsource] = useState('')
  const [listChx, setListChx] = useState<any[]>([])
  const [listChxDown, setListChxDown] = useState<any[]>([])
  const [listChxOrder, setListChxOrder] = useState<any[]>([])
  const [dtpDateTo, setdtpDateTo] = useState(moment().format("YYYY/MM/DD"));
  const [openCofirm, setOpenCofirm] = useState(false)
  const [cofirmType, setCofirmType] = useState('')
  //#endregion

  //#region Func OnChange Input
  const handleChxPrintRY = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChxPrintRY(event.target.checked);
  };

  const handlechxSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChxSize(event.target.checked);
  };

  const handlechxResidual_supplies = (event: React.ChangeEvent<HTMLInputElement>) => {
    setchxResidual_supplies(event.target.checked);
  };

  const handleChxChange_Material = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChxChange_Material(event.target.checked);
  };

  const handlechxAll_Outsource = (event: React.ChangeEvent<HTMLInputElement>) => {
    setchxAll_Outsource(event.target.checked);
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
      const filteredListChx = rowDowns.filter((item: any) => {
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
    setOpen(true)
    setIsLoading(true)
    setListChxOrder([])
    setListChxDown([])
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
      get_version: dataUser[0].WareHouse

    }
    axios.post(url, data, config).then(response => {
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
        ywsm_Production: item.ywsm_Production,
        ZLBH_Work_Order: item.ZLBH_Work_Order,
        cllb_Material_Type: item.cllb_Material_Type,
        zsdh_Supplier_No: item.zsdh_Supplier_No,
        zsywjc_Supplier: item.zsywjc_Supplier
      })
      )
      const arrfillter: any[] = [];

      response.data.forEach((item: any, index:any) => {
        if (!arrfillter.some(obj => obj.CGNO_Order_No === item.CGNO_Order_No)) {
          arrfillter.push({ 
            _id:index,
            CGNO_Order_No: item.CGNO_Order_No });
        }
      });

        setrowOrderNo(arrfillter)
      setrowDowns(arr)
    }).finally(() => {
      setIsLoading(false)
      setOpen(false)
    })
  }

  const handleDoubleClick = (colname: string, item: any) => {
    if (listChxDown && listChxDown.includes(item)) {
    setOpen(true)
    setIsLoading(true)
    const url = connect_string + "api/DoubleClick_Data_Print_Sample"
    const date_temp = item.CGDate_Date.split('/')
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
      dcmProduction: item.ywsm_Production,
      dcmWork_Order: item.ZLBH_Work_Order,
      dcmSupplier_no: item.zsdh_Supplier_No,
      dcmSupplier: item.zsywjc_Supplier,
      dcmDate: date_temp[0] + "/" + date_temp[1] + "/" + date_temp[2],
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
          Print_Date: moment(item.Print_Date).format("DD/MM/YYYY"),
          Production: item.Production,
          Work_Order: item.Work_Order,
          Material_Types: item.Material_Types,
          Barcode: item.Barcode,
          Supplier_No: item.Supplier_No
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
    })
  }else{
    alert('bạn phải check trước khi print')
  }
  }

   const handleDelete = () => {
    setOpen(true)
    setIsLoading(true)
    const url = connect_string + "api/Delete_Label_Sample"
    const data = listChx.map((item: any) => ({
      chxSize: chxSize,
      chxResidual_supplies: chxResidual_supplies,
      User_Serial_Key: dataUser[0].UserId,
      dcmCheck: true,
      dcpBarcode: item.Barcode,
      get_version: dataUser[0].WareHouse
    }))
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
    if (await checkPermissionPrint(dataUser[0].UserId)) {
      setOpen(true)
      setIsLoading(true)
      const url = connect_string + "api/Print_Sample_CLick"
      const data = listChx.map((item: any) => ({
        dcpBarcode: item.Barcode,
        User_Serial_Key: dataUser[0].UserId,
        Material_Name: item.Material_Name,
        Work_Order: item.Work_Order,
        dcpCheck: true,
        get_version: dataUser[0].WareHouse
      }))
      axios.post(url, data, config).then(response => {
        if (response.data === true) {
          handleOpenConfirm('print')
        }
        else {
          handleOpenConfirm('print-erorr')
        }
      }).finally(() => {
        setIsLoading(false)
        setOpen(false)
      })
    }
    else{
      handleOpenConfirm('print-permission')
  }
   }

  const handleRefresh = () => {
    setListChx([])
    setListChxOrder([])
    setListChxDown([])
    setrowUps([])
    setrowDowns([])
    setTxtOrderNo('')
    setTxtInvoid_No('')
    setTxtMaterial_No('')
    setTxtOutsource('')
  }

  //#endregion
  
  return (
    <FullScreenContainerWithNavBar
      sideBarDisable={true}
      sideBarNavigate=""
      title={t("frmPrint_Sample") as string}
      navigate={"/"}
    >
      <Box
        paddingX={1}
        paddingBottom={1}
        className={"dark-bg-secondary border-bottom-white"}
      >
        <Stack direction={"row"}>
          <Grid container>
            <Grid item display={'flex'} xs={4.5}>
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
            <Grid item display={'flex'} xs={1.5}></Grid>
            <Grid item display={'flex'} xs={4.5}>
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
              <FormControlLabel
                sx={styletext}
                className="text"
                control={<Checkbox sx={{ color: "white" }} value={chxAll_Outsource} onChange={handlechxAll_Outsource} />}
                label={t("chxAll")}
              />
            </Grid>
            <Grid item display={'flex'} xs={4.5}>
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
              <FormControlLabel
                sx={styletext}
                className="text"
                control={<Checkbox sx={{ color: "white" }} value={chxSize} onChange={handlechxSize} />}
                label={"Size"}
              />
            </Grid>
            <Grid item display={'flex'} xs={4.5}>
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
              <FormControlLabel
                sx={{ width: "100%", display: "flex", ...styletext }}
                className="text"
                control={<Checkbox sx={{ color: "white" }} value={chxChange_Material} onChange={handleChxChange_Material} />}
                label={"Chuyển mã"}
              />
            </Grid>
            <Grid item display={'flex'} xs={2}>
              <FormControlLabel
                sx={styletext}
                className="text"
                control={<Checkbox checked sx={{ color: "white" }} />}
                label={t("chxAll")} />
            </Grid>
            <Grid item display={'flex'} xs={2.5}>
              <FormControlLabel
                sx={styletext}
                className="text"
                control={<Checkbox sx={{ color: "white" }} value={chxReprint} onChange={handlechxReprint} />}
                label={t("chxReprint")}
              />
            </Grid>
            <Grid item display={'flex'} xs={1.5}>
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
                <Grid item xs={2.8} display={'flex'}>
                  <InputField label={t("dcpWork_Order") as string + "\u2002"} handle={null} keydown={null} value={""} />
                </Grid>
                <Grid item xs={1.5} display={'flex'}>
                  <DatePickerField onValueChange={dtpDateTo} />
                </Grid>

              </>
            ) : <Grid item xs={4.3} display={'flex'}></Grid>
            }
            <Grid item display={'flex'} xs={0.2}></Grid>
            <Grid item display={'flex'} xs={1.5}>
              {(dataUser[0].UserRole === 'Manager' || dataUser[0].UserRole === "Administrator") &&

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
          <MyButton name={t("btnSearch")} onClick={handleSearch} disabled={isloading} />
          <MyButton name={t("btnClean")} onClick={handleRefresh} disabled={isloading} />
          <MyButton name={t("btnDelete")} onClick={handleDelete} disabled={isloading} />
          <MyButton name={t("btnPrint")} onClick={handlePrint} disabled={isloading} />
          <MyButton name={t("btnPrivewPrint")} disabled={isloading} onClick={() => setOpenPrintReview(true)} />
          {open && <CircularProgress size={'24px'} color="info" />}
          {openPrintReview && <FormPrintSample rows={listChx} onClose={() => setOpenPrintReview(false)} open={openPrintReview} />}
          {/* {cofirmType === 'print' && <ModalCofirm title={t("msgPrintSuccess") as string} onClose={handleCloseConfirm} open={openCofirm} onPressOK={handleCloseConfirm} />} */}
          {cofirmType === 'print-error' && <ModalCofirm title={t("msgPrintErrror") as string} onClose={handleCloseConfirm} open={openCofirm} onPressOK={handleCloseConfirm} />}
          {cofirmType === 'print-permission' && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("lblPrintPermission") as string} />}
          {cofirmType === 'delete-error' && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("msgDeleteError") as string} />}
        </Stack>
      </Box>
      <Stack overflow={"hidden"} sx={{ height: "100%" }}>
        <Stack sx={{ height: "50%" }}>
          <TableCheckBox
            columns={columnsUp}
            rows={rowUps}
            listChx={(params: any) => setListChx(params)}
            arrNotShowCell={["_id", "Supplier_No"]}
          />
        </Stack>
        <Stack direction="row" sx={{ height: "50%" }}>
          <Stack width={'85%'} height={'100%'} >
            <TableCheckBox
              columns={columnsDown}
              rows={rowDowns}
              onDoubleClick={handleDoubleClick}
              arrEditCell={[
                "Size",
                "Print_QTY",
                "Roll",
                "ywpm_Material",
                "Arrial_Qty",
              ]}
              dschx={listChxDown}
              arrNotShowCell={["_id", "zsdh_Supplier_No", "zsywjc_Supplier"]}
            />
          </Stack>
          <Stack width={'15%'} height={'100%'} sx={{ borderLeft: '2px solid white' }}>
            <TableCheckBox
              columns={columnsOrderNo}
              rows={rowOrderNo}
              
              onDoubleClick={null}
              listChx={(params: any) =>  setListChxOrder(params) }
              arrNotShowCell={["_id"]}
            />
          </Stack>
        </Stack>
      </Stack>
    </FullScreenContainerWithNavBar>
  );
};

export default DataHistoryPrintScreen;
