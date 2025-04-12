//#region import
import { Backdrop, Box, Checkbox, CircularProgress, FormControlLabel, FormGroup, Grid, IconButton, Modal, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BiArrowBack } from "react-icons/bi";
import TableOrigin from "../../../components/TableOrigin";
import { GridColDef } from "@mui/x-data-grid";
import InputField from "../../../components/InputField";
import MyButton from "../../../components/MyButton";
import { styletext } from "../StockinForm";
import { config } from "../../../utils/api";
import { connect_string } from "../../LoginScreen/ChooseFactory";

import axios from "axios";
import { useSelector } from "react-redux";
import ModalCofirm from "../../../components/ModalConfirm";
//#endregion
const EnterShelves = ({ open, onClose }: { open?: any, onClose?: any }) => {
    const { t } = useTranslation();
    //#region Style
    const style = {
        position: 'absolute',
        top: 25,
        left: 50,
        right: 50,
        // transform: 'translate(-50%, -50%)',
        // width: '500px',
        height: '90vh',
        bgcolor: '#1c2538',
        border: '2px solid white',
        borderRadius: 3,
        boxShadow: 24,
    };
    //#endregion

    //#region useSelector
    const dataUser = useSelector((state: any) => state.UserLogin.user);
    //#endregion

    //#region column header table
    const columns: any[] = [
        {
            field: 'stt',
            headerName: t("dcpNum") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'Material_No',
            headerName: t("dcpMaterial_No_Show") as string,
            width: 150,
            editable: true,
            headerClassName: 'custom-header'
        },
        {
            field: 'Color',
            headerName: t("dcmColor") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'Total_Qty',
            headerName: t("dcmQTY") as string,
            width: 300,
            headerClassName: 'custom-header'
        },
        {
            field: 'Rack',
            headerName: t("dcpRack") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        ...(dataUser[0].WareHouse === "Sample" && dataUser[0].factoryName === "LYV"
            ? [{
                field: 'WH',
                headerName: "WH",
                width: 160,
                headerClassName: 'custom-header',
                selected: true
            }]
            : [])

    ];
    //#endregion

    //#region Variable
    const [isLoading, setIsLoading] = useState(false)
    const [openCofirm, setOpenCofirm] = useState(false)
    const [cofirmType, setCofirmType] = useState('')
    const [chxLogin, setChxLogin] = useState(false)
    const [userID, setUserID] = useState('')
    const [password, setPassWord] = useState('')
    const [rack, setRack] = useState('')
    const [quantityMaterial, setQuantityMaterial] = useState('')
    const [txtRack, setTxtRack] = useState('')
    const [chxAll, setChxAll] = useState(true)
    const [materialNo, setMaterialNo] = useState('')
    const [rows, setRows] = useState([])
    const [color, setColor] = useState(false)
    const [listWH, setListWH] = useState<string[]>([])
    //#endregion

    //#region Func OnChange Input
    const handleChangeUserID = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserID(event.target.value)
    };

    const handleChangePassWord = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassWord(event.target.value)
    };

    const handleChangeTxtRack = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTxtRack(event.target.value)
        showStockInERP(event.target.value)
    };

    const handleChxAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChxAll(event.target.checked)
    };

    const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            Login()
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

    const Login = async () => {

        setIsLoading(true)
        const url = connect_string + "api/Login_ERP"
        const data = {
            UserID: userID,
            PWD: password
        }
        try {
            const res = await axios.post(url, data, config)
            if (res.data === true) {
                if (dataUser[0].WareHouse === "Sample" && dataUser[0].factoryName === "LYV") {
                    await getDataWH()
                }
                setChxLogin(true)
                setIsLoading(false)
            }
        }
        catch {
            setIsLoading(false)
        }
    }

    const showStockInERP = (rack: string) => {

        setIsLoading(true)
        setColor(false)
        const url = connect_string + "api/Show_StockIn_ERP"
        const data = {
            Rack: rack,
            Version: dataUser[0].WareHouse,
            chxTransition: false,
            chxAll: chxAll

        }
        axios.post(url, data, config).then(response => {
            const arr = response.data.map((item: any, index: any) => ({
                _id: index,
                stt: item.stt,
                Material_No: item.Material_No,
                Color: item.Color,
                Total_Qty: item.Total_Qty,
                Rack: item.Rack,
                WH: item?.WH || ""
            }))
            setRows(arr)
            if (arr.length > 0) {
                setRack(chxAll ? cutRack(arr[0].Rack) : arr[0].Rack)
                setQuantityMaterial(arr[arr.length - 1].stt)
                setTxtRack('')
                if (arr[arr.length - 1].stt === 1) {
                    setMaterialNo(arr[0].Material_No)
                }
                else {
                    setMaterialNo('')
                }
            }

        }).finally(() => {
            setIsLoading(false)
        })
    }

    const cutRack = (rack: string) => {
        const index = rack.trim().indexOf("-");
        const valueRack = rack.trim().substring(0, index)
        return valueRack
    }

    const enterRackERP = () => {
        const check = rows.findIndex((item: any) => item?.WH === "")
        if (check !== -1 && dataUser[0].WareHouse === "Sample" && dataUser[0].factoryName === "LYV") {
            handleOpenConfirm("error-register-wh")
        }
        else {
            if (rows.length > 0) {
                setIsLoading(true)
                const url = connect_string + "api/btn_StockIn_ERP"
                const data =
                {
                    chxTransition: "false",
                    List_dgv: rows,
                    saFactory: dataUser[0].factoryName,
                    saVersion: dataUser[0].WareHouse,
                    txtUser_ERP: userID,
                    USERID_PWA: dataUser[0].UserId,
                }
                axios.post(url, data, config).then(response => {
                    if (response.data === true) {
                        setColor(true)
                    }
                    else {
                        setColor(false)
                    }
                    setOpenCofirm(false)
                }).finally(() => {
                    setIsLoading(false)
                })
            }
        }
    }

    const getDataWH = async () => {
        setIsLoading(true)
        const url = connect_string + "api/Get_WH_From_Data_Storage"
        try {
            const res = await axios.post(url)
            setListWH(res.data)

            setIsLoading(false)
        }
        catch {
            setIsLoading(false)
        }

    }
    //#endregion

    return (
        <Modal
            open={open}
            // onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Stack height={'100%'} >
                    <Stack height={'10%'} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <IconButton className={'back-button'} onClick={onClose}>
                            <BiArrowBack className=" icon-wrapper" />
                        </IconButton>
                        <Typography variant="h4" component="h4" color={'white'}>{t("btnStock_In_List") as string}</Typography>
                        <Typography></Typography>
                    </Stack>
                    <Stack height={'90%'} >
                        <Box sx={{ height: '30%', display: 'flex', width: '100%', justifyContent: 'end', marginBottom: '10px', alignItems: 'center' }}>
                            <Stack direction={"row"} width={"100%"}>
                                <Stack width={"60%"} paddingLeft={'10px'}>
                                    {chxLogin &&
                                        <>
                                            <Grid container rowSpacing={1}>
                                                <Grid item xs={3}>
                                                    <FormGroup>
                                                        <FormControlLabel sx={styletext} control={<Checkbox defaultChecked sx={{ color: 'white' }} value={chxAll} onChange={handleChxAll} />} label={t("chxAll") as string} />
                                                    </FormGroup>
                                                </Grid>
                                                {/* Tên kệ label*/}
                                                <Grid item xs={3} display={'flex'} alignItems={'center'}>
                                                    <Typography className="textsize">{t("lblRackName")}</Typography>
                                                </Grid>
                                                {/* Tên kệ */}
                                                <Grid item xs={3} display={'flex'} alignItems={'center'}>
                                                    <Typography className="textsize" color={'aqua'}>{rack}</Typography>
                                                </Grid>

                                                <Grid item xs={6} display={'flex'} justifyContent={'flex-start'}>
                                                    <TextField
                                                        id="outlined-select-currency"
                                                        value={txtRack}
                                                        onChange={handleChangeTxtRack}
                                                        autoComplete="off"
                                                        type="text"
                                                        sx={{ width: '80%', }}
                                                        InputProps={{
                                                            inputProps: {
                                                                step: null,
                                                            },
                                                            className: "dark-bg-primary textsize",
                                                            sx: {
                                                                borderRadius: "50px",
                                                                color: "white",
                                                                height: "2rem",
                                                                "& fieldset": { borderColor: "white" },
                                                            },
                                                        }}
                                                    >
                                                    </TextField>
                                                </Grid>
                                                <Grid item xs={2.5}>
                                                    <MyButton name={t("btnConfirm")} onClick={() => rows.length > 0 && handleOpenConfirm('confirm')} />
                                                </Grid>
                                                <Grid item xs={3} display={'flex'} alignItems={"center"}>
                                                    <Typography className="textsize" color={'aqua'}>{materialNo}</Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography className="textsize">{t("lblQuantityOfSupplies")}</Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography color={'aqua'} className="textsize">{quantityMaterial}</Typography>
                                                </Grid>
                                            </Grid>
                                        </>
                                    }
                                </Stack>
                                <Stack width={"40%"} >
                                    <Grid container>
                                        {/* Tài khoản */}
                                        <Grid item display={"flex"} sx={{ marginBottom: '10px' }} xs={12} justifyContent={"flex-end"}>
                                            <InputField label={t("lblUserID") as string} value={userID} handle={handleChangeUserID} keydown={handleEnterKeyPress} />
                                        </Grid>
                                        {/* Mật khẩu */}
                                        <Grid item display={"flex"} xs={12} sx={{ marginBottom: '10px' }} justifyContent={"flex-end"} >
                                            <InputField label={t("lblPassword") as string} type="password" value={password} handle={handleChangePassWord} keydown={handleEnterKeyPress} />
                                        </Grid>
                                        {/* Đăng nhập */}
                                        <Grid item display={'flex'} justifyContent={"flex-end"} xs={12} marginRight={'16px'} alignItems={'center'}>
                                            <MyButton name={t("btnLogin")} onClick={Login} />
                                        </Grid>
                                    </Grid>
                                </Stack>
                            </Stack>
                        </Box>
                        <Box sx={{ height: '70%', width: '100%', overflow: 'hidden', }}>
                            <TableOrigin color={color} columns={columns} rows={rows} arrNotShowCell={[]} handleDoubleClick={null} handlerowClick={null} dataSelected={listWH} />
                        </Box>
                        {cofirmType === 'confirm' && <ModalCofirm onPressOK={enterRackERP} open={openCofirm} onClose={handleCloseConfirm} title={t("msgYouWantUpdate") as string} />}
                        {cofirmType === 'error-register-wh' && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("msgNotRegisteredWH") as string} showOk={false}/>}
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={isLoading}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    )
}

export default EnterShelves
