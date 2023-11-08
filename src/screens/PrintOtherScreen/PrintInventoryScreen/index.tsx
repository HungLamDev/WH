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
import Formprint from "../../../components/Formprint";
import ModalCofirm from "../../../components/ModalConfirm";
import { styletext } from "../../StockinScreenv2/StockinForm";
import TableDateTimePicker from "../../../components/TableDateTimePicker";
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
      field: "Total_Qty",
      headerName: t("dcpQTY_Show") as string, // Số lượng
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "Unit",
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
      headerName: t("dcmSupplier") as string, //cung ứng
      width: 70,
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
      headerName: t("dcpSize") as string, // Kích thước
      width: 160,
      headerClassName: "custom-header",
    },
    {
      field: "QtyofRoll",
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
  const columnsOrderNo: GridColDef[] = [
    {
      field: "Order_No",
      headerName: t("dcmOrder_No") as string,
      width: 120,
      headerClassName: "custom-header",
    },
  ];
  //#endregion
 
  //#region useSelector
  const dataUser = useSelector((state: any) => state.UserLogin.user);
  //#endregion

  //#region Variable
  const [disabled, setDisabled] = useState(false)
  const [rowDowns, setrowDowns] = useState<any[]>([]);
  const [rowUps, setrowUps] = useState<any[]>([]);
  const [orderNo, setOrderNo] = useState('');
  const [materialNo, setMaterialNo] = useState('');
  const [qty, setQTY] = useState('');
  const [workOrder, setWorkOrder] = useState('');
  const [supplier, setSupplier] = useState('');
  const [materialName, setMaterialName] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [unit, setUnit] = useState('');
  const [materialType, setMaterialType] = useState('');
  const [listChx, setListChx] = useState([])
  const [openPrintReview, setOpenPrintReview] = useState(false)
  const [openCofirm, setOpenCofirm] = useState(false)
  const [cofirmType, setCofirmType] = useState('')
  //#endregion

  //#region Func OnChange Input
  const handleOrderNo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrderNo(event.target.value);
  };

  const handleMaterialNo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaterialNo(event.target.value);
    const url = connect_string + "api/Data_Print_Inventory_txtMaterial_Textchanged"
    const data =
    {
      txtMaterial_No: event.target.value,
      get_version: dataUser[0].WareHouse

    }
    if (event.target.value.length > 9) {
      axios.post(url, data, config).then(response => {
        if (response.data.txtMaterial_Name !== null && response.data.txtMaterial_Name.txtProduction !== null) {
          setColor(response.data.txtColor)
          setMaterialName(response.data.txtMaterial_Name)
          setMaterialType(response.data.txtProduction)
          setSize(response.data.txtSize)
          setSupplier(response.data.txtSuplier)
          setUnit(response.data.txtUnit)
        }
      })
    }
  };

  const handleQTY = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQTY(event.target.value);
  };

  const handleWordOrder = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWorkOrder(event.target.value);
  };

  const handleSupplier = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSupplier(event.target.value);
  };

  const handleMaterialName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaterialName(event.target.value);
  };

  const handleColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  const handleSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value);
  };

  const handleUnit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUnit(event.target.value);
  };

  const handleMaterialType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaterialType(event.target.value);
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
    setDisabled(true)
    const url = connect_string + "api/Data_Print_Inventory_Search"
    const data = {
      txtSuplier: supplier,
      txtMaterial_Name: materialName,
      txtColor: color,
      txtSize: size,
      txtUnit: unit,
      txtProduction: materialType,
      txtOrderNo: orderNo,
      txtQty: qty,
      txtOrder_Word: workOrder,
      txtMaterial_No: materialNo,
      get_version: dataUser[0].WareHouse
    }
    axios.post(url, data, config).then(response => {
      const item = {
        zsywjc_Supplier: response.data.zsywjc_Supplier,
        CLBH_Material_No: response.data.CLBH_Material_No,
        ywpm_Material: response.data.ywpm_Material,
        Color: response.data.Color,
        Size: response.data.Size,
        QtyofRoll: response.data.QtyofRoll,
        Arrial_Qty: response.data.Arrial_Qty,
        QTY: response.data.QTY,
        dwbh_Units: response.data.dwbh_Units,
        CGNO_Order_No: response.data.CGNO_Order_No,
        Roll: response.data.Roll,
        CGDate_Date: response.data.CGDate_Date,
        ywsm_Production: response.data.ywsm_Production,
        ZLBH_Work_Order: response.data.ZLBH_Work_Order,
        cllb_Material_Type: response.data.cllb_Material_Type,
        zsdh_Supplier_No: response.data.zsdh_Supplier_No
      }
      if(item.CLBH_Material_No != null){
        setrowDowns([item])
      }
     
    }).finally(() => {
      setDisabled(false)
    })
  }

  const handleDoubleClick = (colName: string, params: any) => {
    setDisabled(true)
    const url = connect_string + "api/Data_Print_Inventory_CellDouble_Click"
    const data =
    {
      dcmOrder_No: params.CGNO_Order_No,
      dcmMaterial_No: params.CLBH_Material_No,
      dcmMaterial_Type: params.cllb_Material_Type,
      dcmColor: params.Color,
      dcmUnit: params.dwbh_Units,
      dcmQty_ROLL: params.QtyofRoll,
      dcmArrival_QTY: params.Arrial_Qty,
      dcmQTY: params.QTY,
      dcmRoll: params.Roll,
      dcmSize: params.Size,
      dcmMaterial: params.ywpm_Material,
      dcmProduction: params.ywsm_Production,
      dcmWork_Order: params.ZLBH_Work_Order,
      dcmSupplier_no: params.zsdh_Supplier_No,
      dcmSupplier: params.zsywjc_Supplier,
      dcmDate: params.CGDate_Date,
      User_Serial_Key: dataUser[0].UserId,
      get_version: dataUser[0].WareHouse
    }
    axios.post(url, data, config).then(response => {
      const arr = response.data.map((item: any, index: any) => ({
        _id: item.Barcode,
        Supplier: item.Supplier,
        Material_No: item.Material_No,
        Material_Name: item.Material_Name,
        Color: item.Color,
        Size: item.Size,
        QTY: item.QTY,
        Total_Qty: item.Total_Qty,
        Unit: item.Unit,
        Order_No: item.Order_No,
        Roll: item.Roll,
        Print_Date: moment(item.Print_Date).format("DD/MM/YYYY"),
        Production: item.Production,
        Work_Order: item.Work_Order,
        Material_Type: item.Material_Type,
        Barcode: item.Barcode,
        Print_QTY: item.Print_QTY
      }))
      const filteredDataInRowUps1 = rowUps.filter((oldItem) => {
        return !arr.some((newItem: any) => {
          return newItem.Barcode === oldItem.Barcode;
        });
      });
      const mergedDataInRowUps = [...filteredDataInRowUps1, ...arr];
      setrowUps(mergedDataInRowUps);
    }).finally(() => {
      setDisabled(false)
    })
  }

  const handleRefresh = () => {
    setrowDowns([])
    setrowUps([])
  }

  const handleDelete = () => {
    const url = connect_string + "api/Delete_Label_Print_Inventory"
    const arr = listChx.map((item: any) => item.Barcode)
    const data =
    {
      dcpCheck: true,
      dcpBarcode: arr,
      User_Serial_Key: dataUser[0].UserId,
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
        handleOpenConfirm('delete')
      }
    })
  }

  const handlePrint = async () => {
    if(await checkPermissionPrint(dataUser[0].UserId)){
      if (listChx.length > 0) {
        setDisabled(true)
        const url = connect_string + "api/Print_Inventory_Click"
        const arr = listChx.map((item: any) => item.Barcode)
        const data =
        {
          dcpCheck: true,
          dcpBarcode: arr,
          User_Serial_Key: dataUser[0].UserId,
          get_version: dataUser[0].WareHouse
  
        }
        axios.post(url, data, config).then(response => {
          if (response.data === true) {
            handleOpenConfirm('print')
          }
          else {
            handleOpenConfirm('print-erorr')
          }
        }).finally(() => {
          setDisabled(false)
        })
      }
      else {
        handleOpenConfirm('error-data')
      }
  
    }
    else{
      handleOpenConfirm('print-permission')
  }
   
  }
  //#endregion
  
  return (
    <FullScreenContainerWithNavBar
      sideBarDisable={true}
      sideBarNavigate=""
      title={t("frmPrint_Inventory") as string}
      navigate={"/"}
    >
      <Box
        paddingX={1}
        paddingBottom={1}
        className={"dark-bg-secondary border-bottom-white"}
      >
        <Stack direction={"row"} sx={{ marginX: "150px", marginBottom: "5px" }} justifyContent={"space-between"} spacing={2}>
          <InputField
            focus={true}
            label={t("dcmOrder_No") as string}
            handle={handleOrderNo}
            keydown=""
            value={orderNo}
            type={"text"}
            disable={disabled}
          />{" "}
          <InputField
            label={t("dcmQTY") as string}
            handle={handleQTY}
            keydown=""
            value={qty}
            type={"text"}
            disable={disabled}
          />
        </Stack>
        <Stack direction={"row"} sx={{ marginX: "150px", marginBottom: "5px" }} justifyContent={"space-between"} spacing={2}>
          <InputField
            label={t("dcmMaterial_No") as string}
            handle={handleMaterialNo}
            keydown=""
            value={materialNo}
            type={"text"}
            disable={disabled}
          />{" "}
          <InputField
            label={t("dcmWork_Order") as string}
            handle={handleWordOrder}
            keydown=""
            value={workOrder}
            type={"text"}
            disable={disabled}
          />
        </Stack>
        <Stack direction={"row"} sx={{ marginX: "150px", marginBottom: "5px" }} spacing={1}>
          <InputField
            label={""}
            handle={handleSupplier}
            keydown=""
            value={supplier}
            type={"text"}
            disable={disabled}
          />
          <InputField
            label={""}
            handle={handleMaterialName}
            keydown=""
            value={materialName}
            type={"text"}
            disable={disabled}
          />
          <InputField
            label={""}
            handle={handleColor}
            keydown=""
            value={color}
            type={"text"}
            disable={disabled}
          />
          <InputField
            label={""}
            handle={handleSize}
            keydown=""
            value={size}
            type={"text"}
            disable={disabled}
          />
          <InputField
            label={""}
            handle={handleUnit}
            keydown=""
            value={unit}
            type={"text"}
            disable={disabled}
          />
          <InputField
            label={""}
            handle={handleMaterialType}
            keydown=""
            value={materialType}
            type={"text"}
            disable={false}
          />
        </Stack>

        <Stack
          width={"100%"}
          direction={"row"}
          spacing={3}
          alignItems={"center"}
          justifyContent={'center'}
        >
          <FormControlLabel
            sx={styletext}
            className="text"
            control={<Checkbox checked sx={{ color: "white" }} value={""} />}
            label={t("chxAll")}
          />
          <MyButton name={t("btnSearch")} disabled={disabled} onClick={handleSearch} />
          <MyButton name={t("btnClean")} disabled={disabled} onClick={handleRefresh} />
          <MyButton name={t("btnDelete")} disabled={disabled} onClick={handleDelete} />
          <MyButton name={t("btnPrint")} disabled={disabled} onClick={handlePrint} />
          <MyButton name={t("btnPrivewPrint")} disabled={disabled} onClick={() => setOpenPrintReview(true)} />
          {openPrintReview && <Formprint rows={listChx} onClose={() => setOpenPrintReview(false)} open={openPrintReview} />}
          {/* {cofirmType === 'print' && <ModalCofirm title={t("msgPrintSuccess") as string} onClose={handleCloseConfirm} open={openCofirm} onPressOK={handleCloseConfirm} />} */}
          {cofirmType === 'print-error' && <ModalCofirm title={t("msgPrintErrror") as string} onClose={handleCloseConfirm} open={openCofirm} onPressOK={handleCloseConfirm} />}
          {cofirmType === 'delete' && <ModalCofirm title={t("msgDeleteError") as string} onClose={handleCloseConfirm} open={openCofirm} onPressOK={handleCloseConfirm} />}
          {cofirmType === 'error-data' && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title= {t("msgChooseStamp") as string} />}
          {cofirmType === 'print-permission' && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("lblPrintPermission") as string} />}
        </Stack>
      </Box>
      <Stack overflow={"hidden"} sx={{ height: "100%" }}>
        <Stack sx={{ height: "50%" }}>
          <TableCheckBox
            columns={columnsUp}
            rows={rowUps}
            listChx={(params: any) => { setListChx(params) }}
            arrNotShowCell={["_id", "Print_QTY"]}
          />
        </Stack>
        <Stack direction="row" sx={{ height: "50%" }}>
          <TableDateTimePicker
            columns={columnsDown}
            rows={rowDowns}
            onDoubleClick={handleDoubleClick}
            arrEditCell={[
              "Size",
              "QtyofRoll",
              "Roll",
              "ywpm_Material",
              "Arrial_Qty",
              "ywsm_Production"
            ]}
            arrNotShowCell={["_id", "zsdh_Supplier_No"]}
          />
        </Stack>
      </Stack>
    </FullScreenContainerWithNavBar >
  );
};

export default DataHistoryPrintScreen;
