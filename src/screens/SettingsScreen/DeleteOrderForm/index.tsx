//#region import
import { useTranslation } from "react-i18next";
import FullScreenContainerWithNavBar from "../../../components/FullScreenContainerWithNavBar"
import { Box, Checkbox, FormControlLabel, Grid, Stack, Typography } from "@mui/material";
import InputField from "../../../components/InputField";
import MyButton from "../../../components/MyButton";
import DatePickerField from "../../../components/DatePickerField";
import TableCheckBox from "../../../components/TableCheckBox";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useState } from "react";
import moment from "moment";
import { config } from "../../../utils/api";
import { connect_string } from "../../LoginScreen/ChooseFactory";

import { useSelector } from "react-redux";
//#endregion
const DeleteOrder = () => {
    const { t } = useTranslation();
    //#region column header table
    const columns: GridColDef[] = [
        {
            field: "_id",
            headerName: t("dcpNum") as string,
            align: "center",
            editable: true,
            headerAlign: 'center',
            width: 150,
        },
        {
            field: "Order_No",
            headerName: t("dcmOrder_No") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "Material_No",
            headerName: t("dcmMaterial_No") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "Material_Name",
            headerName: t("dcpMaterial_Name") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "Qty",
            headerName: t("dcpQTY") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "Stock_In_Out_Status",
            headerName: t("dcpLabel_Status") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        // {
        //     field: "Print_Qty",
        //     headerName: t("dcpPrint_QTY") as string,
        //     align: "center",
        //     headerAlign: 'center',
        //     width: 150,

        // },
        {
            field: "Print_Date",
            headerName: t("dcpPrint_Date") as string,
            align: "center",
            headerAlign: 'center'

        },
        {
            field: "User_Serial_Key",
            headerName: t("dcmUser_Serial_Key") as string,
            align: "center",
            headerAlign: 'center'

        },
        {
            field: "Barcode",
            headerName: t("dcpBarcode") as string,
            align: "center",
            headerAlign: 'center'

        },
    ];
    //#endregion

    //#region useSelector
    const dataUser = useSelector((state: any) => state.UserLogin.user);
    //#endregion

    //#region Variable
    const [rows, setRows] = useState([])
    const [chxDate, setchxDate] = useState(false)
    const [orderNo, setOrderNo] = useState('')
    const [materialNo, setMaterialNo] = useState('')
    const [qty, setQty] = useState('')
    const [qrCode, setQrCode] = useState('')
    const [dateStart, setDateStart] = useState(moment().format("MM/DD/YYYY"))
    const [dateEnd, setDateEnd] = useState(moment().format("MM/DD/YYYY"))
    const [listChecked, setListChecked] = useState([])
    const [disable, setDisable] = useState(false)
    const [openQRRead, setOpenQRRead] = useState(false)
    //#endregion

    //#region Func OnChange Input
    const handleorderNo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrderNo(event.target.value);
    };
    const handlematerialNo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaterialNo(event.target.value);
    };
    const handleQty = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQty(event.target.value);
    };
    const handleQrCode = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQrCode(event.target.value);
    };
    const handlechxDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setchxDate(event.target.checked);
    };
    //#endregion

    //#region Func Logic
    const getValueDate = ((params: any, dtp_name: string) => {
        if (dtp_name === 'dateStart') {
            setDateStart(params)
        }
        else {
            setDateEnd(params)
        }
    })

    const handleSearch = () => {
        if (orderNo !== "" || materialNo !== "" || qrCode !== ""){
            setDisable(true)
            const url = connect_string + "api/Get_Data_Delete_Label"
            const data = {
                User_Serial_Key: dataUser[0].UserId,
                txtNum_No: orderNo,
                txtMaterial: materialNo,
                txtQty: qty,
                txtBarcode: qrCode,
                chxDate: chxDate,
                dtpfromdate: moment(dateStart).format("YYYY/MM/DD"),
                dtptodate: moment(dateEnd).format("YYYY/MM/DD"),
                get_version: dataUser[0].WareHouse
    
            }
            axios.post(url, data, config).then(response => {
                const arr = response.data.map((item: any, index: any) => ({
                    _id: index + 1,
                    Order_No: item.Order_No,
                    Material_No: item.Material_No,
                    Material_Name: item.Material_Name,
                    Qty: item.Qty,
                    Stock_In_Out_Status: item.Stock_In_Out_Status,
                    // Print_Qty: item.Print_Qty,
                    Print_Date: item.Print_Date,
                    User_Serial_Key: item.User_Serial_Key,
                    Barcode: item.Barcode
                }))
                setRows(arr)
            }).finally(() => {
                setDisable(false)
            })
        }
    }

    const handleDelete = () => {
        setDisable(true)
        const url = connect_string + "api/Action_Delete_Label"
        const listChx = []
        const count = listChecked.length;
        const trueValues = new Array(count).fill(true);
        listChx.push(...trueValues);
        const barcodeList = listChecked.map((item: any) => item.Barcode)

        const data = {
            User_Serial_Key: dataUser[0].UserId,
            dcpCheck: listChx,
            dcpBarcode: barcodeList,
            get_version: dataUser[0].WareHouse

        }

        axios.post(url, data, config).then(response => {
            handleSearch()
        }).finally(() => {
            setDisable(false)
        })
    }
    //#endregion
    return (
        <FullScreenContainerWithNavBar navigate="/" sideBarDisable={true} sideBarNavigate="" title={t("lblHistory_Infor") as string} >
            <Box
                paddingX={1}
                paddingBottom={1}
                className={"dark-bg-secondary border-bottom-white"}
            >
                <Stack>
                    <Grid container marginBottom={'10px'} justifyContent={'center'}>
                        <Grid item xs={1} display={'flex'} justifyContent={'start'} alignItems={'center'}>
                            <Typography className="textsize">{t("lblNum_No")}</Typography>
                        </Grid>
                        <Grid item xs={2} display={'flex'}>
                            <InputField value={orderNo} handle={handleorderNo} disable={disable} />
                        </Grid>
                        <Grid item xs={1} display={'flex'} justifyContent={'start'} alignItems={'center'}>
                            <Typography className="textsize">{t("dcmMaterial_No")}</Typography>
                        </Grid>
                        <Grid item xs={2} display={'flex'}>
                            <InputField value={materialNo} handle={handlematerialNo} disable={disable} />
                        </Grid>
                        <Grid item xs={1} display={'flex'} justifyContent={'start'} alignItems={'center'}>
                            <Typography className="textsize">{t("dcmQTY")}</Typography>
                        </Grid>
                        <Grid item xs={2} display={'flex'}>
                            <InputField value={qty} handle={handleQty} disable={disable} />
                        </Grid>
                        <Grid item  >
                            <MyButton name={t('btnDelete')} onClick={handleDelete} disabled={disable} />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent={'center'}>
                        <Grid item xs={1}>
                            <FormControlLabel
                                control={<Checkbox value={chxDate} onChange={handlechxDate} />}
                                label={null}
                            />
                        </Grid>
                        <Grid item xs={2} display={'flex'} paddingRight={'16px'}>
                            <DatePickerField valueDate={(params: any) => { getValueDate(params, 'dateStart') }} />
                        </Grid>
                        <Grid item xs={1} display={'flex'} justifyContent={'start'} alignItems={'center'}>
                            <Typography className="textsize">{t("lblToDate")}</Typography>
                        </Grid>
                        <Grid item xs={2} display={'flex'} paddingRight={'16px'}>
                            <DatePickerField valueDate={(params: any) => { getValueDate(params, 'dateEnd') }} />
                        </Grid>
                        <Grid item xs={1} display={'flex'} justifyContent={'start'} alignItems={'center'}>
                            <Typography className="textsize">{t("dcpBarcode")}</Typography>
                        </Grid>
                        <Grid item xs={2} display={'flex'}>
                            <InputField value={qrCode} handle={handleQrCode} disable={disable} />
                        </Grid>
                        <Grid item  >
                            <MyButton name={t("btnSearch")} onClick={handleSearch} disabled={disable} />
                        </Grid>
                        <Grid item  >
                            <MyButton name={"QR"} onClick={() => setOpenQRRead(true)} disabled={disable} />
                        </Grid>
                    </Grid>
                </Stack>
            </Box>
            <Stack overflow={"hidden"} sx={{ height: '100%' }}>
                <TableCheckBox columns={columns} rows={rows} listChx={(params: any) => setListChecked(params)} />
            </Stack>
        </FullScreenContainerWithNavBar>
    )
}
export default DeleteOrder