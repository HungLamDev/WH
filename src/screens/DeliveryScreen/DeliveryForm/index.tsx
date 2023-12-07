//#region  import
import React, { useEffect, useRef } from 'react'
import { IconButton, Box, Stack, Typography, Divider, Grid, Checkbox, FormControlLabel, FormGroup, TextField, Button, Modal, MenuItem, Autocomplete } from "@mui/material";
import { GridColDef } from '@mui/x-data-grid';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import FullScreenContainerWithNavBar from "../../../components/FullScreenContainerWithNavBar";
import InputField from "../../../components/InputField";
import MyButton from "../../../components/MyButton";
import { useState } from "react";
import EnterIcon from '../../../assets/enter.png'
import DatePickerField from '../../../components/DatePickerField';
import { BsListCheck } from "react-icons/bs";
import moment from 'moment';
import { currentDay } from '../../../utils/date';
import TableCheckBox from '../../../components/TableCheckBox';
import { connect_string } from '../../LoginScreen/ChooseFactory'; 
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import { addItemMaterialTable, removeItemMaterialTable, clearItemsMaterialTable } from '../../../redux/array';
import { addItemMaterialTableChecked, copyItemsMaterialTableChecked, clearItemsMaterialTableChecked } from '../../../redux/MaterialTableChecked';
import { copyArrayDelivery, updateRY_Status1ByMaterialNo, updateRY_Status2ByMaterialNo, doublelickOrderNo, clearArrayDelivery, updateRY_Status1ByDelivery_Serial } from '../../../redux/ArrayDelivery';
import Statistics from '../../StockinScreenv2/StatisticsForm';
import { useTranslation } from "react-i18next";
import UpdateModalForm from '../UpdateModalForm';
import ModalHistoryMaterial from '../ModalHistoryMaterialForm';
import HistoryRY from '../HistoryRYForm';
import * as ExcelJS from "exceljs";
import { styletext } from '../../StockinScreenv2/StockinForm';
import TableDelivery from '../../../components/TableDelivery';
import { listSupplier } from '../Data';
import QRScanner from '../../../components/QRScanner';
import ModalCofirm from '../../../components/ModalConfirm';
import ModalLocation from '../ModalLocation';
import { successSound } from '../../../utils/pathsound';
import { clearArrayStockout } from '../../../redux/ArrayStockout';
import TableCheckBoxRedux from '../../../components/TableCheckBoxRedux';
//#endregion

const DeliveryScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
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
  const columns: GridColDef[] = [
    {
      field: "Date_Start",
      headerName: t("dcmDate") as string,
      width: 150,
    },
    {
      field: "Num_No",
      headerName: t("dcpNum_No") as string,
      width: 150,
    },
    {
      field: "Material_No",
      headerName: t("dcmMaterial_No") as string,
      width: 150,
    },
    {
      field: "Count_Stock_Qty",
      headerName: t("dcpInventory") as string,
      width: 150,
    },
    {
      field: "Material_Name",
      headerName: t("dcmMaterial_Name") as string,
      width: 250,
    },
    {
      field: "Color",
      headerName: t("dcmColor") as string,
      width: 150,
    },
    {
      field: "RY_Status",
      headerName: t("dcmQTY") as string,
      width: 150,
    },
    {
      field: "RY",
      headerName: t("chxRY") as string,
      width: 400,
    },
    {
      field: "Rack",
      headerName: t("dcmRack_ID") as string,
      width: 90,
    },
    {
      field: "RY_Status1",
      headerName: t("dcpContent") as string,
      width: 200,
    },
    {
      field: "RY_Status2",
      headerName: "",
      width: 50,
    },
    {
      field: "User_Serial_Key",
      headerName: "",
      width: 50,
    },
  ];
  const columns_modal = [
    {
      field: "Material_No",
      headerName: t("dcmMaterial_No"),
      width: 250,
    },
  ];

  interface rowModal {
    id: number,
    Material_No: string
  }
  //#endregion

  //#region useSelector
  const dataUser = useSelector((state: any) => state.UserLogin.user);
  const ArrayDelivery = useSelector((state: any) => state.ArrayDelivery.deliverys);
  const MaterialTable = useSelector((state: any) => state.MaterialTable.items);
  //#endregion

  //#region Variable
  const [openDateFrom, setOpenDateFrom] = useState(moment().add('day', -3).format("YYYY/MM/DD"));
  const [openDateTo, setOpenDateTo] = useState(currentDay);
  const [updateDateFrom, setUpdateDateFrom] = useState(currentDay);
  const [updateDateTo, setUpdateDateTo] = useState(currentDay);
  const rows_modal: any[] = [];
  const [rowsModal, setRowsModal] = useState<any[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [modalScan, setModalScan] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [orderNo, setOrderNo] = useState('');
  const [location, setLocation] = useState('');
  const [acceptNo, setAcceptNo] = useState('');
  const [materialName, setMaterialName] = useState('');
  const [color, setColor] = useState('');
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [checked, setChecked] = useState(false);
  const [materialChange, setMaterialChange] = useState({})
  const [materialNameChange, setMaterialNameChange] = useState({})
  const locate = useLocation()
  const [dataUpdate, setDataUpdate] = useState({})
  const [historyMaterial, setHistoryMaterial] = useState([])
  const [dataModalLocation, setDataModalLocation] = useState([])
  const [disable, setDisable] = useState(false)
  const [valueAutocomplete, setValueAutocomplete] = React.useState<string | null>('');
  const [chxOffset, setChxOffSet] = useState(false)
  const [dataStatistic, setDataStatistic] = useState('')
  const [materialNoLocation, setMaterialNoLocation] = useState('')
  const [chxLoad_Data, setChxLoad_Data] = useState(true)
  const [chxRack, setChxRack] = useState(false)
  const [onFocus, setOnFocus] = useState(false)
  const [chxAll, setChxAll] = useState(false)
  const [isApi, setIsApi] = useState(true)
  const contentDetail = locate.state
  //#endregion
  
  //#region Func OnChange Input
  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleAcceptNo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAcceptNo(event.target.value);
  };

  const handleChxOffSet = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChxOffSet(event.target.checked);
  };

  const handleChxAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChxAll(event.target.checked);
  };

  const handleChxLoadData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChxLoad_Data(event.target.checked);
  };

  const handleChxRack = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChxRack(event.target.checked);
    if (event.target.checked === true) {
      const sortedData = [...ArrayDelivery].sort((a, b) => a.Rack.localeCompare(b.Rack));
      dispatch(copyArrayDelivery(sortedData))
    }
    else {
      const sortedData = [...ArrayDelivery].sort((a, b) => a._id - b._id)
      dispatch(copyArrayDelivery(sortedData))
    }
  };
  const handleOrderNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrderNo(event.target.value);
  };
  
  //#endregion

  //#region useEffect
  useEffect(() => {
    if (contentDetail) {
      dispatch(clearArrayStockout())
      const url = connect_string + "api/Get_Value_Content"
      axios.post(url, contentDetail, config).then(response => {
        dispatch(updateRY_Status1ByDelivery_Serial({ DeliverySerial: response.data.Delivery_Serial, newStatus: response.data.Value_Content }))
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentDetail])

  useEffect(() => {
    if (orderNo.length >= 11) {
      setIsLoading(true)
      dispatch(clearItemsMaterialTable())
      dispatch(clearItemsMaterialTableChecked())
      const url = connect_string + 'api/getData_TextChange'
      const data = {
        txtNum_No: orderNo,
        lblOutSource: checked,
        txtLocation: location,
        get_version: dataUser[0].WareHouse
      }
      axios.post(url, data, config).then(response => {
        setLocation(response.data[0].txtLocation);
        setAcceptNo(response.data[0].txtAccept_No);
        setMaterialName(response.data[0].txtMaterial_Name);
        setColor(response.data[0].txtColor);
        //Set list for row modal
        const dataArray = response.data[0].txtAccept_No.split(', ').map((item:any) => item.replace(/^,|,$/g, '')).filter((item:any) => item !== '')
        let rowtemp = null;
        const newRows = dataArray.map((item: any, index: number) => {
          rowtemp = { _id: index, Material_No: item }
          rows_modal.push(rowtemp)
          dispatch(addItemMaterialTable(rowtemp))
          dispatch(addItemMaterialTableChecked(rowtemp))
        });
      }).finally(() => {
        setIsLoading(false)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderNo]);
  //#endregion

  //#region Func Logic

  const handleDateChange = (name: string, param: any) => {
    if (name === 'openDateFrom') {
      setOpenDateFrom(param);
    }
    if (name === 'openDateTo') {
      setOpenDateTo(param);
    }
    if (name === 'updateDateFrom') {
      setUpdateDateFrom(param);
    }
    if (name === 'updateDateTo') {
      setUpdateDateTo(param);
    }
  };

  const handleRowSelectionModelChange = (params: any) => {
    const selectedRowIds = params ? params.map((item: any) => parseInt(item._id.toString())) : [];
    const selectedRows = MaterialTable.filter((row: any) => selectedRowIds.includes(row._id));
    dispatch(copyItemsMaterialTableChecked(selectedRows))
    const selectedRowNames = selectedRows.map((row: any) => row.Material_No);
    const str = selectedRowNames.join(', ');
    setAcceptNo(str);
  };

  const handleChange = () => {
    setChecked(!checked);
  };

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const handleDelivery = () => {
    setIsLoading(true)
    setDisable(true)
    const url = connect_string + "api/btnEntern_Delivery1"
    const data = {
      chxOffset: chxOffset,
      chxLoad_Data: chxLoad_Data,
      chxAll: chxAll,
      Num_No: orderNo,
      txtAccept_No: acceptNo,
      cboSupplier: valueAutocomplete,
      txtLocation: location,
      User_Serial_Key: dataUser[0].UserId,
      lblOutsource: checked,
      dtpFrom_Date: moment(updateDateFrom).format('YYYY/MM/DD HH:mm:ss'),
      dtpTo_Date: moment(updateDateTo).format('YYYY/MM/DD HH:mm:ss'),
      get_version: dataUser[0].WareHouse,
      saFactory: dataUser[0].factoryName
    }
    axios.post(url, data, config).then(response => {
      const array = response.data.map((item: any, index: any) => ({
        _id: index,
        ...item
        // Date_Start: item.Date_Start,
        // Num_No: item.Num_No,
        // Material_No: item.Material_No,
        // Count_Stock_Qty: item.Count_Stock_Qty,
        // Material_Name: item.Material_Name,
        // Color: item.Color,
        // RY_Status: item.RY_Status,
        // RY: item.RY,
        // Rack: item.Rack,
        // RY_Status1: item.RY_Status1,
        // RY_Status2: item.RY_Status2,
        // User_Serial_Key: item.User_Serial_Key,
      }));
      if (array[array.length - 1] && array[array.length - 1].dtpFrom_Open) {
        // setOpenDateFrom(array[array.length - 1].dtpFrom_Open.split(" ")[0].split("/")[2] + "/" + array[array.length - 1].dtpFrom_Open.split(" ")[0].split("/")[1] + "/" + array[array.length - 1].dtpFrom_Open.split(" ")[0].split("/")[0])
        setOpenDateFrom(moment(array[array.length - 1].dtpFrom_Open).format("YYYY/MM/DD"))
      }
      dispatch(copyArrayDelivery(array))
      setRows(array);
      setOrderNo('');
      setLocation('');
      setAcceptNo('');
      setValueAutocomplete('');
      setMaterialName('');
      setColor('');
      setRowsModal([]);

    }).finally(() => {
      setIsLoading(false)
      setDisable(false)
      setOnFocus(true)
    })
  }

  const handleSearch = () => {
    setDisable(true)
    setIsLoading(true)
    const url = connect_string + "api/SearchDelivery"
    const data = {
      chxOffset: chxOffset,
      chxLoad_Data: chxLoad_Data,
      chxAll: chxAll,
      Num_No: orderNo,
      txtAccept_No: acceptNo,
      cboSupplier: valueAutocomplete,
      txtLocation: location,
      User_Serial_Key: dataUser[0].UserId,
      lblOutsource: checked,
      dtpFrom_Date: moment(updateDateFrom).format('YYYY/MM/DD HH:mm:ss'),
      dtpTo_Date: moment(updateDateTo).format('YYYY/MM/DD HH:mm:ss'),
      get_version: dataUser[0].WareHouse,
      saFactory: dataUser[0].factoryName
    }

    axios.post(url, data, config).then(response => {
      const array = response.data.map((item: any, index: any) => ({
        _id: index,
        // Date_Start: item.Date_Start,
        // Num_No: item.Num_No,
        // Material_No: item.Material_No,
        // Count_Stock_Qty: item.Count_Stock_Qty,
        // Material_Name: item.Material_Name,
        // Color: item.Color,
        // RY_Status: item.RY_Status,
        // RY: item.RY,
        // Rack: item.Rack,
        // RY_Status1: item.RY_Status1,
        // RY_Status2: item.RY_Status2,
        // User_Serial_Key: item.User_Serial_Key,
        ...item,
      }));

      dispatch(copyArrayDelivery(array))
      setRows(array);

    }).finally(() => {
      setIsLoading(false)
      setDisable(false)
    })
  }

  const handleReset = () => {
    dispatch(clearItemsMaterialTable())
    dispatch(clearItemsMaterialTableChecked())
    dispatch(clearArrayDelivery())
    setOrderNo('');
    setLocation('');
    setAcceptNo('');
    setValueAutocomplete('');
    setMaterialName('');
    setColor('');
    setRowsModal([]);
  }

  const handleOpen = (name: string) => {
    setModalType(name)
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setModalType('');
  };

  const handleEnter = ((event: any) => {
    if (event.key === 'Enter') {
      handleDelivery()
    }
  })

  const handleDoubleClick = (columnName: any, item: any) => {
    if(isApi === true){
      const url = connect_string + 'api/GetData_CellDoubleClick_Delivery'
      if (columnName === 'Material_No') {
        setIsApi(false)
        const data = {
          Count_dgv: ArrayDelivery.length,
          Name_Column: "dcmMaterial_No",
          Material_No: item.Material_No,
          User_Serial_Key: dataUser[0].UserId,
          get_version: dataUser[0].WareHouse
        }
        axios.post(url, data, config).then(response => {
          if (response.data.length > 0) {
            const arr = response.data.map((item: any, index: any) => ({
              _id: index,
              ...item
            }))
            setHistoryMaterial(arr)
          }
        }).finally(()=>{
          setIsApi(true)
        })
        handleOpen('history-material')
      }
      if (columnName === 'Date_Start') {
        setDisable(true)
        setIsLoading(true)
        setIsApi(false)
        const data = {
          User_Serial_Key: dataUser[0].UserId,
          Count_dgv: ArrayDelivery.length,
          Name_Column: "dcmOpen_Date",
          Stamp_RY: "",
          Delivery_Serial: item.Delivery_Serial,
          RY_Status: item.RY_Status2,
          Material_No: item.Material_No,
          Open_date: item.Date_Start,
          txtLocation: location,
          dtpFrom_Date: updateDateFrom.format("DD/MM/YYYY HH:MM:SS"),
          dtpTo_Date: updateDateTo.format("DD/MM/YYYY HH:MM:SS"),
          get_version: dataUser[0].WareHouse
        }
        axios.post(url, data, config).then(response => {
          const array = response.data.map((item: any, index: any) => ({
            _id: index,
            Date_Start: item.Date_Start,
            Num_No: item.Num_No,
            Material_No: item.Material_No,
            Count_Stock_Qty: item.Count_Stock_Qty,
            Material_Name: item.Material_Name,
            Color: item.Color,
            RY_Status: item.RY_Status,
            RY: item.RY,
            Rack: item.Rack,
            RY_Status1: "",
            RY_Status2: item.RY_Status1,
            User_Serial_Key: item.User_Serial_Key,
            Delivery_Serial: item.Delivery_Serial
          }));
  
          dispatch(copyArrayDelivery(array))
          setRows(array);
  
        }).finally(() => {
          setIsLoading(false)
          setDisable(false)
          setIsApi(true)
        })
  
      }
      if (columnName === 'Num_No') {
        setIsApi(false)
        const data = {
          Count_dgv: ArrayDelivery.length,
          Name_Column: "dcmOrder_No",
          RY: item.RY,
          Material_No: item.Material_No,
          Delivery_Serial: item.Delivery_Serial,
          Num_No: item.Num_No,
          get_version: dataUser[0].WareHouse
  
        }
        axios.post(url, data, config).then(response => {
          if (response.data.length > 0) {
            dispatch(doublelickOrderNo({ orderNo: item.Num_No, RY: item.RY, newStatus: response.data }))
          }
        }).finally(()=>{
          setIsApi(true)
        })
      }
      if (columnName === 'RY_Status2') {
        if (item.RY_Status2 === "In") {
          setIsApi(false)
          const data = {
            User_Serial_Key: dataUser[0].UserId,
            Count_dgv: ArrayDelivery.length,
            Name_Column: "dcmStatus",
            Material_Name: item.Material_Name,
            Color: item.Color,
            Stam_Num_No: orderNo,
            RY_Status: item.RY_Status2,
            Material_No: item.Material_No,
            Open_date: item.Date_Start,
            txtLocation: location,
            dtpFrom_Date: moment(updateDateFrom).format("DD/MM/YYYY HH:MM:SS"),
            dtpTo_Date: updateDateTo.format("DD/MM/YYYY HH:MM:SS"),
            Content: item.RY_Status1,
            Num_No: item.Num_No,
            Delivery_Serial: item.Delivery_Serial,
            get_version: dataUser[0].WareHouse
  
          }
          axios.post(url, data, config).then(response => {
            if (response.data.length > 0) {
              dispatch(updateRY_Status2ByMaterialNo({ materialNo: item.Material_No, RY: item.RY, newStatus: "Out" }))
            }
          }).finally(()=>{
            setIsApi(true)
          })
        }
        else {
          setIsApi(false)
          const data = {
            User_Serial_Key: dataUser[0].UserId,
            Count_dgv: ArrayDelivery.length,
            Name_Column: "dcmStatus",
            Material_Name: item.Material_Name,
            Color: item.Color,
            Stam_Num_No: orderNo,
            RY_Status: item.RY_Status2,
            Material_No: item.Material_No,
            Open_date: item.Date_Start,
            txtLocation: location,
            dtpFrom_Date: updateDateFrom,
            dtpTo_Date: updateDateTo,
            Content: item.RY_Status1,
            Num_No: item.Num_No,
            Delivery_Serial: item.Delivery_Serial,
            get_version: dataUser[0].WareHouse
  
          }
          axios.post(url, data, config).then(response => {
            if (response.data.length > 0) {
              dispatch(updateRY_Status2ByMaterialNo({ materialNo: item.Material_No, RY: item.RY, newStatus: "In" }))
            }
          }).finally(()=>{
            setIsApi(true)
          })
        }
      }
      if (columnName === 'RY_Status1') {
        setIsApi(false)
      
        const data = {
          Name_Column: "dcpContent",
          RY_Status: item.RY_Status2,
          User_Serial_Key: dataUser[0].UserId,
          Material_No: item.Material_No,
          Count_dgv: ArrayDelivery.length,
          Qty: item.RY_Status,
          get_version: dataUser[0].WareHouse,
          Delivery_Serial: item.Delivery_Serial
  
        }
        axios.post(url, data, config).then(response => {
          if (response.data.length > 0) {
            navigate('/stock-out', { state: { data: response.data, dataRY: item }});
          }
        }).finally(()=>{
          setIsApi(true)
        })
  
      }
      if (columnName === 'Count_Stock_Qty') {
        
        const data = {
          Count_dgv: ArrayDelivery.length,
          Name_Column: "dcpQty_Redundant",
          RY: item.RY,
          Material_No: item.Material_No,
          Delivery_Serial: item.Delivery_Serial,
          Num_No: item.Num_No,
          get_version: dataUser[0].WareHouse,
          Color: item.Color,
          Material_Name: item.Material_Name,
          User_Serial_Key: item.User_Serial_Key
  
        }
        setMaterialChange(data)
        handleOpen('change-materialNo')
      }
      if (columnName === 'Color') {
        const data = {
          Count_dgv: ArrayDelivery.length,
          Name_Column: "dcpQty_Redundant",
          RY: item.RY,
          Material_No: item.Material_No,
          Delivery_Serial: item.Delivery_Serial,
          Num_No: item.Num_No,
          get_version: dataUser[0].WareHouse,
          Color: item.Color,
          Material_Name: item.Material_Name,
          User_Serial_Key: item.User_Serial_Key
  
        }
        setMaterialNameChange(data)
        handleOpen('change-materialName')
      }
      if (columnName === 'RY') {
        setIsApi(false)
        const data = {
          Count_dgv: ArrayDelivery.length,
          Name_Column: "dcpRemak_RY",
          RY: item.RY,
          Material_No: item.Material_No,
          Delivery_Serial: item.Delivery_Serial,
          Num_No: item.Num_No,
          get_version: dataUser[0].WareHouse,
          Color: item.Color,
          Material_Name: item.Material_Name,
          User_Serial_Key: item.User_Serial_Key
        }
        axios.post(url, data, config).then(response => {
          if (response.data.length > 0) {
            const valueListArray = response.data[0].Value_List_Material_No.split(',');
            const arr = valueListArray.map((item: any, index: any) => ({
              _id: index,
              Location: item
            }))
            setDataModalLocation(arr)
  
          }
        }).finally(()=>{
          setIsApi(true)
        })
        setMaterialNoLocation(item.Material_No)
        handleOpen('modal-location')
  
      }
    }
   
  }

  const handleRowClick = (colName: any, params: any) => {
    setDataUpdate({ params: params, dgvcount: ArrayDelivery.length })
    setDataStatistic(params.Material_No)
  }

  const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    const expandedData: Array<Array<string | Date>> = [];
    const data = [
      ["", "", "", "", "", ""],
      ["DANH SÁCH PHÁT VẬT TƯ", "", "", "", "", ""],
      ["Ngày nhận : 16/08/2023", "", "", "", "", ""],
      [
        "Ngày mở phiếu",
        "STT",
        "Mã vật tư / Tên vật tư / Màu",
        "Trạng thái",
        "Dạng giày",
        "Tổng",
      ],
    ];
    expandedData.push(
      ["", "", "", "", "", ""],
      ["DANH SÁCH PHÁT VẬT TƯ", "", "", "", "", ""],
      ["Ngày nhận : 16/08/2023", "", "", "", "", ""],
      [
        "Ngày mở phiếu",
        "STT",
        "Mã vật tư / Tên vật tư / Màu",
        "Trạng thái",
        "Dạng giày",
        "Tổng",
      ]
    );
    rows.map((row, i) => {
      const mvt = row.Material_Name;
      const danggiay = mvt.substring(mvt.indexOf(",") + 1, 6);
      const onerow = [
        i + 1,
        row.Material_No,
        row.Material_Name + "     /     " + row.Color,
        row.RY_Status2,
        danggiay,
        row.RY_Status,
      ];
      const tworow = [row.Date_Start, row.Num_No, row.RY, "", "", row.RY_Status1];
      expandedData.push(onerow, tworow);
    }),
      expandedData.forEach((row, rowIndex) => {
        const flattenedData = expandedData.flat();

        flattenedData.forEach((cellValue, index) => {
          const rowIndex = Math.floor(index / data[0].length); // Tính chỉ số hàng
          const columnIndex = index % data[0].length; // Tính chỉ số cột

          const cell = worksheet.getCell(rowIndex + 1, columnIndex + 1);
          cell.value = cellValue;
          cell.alignment = {
            wrapText: true,
          };

          if (rowIndex > 2) {
            cell.border = {
              top: { style: "thin" },
              bottom: { style: "thin" },
              left: { style: "thin" },
              right: { style: "thin" },
            };


          }
        });
      });
    for (let i = 6; i < expandedData.length * 2 + 2; i += 2) {
      worksheet.mergeCells(`C${i}:E${i}`);
    }
    const columnWidths = [15, 15, 30, 15, 15, 15];
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
    const secondRow = worksheet.getRow(3);
    secondRow.font = {
      bold: true, // Chữ in đậm
    };

    const threeRow = worksheet.getRow(4);
    threeRow.font = {
      bold: true, // Chữ in đậm
    };
    threeRow.alignment = {
      vertical: "middle", // Canh giữa dọc
      horizontal: "center", // Canh giữa ngang
    };
    worksheet.mergeCells(`A2:F2`);
    worksheet.mergeCells(`A3:F3`);

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Danh sách phát vật tư.xlsx";
      link.click();
    });
  };

  const handleScanClick = () => {

    setModalScan(true);
  }

  const handleScan = async (result: any | null) => {

    if (result || result.text) {
      // setQRCode(result.text)
      setOrderNo(result.text)
      setModalScan(false);
      modalScan && successSound.play();
    }
  }

  const handleOKUpdateMaterialNo = () => {
    const url = connect_string + 'api/GetData_CellDoubleClick_Delivery'
    axios.post(url, materialChange, config).then(response => {
      if (response.data.length > 0) {
        setOpen(false)
      }
    })
  }

  const handleOKUpdateMaterialName = () => {
    const url = connect_string + 'api/GetData_CellDoubleClick_Delivery'
    axios.post(url, materialNameChange, config).then(response => {
      if (response.data.length > 0) {
        setOpen(false)
      }
    })
  }
  //#endregion
 
  return (
    <FullScreenContainerWithNavBar hidden={true} sideBarDisable={true} onShowScan={handleScanClick} sideBarNavigate='' title={t("lblData_Material_Delivery")} navigate="/">
      <Box
        paddingX={1}
        paddingBottom={1}
        className={"dark-bg-secondary border-bottom-white"}
      >
        <Stack direction={'row'} width={'100%'} margin={'auto'}>
          <Stack width={'50%'}>
            <Grid container>
              <Grid container justifyContent={'center'}>
                <Grid item xs={1}>
                  <FormGroup>
                    <FormControlLabel className="text" control={<Checkbox
                      sx={{ color: 'white' }} />}
                      onChange={handleChange} label={undefined} />
                  </FormGroup>
                </Grid>
                <Grid item display={'flex'} xs={9}>
                  <InputField focus={true} disable={disable} label={t('lblOutsource') as string} keydown={handleEnter} handle={handleOrderNoChange} value={orderNo} onFocus={onFocus} />
                </Grid>
                <Grid item xs={1}>
                  <FormGroup>
                    <FormControlLabel className="text" sx={styletext} control={<Checkbox defaultChecked sx={{ color: 'white' }} value={chxLoad_Data} onChange={handleChxLoadData} />} label={undefined} />
                  </FormGroup>
                </Grid>
                <Grid item xs={1} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                  <IconButton disabled={disable}>
                    <img src={EnterIcon} alt="enter" width={"40px"} height={"30px"} onClick={handleDelivery} />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid container >
                <Grid item xs={1}  >
                  {/* {isLoading && <CircularProgress size={'25px'} color="info" />} */}
                </Grid>
                <Grid item xs={9} display={'flex'} >
                  <InputField disable={disable} label={t('dcmMaterial_Name') as string} value={materialName} />
                </Grid>

              </Grid>
              <Grid container columnSpacing={1} alignItems={'center'} marginTop={'4px'}>
                <Grid item xs={1}>

                </Grid>
                <Grid item xs={3.1} display={'flex'}>
                  <span className='textsize'>{t('lblOpen_Date')}</span>
                </Grid>
                <Grid item xs={2.8} display={'flex'}>
                  <DatePickerField valueDate={(param: any) => handleDateChange('openDateFrom', param)} onValueChange={openDateFrom} />
                </Grid>
                <Grid item xs={2.8} display={'flex'}>
                  <DatePickerField valueDate={(param: any) => handleDateChange('openDateTo', param)} />
                </Grid>
                <Grid item xs={1.5} justifyContent={'center'} display={'flex'}>
                  {isLoading && <CircularProgress size={'24px'} color='info' />}
                </Grid>
              </Grid>
            </Grid>
          </Stack>
          <Stack width={'50%'}>
            <Grid container>
              <Grid container >
                <Grid item xs={4} display={'flex'}>
                  <InputField disable={disable} value={location} handle={handleLocationChange} />
                </Grid>
                <Grid item xs={6} display={'flex'}>
                  <InputField disable={disable} value={acceptNo} handle={handleAcceptNo} />
                </Grid>
                <Grid item xs={2} display={'flex'}>
                  <IconButton disabled={disable} className={'sidebar-toggle-button'} onClick={() => handleOpen('list-material')}>
                    <BsListCheck />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid container display={'flex'} alignItems={'center'}>
                <Grid item xs={4} paddingRight={'16px'}>
                  {checked && (

                    <Autocomplete
                      value={valueAutocomplete}
                      onChange={(event: any, newValue: string | null) => {
                        setValueAutocomplete(newValue);
                      }}
                      className="dark-bg-primary"
                      disablePortal
                      options={listSupplier}
                      id="combo-box-demo"
                      disabled={disable}
                      sx={{
                        borderRadius: "50px",
                        border: "1px solid",
                        "& .MuiInputBase-root": {
                          height: "2rem",
                        },

                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          className="dark-bg-primary"
                          sx={{
                            borderRadius: "50px",
                            color: "white",
                            height: "2rem",
                            "& fieldset": {
                              borderColor: "white",
                              border: "none"
                            },
                            "& .MuiInputBase-input": {
                              paddingTop: "0 !important",
                              paddingBottom: "20px !important",
                              paddingLeft: "5px !important"
                            }
                          }}
                        />
                      )}
                    />
                  )}
                </Grid>
                <Grid item xs={6} display={'flex'}>
                  <InputField value={color} disable={disable} />
                </Grid>
              </Grid>
              <Grid container columnSpacing={1} alignItems={'center'} marginTop={'4px'}>
                <Grid item xs={4.1} display={'flex'}>
                  <span className='textsize'>{t('dcmModify_Date')}</span>
                </Grid>
                <Grid item xs={2.8} display={'flex'}>
                  <DatePickerField valueDate={(param: any) => handleDateChange('updateDateFrom', param)} />
                </Grid>
                <Grid item xs={2.8} display={'flex'}>
                  <DatePickerField valueDate={(param: any) => handleDateChange('updateDateTo', param)} />
                </Grid>
                <Grid item xs={2}>
                  <FormGroup>
                    <FormControlLabel className="text" sx={styletext} control={<Checkbox sx={{ color: 'white' }} value={chxRack} onChange={handleChxRack} />} label={t("dcpShelves")} />
                  </FormGroup>
                </Grid>
              </Grid>
            </Grid>
          </Stack>
        </Stack>
        <Stack marginTop={'10px'} width={'100%'} direction={'row'} spacing={1} justifyContent={'center'}>
          <FormGroup >
            <FormControlLabel className="text" sx={styletext} control={<Checkbox value={chxAll} onChange={handleChxAll}
              sx={{ color: 'white' }} />}
              label={t('chxAll')} />
          </FormGroup>
          <MyButton name={t('btnSearch')} onClick={handleSearch} disabled={disable} />
          <MyButton name={t('btnExcel')} disabled={disable} onClick={exportToExcel} />
          <MyButton name={t('btnUpdate_Delivery')} onClick={() => handleOpen('update')} disabled={disable} />
          <MyButton name={t('btnClean')} onClick={handleReset} disabled={disable} />
          <MyButton name={t('btnHistory')} onClick={() => handleOpen('history-ry')} disabled={disable} />
          <MyButton name={t('btnStatistical')} onClick={() => handleOpen('statistic')} disabled={disable} />
          <MyButton name={t('lblCheckData')} onClick={() => navigate("/check-data")} disabled={disable} />
          <FormGroup>
            <FormControlLabel className="text" sx={styletext} control={<Checkbox sx={{ color: 'white' }} value={chxOffset} onChange={handleChxOffSet} />} label={t('chxOffset')} />
          </FormGroup>
        </Stack>
        {modalType === 'history-material' && <ModalHistoryMaterial open={open} onClose={handleClose} dataUpdate={historyMaterial} />}
        {modalType === 'modal-location' && <ModalLocation open={open} onClose={handleClose} dataUpdate={dataModalLocation} materialNo={materialNoLocation} dtpFrom_Date={updateDateFrom} dtpTo_Date={updateDateTo} dtpFrom_Open={openDateFrom} dtpTo_Open={openDateTo} />}
        {modalType === 'change-materialNo' && <ModalCofirm onPressOK={handleOKUpdateMaterialNo} open={open} onClose={handleClose} title={t("msgYouWantUpdate") as string} />}
        {modalType === 'change-materialName' && <ModalCofirm onPressOK={handleOKUpdateMaterialName} open={open} onClose={handleClose} title={t("msgYouWantUpdate") as string} />}
        {modalType === 'history-ry' && <HistoryRY open={open} onClose={handleClose} />}
        {modalType === 'statistic' && (<Statistics open={open} onClose={handleClose} materialNo={dataStatistic} />)}
        {modalType === 'update' && (<UpdateModalForm dataUpdate={dataUpdate} open={open} onClose={handleClose} />)}
        {modalType === 'list-material' && (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <TableCheckBoxRedux
                rows={MaterialTable}
                columns={columns_modal}
                arrNotShowCell={['_id']}
                tableName='delivery-material'
                listChx={handleRowSelectionModelChange} />
            </Box>
          </Modal>
        )
        }
        {modalScan && <QRScanner onScan={handleScan} open={modalScan} onClose={() => { setModalScan(false); }} />}
      </Box>
      <Stack overflow={"hidden"} sx={{ height: '100%' }}>
        <TableDelivery columns={columns} rows={ArrayDelivery} arrNotShowCell={['_id']} onDoubleClick={handleDoubleClick} handlerowClick={handleRowClick} arrEditCell={['Material_No', 'Material_Name']} />
      </Stack>
    </FullScreenContainerWithNavBar>
  )
}
export default DeliveryScreen;

