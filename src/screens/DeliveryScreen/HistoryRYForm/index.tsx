//#region import
import { useTranslation } from "react-i18next";
import FullScreenContainerWithNavBar from "../../../components/FullScreenContainerWithNavBar"
import { Box, Checkbox, CircularProgress, FormControlLabel, Grid, IconButton, Modal, Stack, Typography } from "@mui/material";
import InputField from "../../../components/InputField";
import MyButton from "../../../components/MyButton";
import DatePickerField from "../../../components/DatePickerField";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useState } from "react";
import moment from "moment";
import { config } from "../../../utils/api";
import { connect_string } from "../../LoginScreen/ChooseFactory";
import { useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import TableOrigin from "../../../components/TableOrigin";
import QRScanner from "../../../components/QRScanner";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { successSound } from "../../../utils/pathsound";
//#endregion
const HistoryRY = ({ open, onClose }: { open?: any, onClose?: any }) => {
    const { t } = useTranslation();
    //#region style
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '95%',
        height: '90%',
        bgcolor: '#1c2538',
        border: '2px solid white',
        borderRadius: 3,
        boxShadow: 24,

    };
    //#endregion
    
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
            field: "Num_No",
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
            field: "Color",
            headerName: t("dcmColor") as string,
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
            field: "RY",
            headerName: t("chxRY") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,
        },
        {
            field: "Location",
            headerName: t("dcpLocation") as string,
            align: "center",
            headerAlign: 'center'
        },
        {
            field: "Remark",
            headerName: t("dcpRemark") as string,
            align: "center",
            headerAlign: 'center'
        },
        {
            field: "Date_Start",
            headerName: t("dcpDate_Start") as string,
            align: "center",
            headerAlign: 'center'
        },
        {
            field: "Date_End",
            headerName: t("dcpDate_End") as string,
            align: "center",
            headerAlign: 'center'
        },
        {
            field: "RY_Status",
            headerName: t("dcpRY_Status") as string,
            align: "center",
            headerAlign: 'center'
        },
        {
            field: "Modify_Date",
            headerName: t("dcmModify_Date") as string,
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
            field: "HostName",
            headerName: t("dcpHostName") as string,
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
    const [orderNo, setOrderNo] = useState('')
    const [materialNo, setMaterialNo] = useState('')
    const [ry, setRY] = useState('')
    const [dateStart, setDateStart] = useState(moment())
    const [dateEnd, setDateEnd] = useState(moment())
    const [isLoading, setIsLoading] = useState(false)
    const [disable, setDisable] = useState(false)
    const [mode, setMode] = useState(false)
    const [modalScan, setModalScan] = useState(false)
    //#endregion

    //#region Func OnChange Input
    const handleorderNo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrderNo(event.target.value);
    };
    const handlematerialNo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaterialNo(event.target.value);
    };
    const handleRY = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRY(event.target.value);
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
        setIsLoading(true)
        setDisable(true)
        const url = connect_string + "api/Get_Data_History_RY"
        const data = {
            txtNum_No: orderNo,
            txtMaterial: materialNo,
            txtRY: ry,
            dtpfromdate: moment(dateStart).format("YYYY-MM-DD"),
            dtptodate: moment(dateEnd).format("YYYY-MM-DD"),
            get_version: dataUser[0].WareHouse
        }

        axios.post(url, data, config).then(response => {
            const arr = response.data.map((item: any, index: any) => ({
                _id: index + 1,
                ...item
            }))
            setRows(arr)
        }).finally(() => {
            setIsLoading(false)
            setDisable(false)
        })
    }
    const handleScanClick = () => {
        setMode(true);
        setModalScan(true);
    }
    const handleScanCam = async (result: any | null) => {
        if (result || result.text) {
            CheckScanMaterialNo(result.text)
            setModalScan(false)
            modalScan && successSound.play();
        }
    }
    const CheckScanMaterialNo = (barcode: string) => {

        const url = connect_string + 'api/Get_Material_No_Scan'
        const data = {
            Barcode_Scan: barcode
        }
        axios.post(url, data, config).then(response => {
            const arr = response.data;
            setMaterialNo(arr)

        })
    }
    //#endregion
    
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Stack height={'100%'} paddingBottom={'20px'}>
                    <Stack height={'10%'} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        {/* Nút back */}
                        <IconButton className={'back-button'} onClick={onClose}>
                            <BiArrowBack className=" icon-wrapper" sx={{ color: 'white' }} />
                        </IconButton>
                        {/* Title */}
                        <Typography variant="h4" component="h4" color={'white'}>{t("lblHistory_Infor") as string}</Typography>
                        {/* Camera */}
                        <IconButton sx={{ marginLeft: '20px' }}  >
                            <CameraAltIcon onClick={handleScanClick} />
                        </IconButton>
                    </Stack>
                    <Stack height={'30%'} alignItems={'center'} >
                        <Grid container marginBottom={'10px'} justifyContent={'center'}>
                            {/* Số phiếu */}
                            <Grid item xs={4.3} display={'flex'}>
                                <InputField label={t("lblNum_No") as string} disable={disable} value={orderNo} handle={handleorderNo} />
                            </Grid>
                            {/* Mã vật tư */}
                            <Grid item xs={4.5} display={'flex'}>
                                <InputField label={t("dcmMaterial_No") as string} disable={disable} value={materialNo} handle={handlematerialNo} />
                            </Grid>
                            {/* RY */}
                            <Grid item xs={3} display={'flex'}>
                                <InputField label={t("lblRY") as string} disable={disable} value={ry} handle={handleRY} />
                            </Grid>
                        </Grid>
                        <Grid container >
                            {/* Từ ngày */}
                            <Grid item lg={1.5} md={1.6} display={'flex'} alignItems={'center'} paddingLeft={'10px'}>
                                <Typography className="textsize">{t("lblFromDate")}</Typography>
                            </Grid>
                            <Grid item lg={2.4} md={2.8} display={'flex'} paddingRight={'16px'}>
                                <DatePickerField customClass="customDateTimePicker" valueDate={(params: any) => { getValueDate(params, 'dateStart') }} />
                            </Grid>
                            <Grid item lg={0.5} md={0} > </Grid>
                            {/* Đến ngày */}
                            <Grid item lg={1.4} md={1.6} display={'flex'} justifyContent={'start'} alignItems={'center'}>
                                <Typography className="textsize">{t("lblToDate")}</Typography>
                            </Grid>
                            <Grid item lg={2.4} md={2.8} display={'flex'} paddingRight={'16px'}>
                                <DatePickerField customClass="customDateTimePicker" valueDate={(params: any) => { getValueDate(params, 'dateEnd') }} />
                            </Grid>
                            {/* Loading */}
                            <Grid item lg={1.6} md={1} display={'flex'} alignItems={'center'} justifyContent={'center'} paddingRight={'16px'}>
                                {isLoading && <CircularProgress size={'24px'} color='info' />}
                            </Grid>
                            {/* Tìm kiếm */}
                            <Grid item lg={2} md={2} display={'flex'} alignItems={'center'} justifyContent={'flex-end'} >
                                <MyButton name={t("btnSearch")} onClick={handleSearch} disabled={disable} />
                            </Grid>
                        </Grid>
                        {/* Máy ảnh */}
                        {modalScan && <QRScanner onScan={handleScanCam} open={modalScan} onClose={() => { setModalScan(false); setMode(false); }} />}
                    </Stack>
                    <Stack overflow={"hidden"} sx={{ height: '100%' }}>
                        {/* Bảng */}
                        <TableOrigin columns={columns} rows={rows} />
                    </Stack>
                </Stack>
            </Box>
        </Modal >
    )
}
export default HistoryRY