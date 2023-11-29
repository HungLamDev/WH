//#region import
import React, { useEffect } from 'react'
import { IconButton, Box, Stack, Typography, Divider, Grid, Checkbox, FormControlLabel, FormGroup, TextField, Button, Autocomplete, Modal, MenuItem } from "@mui/material";
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
import { config } from '../../../utils/api';
import { connect_string } from '../../LoginScreen/ChooseFactory';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import { addItemMaterialTable, removeItemMaterialTable, clearItemsMaterialTable } from '../../../redux/array';
import { addItemMaterialTableChecked, copyItemsMaterialTableChecked, clearItemsMaterialTableChecked } from '../../../redux/MaterialTableChecked';
import { copyArrayDelivery, updateRY_Status1ByMaterialNo, updateRY_Status2ByMaterialNo, doublelickOrderNo, clearArrayDelivery } from '../../../redux/ArrayDelivery';
import { addArrayDeliverySapmleLeft, clearArrayDeliverySapmleLeft, copyArrayDeliverySapmleLeft } from '../../../redux/ArrayDeliverySampleLeft';
import { copyArrayDeliverySapmleRight, clearArrayDeliverySapmleRight } from '../../../redux/ArrayDeliverySampleRight';
import Statistics from '../../StockinScreenv2/StatisticsForm';
import { useTranslation } from "react-i18next";
import UpdateModalForm from '../UpdateModalForm';
import ModalHistoryMaterial from '../ModalHistoryMaterialForm';
import HistoryRY from '../HistoryRYForm';
import TableOrigin from '../../../components/TableOrigin';
import { styletext } from '../../StockinScreenv2/StockinForm';
import ModalCofirm from '../../../components/ModalConfirm';
import TableCheckBoxRedux from '../../../components/TableCheckBoxRedux';
//#endregion
const DeliverySampleScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //#region style
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

    //#region  column header table
    const columns: GridColDef[] = [
        {
            field: "_id",
            headerName: t("dcpNum") as string,
            width: 150,
        },
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
            field: "_idRY_Status2",
            headerName: "",
            width: 50,
        },

    ];

    const columnsDownLeft: GridColDef[] = [

        {
            field: "V_Num",
            headerName: t("dcpNum") as string,
            width: 150,
        },
        {
            field: "Barcode",
            headerName: t("dcpBarcode") as string,
            width: 150,
        },
        {
            field: "Material_No",
            headerName: t("dcmMaterial_No") as string,
            width: 150,
        },
        {
            field: "Color",
            headerName: t("dcmColor") as string,
            width: 150,
        },
        {
            field: "Qty",
            headerName: t("dcmQTY") as string,
            width: 150,
        },
        {
            field: "Out",
            headerName: t("dcpQty_Out_Lable") as string,
            width: 150,
        },
        {
            field: "Remark",
            headerName: t("dcpContent") as string,
            width: 200,
        },

    ];

    const columnsDownRight: GridColDef[] = [

        {
            field: "_id",
            headerName: t("dcpNum") as string,
            width: 150,
        },
        {
            field: "New_Barcode_Out",
            headerName: t("dcpBarcode") as string,
            width: 150,
        },
        {
            field: "Material_No",
            headerName: t("dcmMaterial_No") as string,
            width: 150,
        },
        {
            field: "Value_Out",
            headerName: t("dcmQTY") as string,
            width: 150,
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
    const ArrayDeliverySampleLeft = useSelector((state: any) => state.ArrayDeliverySampleLeft.deliverys);
    const ArrayDeliverySampleRight = useSelector((state: any) => state.ArrayDeliverySampleRight.deliverys);
    const MaterialTable = useSelector((state: any) => state.MaterialTable.items);
    //#endregion
    
    //#region Variable
    const [openDateFrom, setOpenDateFrom] = useState(moment().add('day', -3).format("YYYY/MM/DD"));
    const [openDateTo, setOpenDateTo] = useState(currentDay);
    const [updateDateFrom, setUpdateDateFrom] = useState(currentDay);
    const [updateDateTo, setUpdateDateTo] = useState(currentDay);
    const rows_modal: any[] = [];
    const [rowsModal, setRowsModal] = useState<any[]>([]);
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [orderNo, setOrderNo] = useState('');
    const [location, setLocation] = useState('');
    const [acceptNo, setAcceptNo] = useState('');
    const [materialName, setMaterialName] = useState('');
    const [color, setColor] = useState('');
    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [checked, setChecked] = useState(false);
    const locate = useLocation()
    const [chitietkien, setChiTietKien] = useState('')
    const [dataUpdate, setDataUpdate] = useState({})
    const [historyMaterial, setHistoryMaterial] = useState([])
    const [disable, setDisable] = useState(false)
    const [chxOffset, setChxOffSet] = useState(false)
    const [chxLoad_Data, setChxLoad_Data] = useState(true)
    const [listChx, setListChx] = useState([])
    const contentDetail = locate.state
    //#endregion
   
    //#region Func OnChange Input
    const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(event.target.value);
    };
    const handleChxOffSet = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChxOffSet(event.target.checked);
    };
    const handleChxLoad_Data = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChxLoad_Data(event.target.checked);
    };
    const handleAcceptNo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAcceptNo(event.target.value);
    };
    const handleOrderNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrderNo(event.target.value);
    };
    //#endregion

    //#region useEffect
    useEffect(() => {
        if (orderNo.length >= 11) {
            dispatch(clearItemsMaterialTable())
            dispatch(clearItemsMaterialTableChecked())
            const url = connect_string + 'api/txtNum_No_Textchanged_Delivery_Sample'
            const data = {
                txtNum_No: orderNo,
                lblOutSource: checked,
                txtLocation: location,
                txtMaterial_Name: materialName,
                get_version: dataUser[0].WareHouse
            }
            axios.post(url, data, config).then(response => {
                setLocation(response.data.txtLocation);
                setAcceptNo(response.data.txtAccept_No);
                setMaterialName(response.data.lblMaterial_Name);
                setColor(response.data.lblColor);
                //Set list for row modal
                const dataArray = response.data.txtAccept_No.split(', ');
                let rowtemp = null;
                const newRows = dataArray.map((item: any, index: number) => {
                    rowtemp = { _id: index, Material_No: item }
                    rows_modal.push(rowtemp)
                    dispatch(addItemMaterialTable(rowtemp))
                    dispatch(addItemMaterialTableChecked(rowtemp))
                });
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderNo]);

    useEffect(() => {
        if (contentDetail) {
            const url = connect_string + "api/Get_Value_Content"
            axios.post(url, contentDetail, config).then(response => {
                setChiTietKien(response.data.Value_Content)
                dispatch(updateRY_Status1ByMaterialNo({ materialNo: response.data.Material_No, newStatus: response.data.Value_Content }))
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contentDetail])
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

    const handleDelivery = () => {
        setIsLoading(true)
        setDisable(true)
        const url = connect_string + "api/Enter_Click_Delivery_Sample"
        const data = {
            Get_User_Serial_Key: dataUser[0].UserId,
            txtLocation: location,
            cboSupplier: false,
            txtAccept_No: acceptNo,
            dtpFrom_Open: openDateFrom,
            dtpTo_Open: openDateTo.format("YYYY/MM/DD"),
            dtpFrom_Date: updateDateFrom.format("YYYY/MM/DD"),
            dtpTo_Date: updateDateTo.format("YYYY/MM/DD"),
            txtNum_No: orderNo,
            chxAll: false,
            lblOutsource: checked,
            get_version: dataUser[0].WareHouse,
            chxOffset: chxOffset,
            chxLoad_Data: chxLoad_Data,

        }
        axios.post(url, data, config).then(response => {
            const array = response.data.map((item: any, index: any) => ({
                _id: index + 1,
                Date_Start: item.Date_Start,
                Num_No: item.Num_No,
                Material_No: item.Material_No,
                Count_Stock_Qty: item.Count_Stock_Qty,
                Material_Name: item.Material_Name,
                Color: item.Color,
                RY_Status: item.RY_Status,
                RY: item.RY,
                Rack: item.Rack,
                RY_Status1: item.RY_Status1,
                _idRY_Status2: item.RY_Status2 + " " + item.User_Serial_Key,
                Delivery_Serial: item.Delivery_Serial,
                RY_Status2: item.RY_Status2
            }));
            dispatch(copyArrayDelivery(array))
            // setRows(array);
        }).finally(() => {
            setIsLoading(false)
            setDisable(false)
        })
    }

    const handleSearch = () => {
        setDisable(true)
        setIsLoading(true)
        const url = connect_string + "api/Search_Click_Delivery_Sample"
        const data = {
            Get_User_Serial_Key: dataUser[0].UserId,
            txtLocation: location,
            cboSupplier: false,
            txtAccept_No: acceptNo,
            dtpFrom_Open: openDateFrom,
            dtpTo_Open: openDateTo.format("YYYY/MM/DD"),
            dtpFrom_Date: updateDateFrom.format("YYYY/MM/DD"),
            dtpTo_Date: updateDateTo.format("YYYY/MM/DD"),
            txtNum_No: orderNo,
            chxAll: false,
            lblOutsource: checked,
            get_version: dataUser[0].WareHouse
        }

        axios.post(url, data, config).then(response => {
            const array = response.data.map((item: any, index: any) => ({
                _id: index + 1,
                Date_Start: item.Date_Start,
                Num_No: item.Num_No,
                Material_No: item.Material_No,
                Count_Stock_Qty: item.Count_Stock_Qty,
                Material_Name: item.Material_Name,
                Color: item.Color,
                RY_Status: item.RY_Status,
                RY: item.RY,
                Rack: item.Rack,
                RY_Status1: item.RY_Status1,
                _idRY_Status2: item.RY_Status2 + " " + item.User_Serial_Key,
                Delivery_Serial: item.Delivery_Serial,
                RY_Status2: item.RY_Status2
            }));
            dispatch(copyArrayDelivery(array))
            // setRows(array);
        }).finally(() => {
            setIsLoading(false)
            setDisable(false)
        })
    }
    const handleReset = () => {
        dispatch(clearItemsMaterialTable())
        dispatch(clearItemsMaterialTableChecked())
        dispatch(clearArrayDelivery())
        dispatch(clearArrayDeliverySapmleLeft())
        setOrderNo('');
        setLocation('');
        setAcceptNo('');
        setMaterialName('');
        setColor('');
        setRowsModal([]);
    }

    const handleCheck = () => {
        const url = connect_string + "api/Check_Data_Click_Delivery_Sample"
        const arr = ArrayDelivery.map((item: any) => ({
            RY_Status: item.RY_Status2,
            Num: item._id.toString(),
            Delivery_Serial: item.Delivery_Serial,
            Material_No: item.Material_No,
            Color: item.Color,
            Qty: item.RY_Status,
            RY: item.RY,
            get_version: dataUser[0].WareHouse,
        }))
        axios.post(url, arr, config).then(response => {
            if (response.data.length > 0) {
                const arr = response.data.map((item: any, index: any) => ({
                    _id: index + 1,
                    ...item
                }))
                dispatch(copyArrayDeliverySapmleLeft(arr))
            }
        })
    }

    const handleCofirm = () => {
        const url = connect_string + "api/Confirm_Out_Click_Delivery_Sample"
        const arr = ArrayDeliverySampleLeft.map((item: any, index: any) => ({
            Material_No: item.Material_No,
            Barcode: item.Barcode,
            Qty_Out: item.Out.toString(),
            Delivery_Key: item.Delivery_Key,
            Qty: item.Qty.toString(),
            Remark: item.Remark,
            Material_Name: item.Name,
            Color: item.Color,
            get_version: dataUser[0].WareHouse,
            Get_User_Serial_Key: dataUser[0].UserId,
        }))

        axios.post(url, arr, config).then(response => {
            if (response.data.length > 0) {
                const arr = response.data.map((item: any, index: any) => ({
                    _id: index + 1,
                    ...item
                }))
                dispatch(copyArrayDeliverySapmleRight(arr))
            }
        })
    }

    const handlePrint = () => {
        const url = connect_string + "api/PrintLabel_Delivery_Sample_CLick"
        const arr = listChx.map((item: any) => item.New_Barcode_Out)
        const data =
        {
            Barcode: arr,
            User_Serial_Key: dataUser[0].UserId,
            Check: true,
            get_version: dataUser[0].WareHouse
        }
        axios.post(url, data, config).then(response => {
            if (response.data === true) {
                handleOpen('print-success')
            }
        })
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
            handleSearch()
        }
    })

    const handleDoubleClick = (columnName: any, item: any) => {
        const url = connect_string + 'api/GetData_CellDoubleClick_Delivery'

        if (columnName === 'Material_No') {
            const data = {
                Count_dgv: ArrayDelivery.length,
                Name_Column: "dcmMaterial_No",
                Material_No: item.Material_No,
                User_Serial_Key: dataUser[0].UserId,
                get_version: dataUser[0].WareHouse
            }
            axios.post(url, data, config).then(response => {
                const arr = response.data.map((item: any, index: any) => ({
                    _id: index,
                    ...item
                }))
                setHistoryMaterial(arr)
            })
            handleOpen('history-material')
        }
        if (columnName === 'Date_Start') {

            const data = {
                User_Serial_Key: dataUser[0].UserId,
                Count_dgv: ArrayDelivery.length,
                Name_Column: "dcmOpen_Date",
                Stamp_RY: "",
                Delivery_Serial: item.Delivery_Serial,
                Stam_Num_No: "",
                RY_Status: item.RY_Status2,
                Material_No: item.Material_No,
                Open_date: item.Date_Start,
                txtLocation: location,
                dtpFrom_Date: updateDateFrom.format("DD/MM/YYYY HH:MM:SS"),
                dtpTo_Date: updateDateTo.format("DD/MM/YYYY HH:MM:SS"),
                get_version: dataUser[0].WareHouse
            }
        }
        if (columnName === 'Num_No') {
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
                dispatch(doublelickOrderNo({ orderNo: item.Num_No, RY: item.RY, newStatus: response.data }))
            })
        }
        if (columnName === 'RY_Status2') {
            if (item.RY_Status2 === "In") {
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
                    Content: chitietkien,
                    Num_No: item.Num_No,
                    Delivery_Serial: item.Delivery_Serial,
                    get_version: dataUser[0].WareHouse
                }
                axios.post(url, data, config).then(response => {
                    dispatch(updateRY_Status2ByMaterialNo({ materialNo: item.Material_No, RY: item.RY, newStatus: "Out" }))
                })
            }
            else {
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
                    Content: chitietkien,
                    Num_No: item.Num_No,
                    Delivery_Serial: item.Delivery_Serial,
                    get_version: dataUser[0].WareHouse
                }
                axios.post(url, data, config).then(response => {
                    dispatch(updateRY_Status2ByMaterialNo({ materialNo: item.Material_No, RY: item.RY, newStatus: "In" }))
                })
            }
        }

        if (columnName === 'RY_Status1') {
            const data = {
                Name_Column: "dcpContent",
                RY_Status: item.RY_Status2,
                User_Serial_Key: dataUser[0].UserId,
                Material_No: item.Material_No,
                Count_dgv: ArrayDelivery.length,
                Qty: item.RY_Status,
                get_version: dataUser[0].WareHouse
            }
            axios.post(url, data, config).then(response => {

                navigate('/stock-out', { state: response.data });
            })

        }
    }

    const handleRowClick = (colName: any, params: any) => {
        setDataUpdate({ params: params, dgvcount: ArrayDelivery.length })
    }
    //#endregion
    
    return (
        <FullScreenContainerWithNavBar sideBarDisable={true} sideBarNavigate='' title={t("lblData_Material_Delivery")} navigate="/">
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
                                        <FormControlLabel sx={styletext} className="text" control={<Checkbox
                                            sx={{ color: 'white' }} />}
                                            onChange={handleChange} label={undefined} />
                                    </FormGroup>
                                </Grid>
                                <Grid item display={'flex'} xs={9}>
                                    <InputField disable={disable} label={t('lblOutsource') as string} keydown={handleEnter} handle={handleOrderNoChange} value={orderNo} />
                                </Grid>
                                <Grid item xs={1}>
                                    <FormGroup>
                                        <FormControlLabel sx={styletext} className="text" control={<Checkbox value={chxLoad_Data} onChange={handleChxLoad_Data} defaultChecked sx={{ color: 'white' }} />} label={undefined} />
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={1} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                    <IconButton disabled={disable}>
                                        <img src={EnterIcon} alt="enter" width={"25px"} onClick={handleDelivery} />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Grid container >
                                <Grid item xs={1}  >
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
                                        <TextField
                                            disabled={disable}
                                            id="outlined-select-currency"
                                            sx={{ width: '100%', }}
                                            select
                                            InputProps={{
                                                inputProps: {
                                                    step: null,
                                                },
                                                className: "dark-bg-primary",
                                                sx: {
                                                    borderRadius: "50px",
                                                    color: "white",
                                                    height: "2rem",
                                                    "& fieldset": { borderColor: "white" },
                                                },
                                            }}
                                        >
                                        </TextField>
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
                                    <DatePickerField valueDate={(param: any) => handleDateChange('openDateFrom', param)} />
                                </Grid>
                                <Grid item xs={2.8} display={'flex'}>
                                    <DatePickerField valueDate={(param: any) => handleDateChange('openDateTo', param)} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Stack>
                </Stack>
                <Stack marginTop={'10px'} width={'100%'} direction={'row'} spacing={3} justifyContent={'center'}>
                    <FormGroup>
                        <FormControlLabel sx={styletext} control={<Checkbox
                        />}
                            label={t('chxAll')} />
                    </FormGroup>
                    <MyButton name={t('btnSearch')} onClick={handleSearch} disabled={disable} />
                    <MyButton name={t('btnExcel')} disabled={disable} />
                    <MyButton name={t('btnUpdate_Delivery')} onClick={() => handleOpen('update')} disabled={disable} />
                    <MyButton name={t('btnClean')} onClick={handleReset} disabled={disable} />
                    <MyButton name={t('btnHistory')} onClick={() => handleOpen('history-ry')} disabled={disable} />
                    <MyButton name={t('btnStatistical')} onClick={() => handleOpen('statistic')} disabled={disable} />
                    <FormGroup>
                        <FormControlLabel sx={styletext} control={<Checkbox value={chxOffset} onChange={handleChxOffSet}
                            sx={{ color: 'white' }} />}
                            label={t('chxOffset')} />
                    </FormGroup>
                </Stack>
                {modalType === 'history-material' && <ModalHistoryMaterial open={open} onClose={handleClose} dataUpdate={historyMaterial} />}
                {modalType === 'history-ry' && <HistoryRY open={open} onClose={handleClose} />}
                {modalType === 'statistic' && (<Statistics open={open} onClose={handleClose} />)}
                {modalType === 'print-success' && <ModalCofirm onPressOK={handleClose} open={open} onClose={handleClose} title={t("msgPrintSuccess") as string} />}
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

            </Box>
            <Stack overflow={"hidden"} sx={{ height: '100%' }}>
                <Stack height={'55%'}>
                    <TableCheckBox columns={columns} rows={ArrayDelivery} arrNotShowCell={['_id', 'Delivery_Serial', 'RY_Status2']} onDoubleClick={handleDoubleClick} handlerowClick={handleRowClick} />
                </Stack>
                <Stack height={'45%'} direction={'row'}>
                    <Stack overflow={"hidden"} width={'60%'} borderRight={'2px solid white'}>
                        <Stack height={'85%'}>
                            <TableOrigin columns={columnsDownLeft} rows={ArrayDeliverySampleLeft} arrNotShowCell={['_id']} />
                        </Stack>
                        <Stack marginBottom={'5px'} height={'15%'} direction={'row'} justifyContent={'flex-end'} alignItems={'end'}>
                            <Stack alignItems={'end'} height={'100%'}>
                                <MyButton style={{ zIndex: 1 }} name='Kiểm tra' onClick={handleCheck} />
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack width={'40%'}>
                        <Stack height={'85%'} overflow={"hidden"}>
                            <TableCheckBox listChx={(params: any) => setListChx(params)} columns={columnsDownRight} rows={ArrayDeliverySampleRight} />
                        </Stack>
                        <Stack marginBottom={'5px'} direction={'row'} height={'15%'} justifyContent={'flex-end'}>
                            <Stack marginRight={'5px'} alignItems={'end'} height={'100%'}>
                                <MyButton name='Xác nhận' onClick={handleCofirm} />
                            </Stack>
                            <Stack alignItems={'end'} height={'100%'}>
                                <MyButton name='In' onClick={handlePrint} />
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </FullScreenContainerWithNavBar>
    )
}
export default DeliverySampleScreen;
