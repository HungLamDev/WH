//#region import 
import { Box, Checkbox, CircularProgress, FormControlLabel, Grid, Stack } from "@mui/material"
import FullScreenContainerWithNavBar from "../../../components/FullScreenContainerWithNavBar"
import InputField from "../../../components/InputField"
import { useTranslation } from "react-i18next";
import { useState } from "react";
import './style.scss'
import DatePickerField from "../../../components/DatePickerField";
import { styletext } from "../../StockinScreenv2/StockinForm";
import { useMediaQuery } from '@mui/material';
import MyButton from "../../../components/MyButton";
import TableCheckBox from "../../../components/TableCheckBox";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import {  config } from "../../../utils/api";
import { checkPermissionPrint } from "../../LoginScreen/ChooseFactory";
import { connect_string } from "../../LoginScreen/ChooseFactory";
import { useSelector } from "react-redux";
import axios from "axios";
import ModalCofirm from "../../../components/ModalConfirm";
//#endregion
const RegisterLabel = () => {
    const { t } = useTranslation();
    const dataUser = useSelector((state: any) => state.UserLogin.user);
    //#region column header  
    const columnsLeftRight: GridColDef[] = [
        {
            field: "STT",
            headerName: "",
            align: "center",
            headerAlign: 'center',
            width: 180,

        },
        {
            field: "Barcode",
            headerName: t("dcpBarcode") as string,
            align: "center",
            headerAlign: 'center',
            width: 180,

        },
        {
            field: "Material_No",
            headerName: t("dcpMaterial_No") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "Print_QTY",
            headerName: t("dcpQty_ROLL") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,
        },
        {
            field: "QTY",
            headerName: t("dcpQTY") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "Order_No",
            headerName: t("lblOrderNo") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "Roll",
            headerName: t("dcmRoll") as string,
            align: "center",
            headerAlign: 'center',
        },
        {
            field: "Print_Date",
            headerName: t("dcpDate") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "Work_Order",
            headerName: t("dcpWork_Order") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
    ];
    //#endregion

    //#region Variable
    const isScreenLarge = useMediaQuery('(min-width:1000px)')
    const [chxFind, setChxFind] = useState(false)
    const [openCofirm, setOpenCofirm] = useState(false)
    const [cofirmType, setCofirmType] = useState('')
    const [disable, setDisable] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [orderNo, setOrderNo] = useState('')
    const [orderNoRegister, setOrderNoRegister] = useState('')
    const [materialNo, setMaterialNo] = useState('')
    const [ry, setRY] = useState('')
    const [chxDatePrint, setChxDatePrint] = useState(false)
    const [chxDatePrintRegister, setChxDatePrintRegister] = useState(true)
    const [datePrint, setDatePrint] = useState(moment().format("YYYY-MM-DD"))
    const [datePrintRegister, setDatePrintRegister] = useState(moment().format("YYYY-MM-DD"))
    const [listDataLeft, setListDataLeft] = useState([])
    const [listDataRight, setListDataRight] = useState([])
    const [listDataLeftCheck, setListDataLeftCheck] = useState([])
    const [listDataRightCheck, setListDataRightCheck] = useState([])
    //#endregion

    //#region Func OnChange Input
    const handleOrderNo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrderNo(event.target.value);
    };
    const handleOrderNoRegister = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrderNoRegister(event.target.value);
    };
    const handleMaterialNo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaterialNo(event.target.value);
    };
    const handleRY = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRY(event.target.value);
    };
    const handleChxDatePrint = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChxDatePrint(event.target.checked);
    };
    const handleChxDatePrintRegister = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChxDatePrintRegister(event.target.checked);
    };
    const handleChxFind = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChxFind(event.target.checked);
        if(event.target.checked === true){
            Find()
        }
    };
    
    //#endregion

    //#region Func Logic
   
    const handleOpenConfirm = (confirmName: string) => {
        setCofirmType(confirmName)
        setOpenCofirm(true)
    }

    const handleCloseConfirm = () => {
        setCofirmType('')
        setOpenCofirm(false)
    }

    const Search = () => {
        setIsLoading(true)
        setDisable(true)
        setListDataRight([])
        const url = connect_string + "api/Search_Click_3_Month_Print"
        const data = {
            Barcode: "",
            Order_No: orderNo,
            Material_No: materialNo,
            Name_GridView: "dgvPrint_Label",
            dtpRegister_Date: moment(datePrintRegister).format("YYYY-MM-DD"),
            dtpPrint_Date: moment(datePrint).format("YYYY-MM-DD"),
            Version: dataUser[0].WareHouse,
            txtOrderNo: orderNo,
            txtMaterial_ID: materialNo,
            chxPrint_Date: chxDatePrint,
        }
        axios.post(url, data, config).then(response => {
            if (response.data.length > 0) {
                const arr = response.data.map((item: any, index: any) => ({
                    _id: item.Barcode,
                    STT: index + 1,
                    Barcode: item.Barcode,
                    Material_No: item.Material_No,
                    Print_QTY: item.Print_QTY,
                    QTY: item.QTY,
                    Order_No: item.Order_No,
                    Roll: item.Roll,
                    Print_Date: item.Print_Date,
                    Work_Order: item.Work_Order,
                }))
                setListDataLeft(arr)
            }
        }).finally(() => {
            setIsLoading(false)
            setDisable(false)
        })
    }

    const Refresh = () => {
        setListDataLeft([])
        setListDataRight([])
    }

    const Register = () => {
        setIsLoading(true)
        setDisable(true)
        const listBarcode = listDataLeftCheck.map((item: any) => item.Barcode)
        const url = connect_string + "api/btnDangKy_3_Month_Print"
        const data = {
            List_Barcode: listBarcode,
            txtOrderNo: orderNo,
            dtpRegister_Date: moment(datePrintRegister).format("YYYY/MM/DD"),
            txtMaterial_ID: materialNo,
            Version: dataUser[0].WareHouse,
            USERID: dataUser[0].UserId,
            txtOrderNo_Register: orderNoRegister,
            txtRY: ry,
            chxRegister_Date: chxDatePrintRegister
        }
        axios.post(url, data, config).then(response => {
            if (response.data.length > 0) {
                const arr = response.data.map((item: any, index: any) => ({
                    _id: item.Barcode,
                    STT: index + 1,
                    Barcode: item.Barcode,
                    Material_No: item.Material_No,
                    Print_QTY: item.Print_QTY,
                    QTY: item.QTY,
                    Order_No: item.Order_No,
                    Roll: item.Roll,
                    Print_Date: item.Print_Date,
                    Work_Order: item.Work_Order,
                }))
                //#region giữ lại dữ liệu trong bảng bên phải
                const newListDataRight = [...listDataRight, ...arr];
                const updatedListDataRight = newListDataRight.map((item: any, index: any) => ({
                    _id: item.Barcode,
                    STT: index + 1,
                    Barcode: item.Barcode,
                    Material_No: item.Material_No,
                    Print_QTY: item.Print_QTY,
                    QTY: item.QTY,
                    Order_No: item.Order_No,
                    Roll: item.Roll,
                    Print_Date: item.Print_Date,
                    Work_Order: item.Work_Order,
                }));
                setListDataRight(updatedListDataRight as never[])
                //#endregion

                //#region lọc ra dữ liệu đăng ký ở bảng bên trái
                const filteredArray = listDataLeft.filter((item: any) => !listBarcode.includes(item.Barcode));
                const dataFilter = filteredArray.map((item: any, index: any) => ({
                    _id: item.Barcode,
                    STT: index + 1,
                    Barcode: item.Barcode,
                    Material_No: item.Material_No,
                    Print_QTY: item.Print_QTY,
                    QTY: item.QTY,
                    Order_No: item.Order_No,
                    Roll: item.Roll,
                    Print_Date: item.Print_Date,
                    Work_Order: item.Work_Order,
                }))
                setListDataLeft(dataFilter as never[])
                //#endregion
            }
            else {
                handleOpenConfirm('error-data')
            }
        }).finally(() => {
            setIsLoading(false)
            setDisable(false)
        })
    }

    const handlePrint = async () => {
        if (await checkPermissionPrint(dataUser[0].UserId)) {
            if (listDataRightCheck.length > 0) {
                handleOpenConfirm('print')
            }
            else {
                handleOpenConfirm('error-data')
            }
        }
        else {
            handleOpenConfirm('print-permission')
        }
    }

    const handlePrintOK = () => {
        setIsLoading(true)
        setDisable(true)
        const url = connect_string + "api/Print_InLai_3Thang"
        const listBarcode = listDataRightCheck.map((item: any) => item.Barcode)
        const data = {
            List_Barcode: listBarcode,
            User_id: dataUser[0].UserId,
            Version: dataUser[0].WareHouse,
        }
        axios.post(url, data, config).then(response => {
            if (response.data === true) {
                handleOpenConfirm('print-success')
            }
        }).catch(() => {
            handleOpenConfirm('print-permission')
        }).finally(() => {
            setIsLoading(false)
            setDisable(false)
        })
    }

    const Find = () =>
    {
        setIsLoading(true)
        setDisable(true)
        setListDataRight([])
        const url = connect_string + "api/Search_Click_3_Month_Print"
        const data = {
            Barcode: "",
            Order_No: orderNo,
            Material_No: materialNo,
            Name_GridView: "dgvPrint_Label_Register",
            dtpRegister_Date: moment(datePrintRegister).format("YYYY-MM-DD"),
            dtpPrint_Date: moment(datePrint).format("YYYY-MM-DD"),
            Version: dataUser[0].WareHouse,
            txtOrderNo: orderNo,
            txtMaterial_ID: materialNo,
            chxPrint_Date: chxDatePrint,
        }
        axios.post(url, data, config).then(response => {
            if (response.data.length > 0) {
                const arr = response.data.map((item: any, index: any) => ({
                    _id: item.Barcode,
                    STT: index + 1,
                    Barcode: item.Barcode,
                    Material_No: item.Material_No,
                    Print_QTY: item.Print_QTY,
                    QTY: item.QTY,
                    Order_No: item.Order_No,
                    Roll: item.Roll,
                    Print_Date: item.Print_Date,
                    Work_Order: item.Work_Order,
                }))
                setListDataRight(arr)
            }
        }).finally(() => {
            setIsLoading(false)
            setDisable(false)
        })
    }
    //#endregion
    return (
        <FullScreenContainerWithNavBar sideBarDisable={true} sideBarNavigate="" title={t("lblData_Register_Print_Lable")} navigate="/">
            <Stack height={'35%'} >
                <Box
                    paddingX={1}
                    paddingBottom={1}
                    className={"dark-bg-secondary border-bottom-white"}
                    sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
                >
                    <Grid container spacing={1} width={'80%'} columnSpacing={2} >
                        <Grid item xs={6} display={'flex'}>
                            <InputField customClass="customStack" focus={true} label={t("dcmOrder_No") as string} value={orderNo} handle={handleOrderNo} keydown={null} disable={disable} />
                        </Grid>
                        <Grid item xs={6} display={'flex'}>
                            <InputField customClass="customStack" label={t("lblOrderNo_Register") as string} value={orderNoRegister} handle={handleOrderNoRegister} keydown={null} disable={disable} />
                        </Grid>
                        <Grid item xs={6} display={'flex'}>
                            <InputField customClass="customStack" label={t("dcpMaterial_No") as string} value={materialNo} handle={handleMaterialNo} keydown={null} disable={disable} />
                        </Grid>
                        <Grid item xs={6} display={'flex'}>
                            <InputField customClass="customStack" label={t("lblRY") as string} value={ry} handle={handleRY} keydown={null} disable={disable} />
                        </Grid>
                        <Grid item lg={2} md={2.6} >
                            <FormControlLabel
                                sx={styletext}
                                control={<Checkbox value={chxDatePrint} onChange={handleChxDatePrint} />}
                                label={t("chxPrint_Date")}
                            />
                        </Grid>
                        <Grid item lg={2.6} md={3.4} display={'flex'} sx={{ ...(isScreenLarge && { marginRight: '125px' }) }}>
                            <DatePickerField
                                valueDate={(params: any) => {
                                    setDatePrint(params);
                                }}
                                customClass="customDateTimePicker"
                            />
                        </Grid>
                        <Grid item lg={2} md={2.6}>
                            <FormControlLabel
                                sx={styletext}
                                control={<Checkbox defaultChecked value={chxDatePrintRegister} onChange={handleChxDatePrintRegister} />}
                                label={t("chxRegister_Date")}
                            />
                        </Grid>
                        <Grid item lg={2.6} md={3.4} display={'flex'}>
                            <DatePickerField
                                customClass="customDateTimePicker"
                                valueDate={(params: any) => {
                                    setDatePrintRegister(params);
                                }}
                            />
                        </Grid>
                        <Grid item xs={2.5}></Grid>
                        <Grid item display={'flex'} xs={1.5}>
                            <MyButton name={t("btnSearch") as string} onClick={Search} disabled={disable} />
                        </Grid>
                        <Grid item display={'flex'} xs={1.5}>
                            <MyButton name={t("btnClean") as string} onClick={Refresh} disabled={disable} />
                        </Grid>
                        <Grid item display={'flex'} xs={1.5}>
                            <MyButton name={t("btnRegister")} onClick={Register} disabled={disable} />
                        </Grid>
                        <Grid item display={'flex'} xs={1.5}>
                            <MyButton name={t("tsmPrint")} disabled={disable} onClick={handlePrint} />
                        </Grid>
                        <Grid item xs={2} display={'flex'} alignItems={'center'}>
                            <FormControlLabel
                                sx={styletext}
                                control={<Checkbox value={chxFind} onChange={handleChxFind} />}
                                label={"Tìm lại"}
                            />
                        </Grid>
                        {/* <Grid item xs={2} display={'flex'} alignItems={'center'}>
                            {isLoading && <CircularProgress size={'25px'} color="info" />}
                        </Grid> */}
                        

                    </Grid>

                </Box>
                {cofirmType === 'print' && <ModalCofirm onPressOK={handlePrintOK} open={openCofirm} onClose={handleCloseConfirm} title={t("msgCofirmPrint") as string} />}
                {cofirmType === 'error-data' && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("msgExistingMaterialImport") as string} />}
                {cofirmType === 'print-error' && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("msgPrintDelete") as string} />}
                {cofirmType === 'print-permission' && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("lblPrintPermission") as string} />}
                {/* {cofirmType === 'print-success' && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("msgPrintSuccess") as string} />} */}
            </Stack>
            <Stack height={'65%'} direction={'row'} overflow={"hidden"}>
                <Stack width={'50%'} borderRight={'1px solid white'}>
                    <TableCheckBox listChx={(params: any) => setListDataLeftCheck(params)} columns={columnsLeftRight} rows={listDataLeft} />
                </Stack>
                <Stack width={'50%'}>
                    <TableCheckBox listChx={(params: any) => setListDataRightCheck(params)} columns={columnsLeftRight} rows={listDataRight} />
                </Stack>
            </Stack>
        </FullScreenContainerWithNavBar>
    )
}

export default RegisterLabel