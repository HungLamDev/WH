//#region import
import FullScreenContainerWithNavBar from "../../../components/FullScreenContainerWithNavBar"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Box, Stack, Grid, FormGroup, FormControlLabel, Checkbox, Typography } from "@mui/material"
import { GridColDef } from "@mui/x-data-grid"
import InputField from "../../../components/InputField"
import MyButton from "../../../components/MyButton"
import MyTable3 from "../../../components/MyTable3"
import { useDispatch, useSelector } from 'react-redux';
import ModalDeleteForm from "../ModelDeleteForm"
import './styles.scss'
import axios from "axios"
import Detail from "../DetailForm";
import Statistics from "../StatisticsForm";
import QC from "../QCForm";
import ImportAndExport from "../ModelImportandExport";
import { connect_string } from "../../LoginScreen/ChooseFactory";
import CircularProgress from '@mui/material/CircularProgress';
import TableOrigin from "../../../components/TableOrigin"
import { useTranslation } from "react-i18next"
import QRScanner from "../../../components/QRScanner"
import { Howl } from 'howler';
import { FAILURE_SOUND_PATH, SUCCESS_SOUND_PATH, successSound } from '../../../utils/pathsound';
import EnterShelves from "../EnterShelves"
import ModalCofirm from "../../../components/ModalConfirm"
import { addFOC } from "../../../redux/FOC"
//#endregion
//#region style
export const styletext = {
    '& .MuiTypography-root': {
        '@media screen and (max-width: 1200px)': {
            fontSize: '14px !important',
        },
    },
};

//#endregion
const Stockin = () => {
    const navigate = useNavigate()
    const { t } = useTranslation();
    const dispatch = useDispatch()

    //#region column header
    const columns: GridColDef[] = [
        {
            field: 'Barcode',
            headerName: t("dcpBarcode") as string,
            width: 200,
            headerClassName: 'custom-header'
        },
        {
            field: 'Material_No',
            headerName: t("dcpMaterial_No") as string,
            width: 150,
            headerClassName: 'custom-header'
        },
        {
            field: 'Rack',
            headerName: t("dcpRack") as string,
            width: 110,
            headerClassName: 'custom-header'
        },
        {
            field: 'Supplier',
            headerName: t("dcpSupplier") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'Material_Name',
            headerName: t("lblMaterial_Name") as string,
            width: 200,
            headerClassName: 'custom-header',

        },
        {
            field: 'Color',
            headerName: t("dcmColor") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'Size',
            headerName: t("dcmSize") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'QTY',
            headerName: t("dcpQTY") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'Print_QTY',
            headerName: t("dcpPrint_QTY") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'Order_No',
            headerName: t("lblOrderNo") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'Roll',
            headerName: t("dcmRoll") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'Production',
            headerName: t("dcpProduction") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'Supplier_No',
            headerName: t("dcpSupplier_no") as string,
            width: 180,
            headerClassName: 'custom-header'
        },
        {
            field: 'Work_Order',
            headerName: t("dcpWork_Order") as string,
            width: 300,
            headerClassName: 'custom-header',

        },
        {
            field: 'User_Serial_Key',
            headerName: t("lblUser_Name") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'Total_QTY',
            headerName: t("lblQtyTotal") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
    ];
    //#endregion

    //#region useSelector
    const dataUser = useSelector((state: any) => state.UserLogin.user);
    const dataFOC = useSelector((state: any) => state.FOC.foc);

    //#endregion

    //#region config special
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },

    };
    //#endregion

    //#region  Variable
    const [disable, setDisable] = useState(false)
    const [shelve, setShelve] = useState('')
    const [rows, setRows] = useState([])
    const [rack, setRack] = useState('')
    const [txtshelve, settxtShelve] = useState('')
    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [total, setTotal] = useState('')
    const [valueScan, setValueScan] = useState('')
    const [datadelete, setDataDelete] = useState('')
    const [qrcode, setQRCode] = useState('')
    const [mode, setMode] = useState(false)
    const [modalScan, setModalScan] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    const [openCofirm, setOpenCofirm] = useState(false)
    const [cofirmType, setCofirmType] = useState('')
    const [dataRow, setDataRow] = useState<any>({})
    const [checkFOC, setCheckFOC] = useState(dataFOC)
    //#endregion

    //#region Func OnChange Input
    const handleShelveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShelve(event.target.value)
    };

    const handleChangeMode = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMode(event.target.checked);
        setModalScan(event.target.checked);
    };

    const handleChangeModeFOC = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckFOC(event.target.checked);
        dispatch(addFOC(event.target.checked))
    };
    //#endregion

    //#region useEffect
    useEffect(() => {
        if (shelve.length === 15 || shelve.length === 16) {
            saveDataInOut()
        }
        if (shelve.length > 4 && shelve.length < 15) {
            checkRack(shelve)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shelve]);


    useEffect(() => {
        if(txtshelve !== ""){
            getDatgetDataStorage(txtshelve)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkFOC]);
    //#endregion

    //#region Func Logic
    const handleOpenConfirm = (confirmName: string) => {
        setCofirmType(confirmName)
        setOpenCofirm(true)
    }

    const handleCloseConfirm = () => {
        setCofirmType('')
        setOpenCofirm(false)
        setShelve("")

    }

    const handleOpen = (name: any) => {
        setModalType(name);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setModalType('');
    };

    const handleScanClick = () => {
        setMode(true);
        setModalScan(true);
    }

    const handleScan = async (result: any | null) => {

        if (result || result.text) {
            setShelve(result.text)
            // setModalScan(false)
            modalScan && successSound.play();
        }
    }

    const checkRack = (txtshelve: string) => {
        setDisable(true)
        setisLoading(true)
        const url = connect_string + 'api/check_rack_data'
        const data = {
            rack_name: txtshelve
        }
        axios.post(url, data, config).then(response => {
            if (response.data !== 'error-data') {
                getDatgetDataStorage(txtshelve)
            }
        }).finally(() => {
            setisLoading(false)
            setDisable(false)
        })

    }

    const getDatgetDataStorage = (txtshelve: string) => {

        setDisable(true)
        setisLoading(true)
        const url = connect_string + 'api/getDataStorage'
        const data = {
            rack: txtshelve,
            get_version:  dataFOC === true ? "FOC" : dataUser[0].WareHouse

        }
        axios.post(url, data, config).then(response => {
            const result = response.data.map((item: any, index: any) => ({
                _id: index,
                Barcode: item.Barcode,
                Material_No: item.Material_No,
                Rack: item.Rack,
                Supplier: item.Supplier,
                Material_Name: item.Material_Name,
                Color: item.Color,
                Size: item.Size,
                QTY: item.QTY,
                Order_No: item.Order_No,
                Roll: item.Roll,
                Production: item.Production,
                Supplier_No: item.Supplier_No,
                Work_Order: item.Work_Order,
                User_Serial_Key: item.User_Serial_Key,
                Total_QTY: item.Total_QTY,
                Print_QTY: item.Print_QTY,
                mau: item.mau
            }))
            setRows(result)
            setShelve('')
            settxtShelve(txtshelve)
            getTotalRack(txtshelve)
        }).finally(() => {
            setisLoading(false)
            setDisable(false)
        })

    }

    const getTotalRack = (txtshelve: string) => {

        const url_getrack = connect_string + 'api/getTotalRack'

        const data = {
            rack: txtshelve,
            get_version:  dataFOC === true ? "FOC" : dataUser[0].WareHouse
        }
        axios.post(url_getrack, data, config).then(response => {
            const Value_Total = response.data[0]['Total_Qty']
            const Value_Scan = response.data[0]['Current_Qty']
            if (Value_Total != "0") {
                setTotal(Value_Total + " ( " + t('dcmRoll') + ": " + response.data[0]['Count_Roll_All'] + " )")
                //setTotal(Value_Total)
            }
            if (Value_Scan != "0") {
                setValueScan(Value_Scan + " ( " + t('dcmRoll') + ": " + response.data[0]['Count_Roll'] + " )")
                //setValueScan(Value_Scan )

            }
            else {
                setTotal(Value_Total)
                setValueScan(Value_Scan)
            }
        })
    }

    const saveDataInOut = () => {
        setisLoading(true)
        setDisable(true)
        //setQRCode(shelve)
        const url_addqrcode = connect_string + 'api/saveDataInOut'
        const data_qrcode = {
            Barcode: shelve,
            Rack: txtshelve,
            User_ID: dataUser[0].UserId,
            get_version: dataUser[0].WareHouse
        }
        axios.post(url_addqrcode, data_qrcode, config).then(response => {
            if (response.data == true) {
                checkRack(txtshelve)
                setShelve('')

            }
            // else {
            //     handleOpenConfirm('materialOut')
            // }
        }).finally(() => {
            setisLoading(false)
            setDisable(false)
        })
    }

    const handleDoubleClick = (params: any, item: any) => {
        setDataDelete(item.Barcode)
        handleOpen('delete')
    }

    const handlePressOK = (barcode: any) => {
        const url = connect_string + 'api/getDataStorage'
        const url_cancel = connect_string + 'api/cancelDataInOut'
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const config2 = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        const data_qrcode = {
            Barcode: barcode,
            Rack: '',
            User_ID: dataUser[0].UserId,
            get_version: dataUser[0].WareHouse
        }
        axios.post(url_cancel, data_qrcode, config).then(
            response => {
                if (response.data === true) {
                    axios.post(url, { rack: txtshelve }, config2).then(response => {
                        const arr = response.data.map((item: any, index: any) => ({
                            _id: index,
                            ...item
                        }))
                        setRows(arr)
                    });
                }
            })

        setOpen(false);
        setModalType('');
    }

    const handleRowClick = (params: any, item: any) => {
        setDataRow(item)
    }


    //#endregion

    return (
        <FullScreenContainerWithNavBar hidden={true} onShowScan={handleScanClick} sideBarDisable={false} sideBarNavigate="/list-stockin" title={t("frmStock_In") as string} navigate="/">
            <Box
                paddingX={0.2}
                paddingBottom={1}
                className={"dark-bg-secondary border-bottom-white"}
            >
                <Stack direction={'row'}>
                    <Stack width={'45%'}>
                        <Grid container justifyContent={'space-between'} alignItems={'center'}>
                            {/* Check chế độ */}
                            <Grid item xs={6}>
                                <FormGroup>
                                    <FormControlLabel sx={styletext} control={<Checkbox defaultChecked={false} onChange={handleChangeMode} />} label={t("gpbMode") as string} />
                                </FormGroup>
                            </Grid>
                            {/* Check FOC */}
                            {
                                dataUser[0].factoryName === "LHG" &&
                                <>
                                    <Grid item xs={2}>
                                        <FormGroup>
                                            <FormControlLabel sx={styletext} control={<Checkbox checked={dataFOC} onChange={handleChangeModeFOC} />} label={"FOC"} />
                                        </FormGroup>
                                    </Grid>

                                    <Grid item xs={4}>
                                        {
                                            checkFOC &&
                                            <Typography className="textsizemini" sx={{ color: '#DD5746' }}>{t("chxSetupFOC")}</Typography>
                                        }
                                    </Grid>
                                </>
                            }
                            <Grid container>
                                {/* Check kệ */}
                                <Grid item xs={4}>
                                    <FormGroup>
                                        <FormControlLabel sx={styletext} control={<Checkbox sx={{ color: 'white' }} />} label={t("lblShelves") as string} />
                                    </FormGroup>
                                </Grid>
                                {/* Tên kệ */}
                                <Grid item xs={2} display={'flex'} alignItems={'center'} justifyContent={'flex-start'}>
                                    <Typography className="textsizebtn" sx={{ color: 'aqua' }}>{txtshelve}</Typography>
                                    {isLoading && <CircularProgress size={'25px'} color="info" />}
                                </Grid>
                                {/* Tổng */}
                                <Grid item xs={5} display={'flex'} alignItems={'center'} >
                                    <FormGroup style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        <Typography className="textsizemini">{t("lblQty_In") as string} {total}</Typography>
                                    </FormGroup>
                                </Grid>
                            </Grid>
                            <Grid container display={'flex'}>
                                {/* Quét */}
                                <Grid item xs={6} display={'flex'}>
                                    <InputField focus={true} label={t("lblScan") as string + "\u2002"} handle={handleShelveChange} keydown={null} value={shelve} />
                                </Grid>
                                {/* SL Quét */}
                                <Grid item xs={5} display={'flex'} alignItems={'center'}>
                                    <FormGroup style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        <Typography className="textsizemini" >{t("lblQty_Scan") as string} {valueScan} </Typography>
                                    </FormGroup>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Stack>
                    <Stack width={'55%'} justifyContent={'center'} rowGap={2}>
                        <Grid container >
                            {/* Nhập kho ERP */}
                            <Grid item xs={4} className="btn-center">
                                <MyButton name={t("btnEnter_Stock") + " ERP"} disabled={true} />
                            </Grid>
                            {/* Xuất kho ERP */}
                            <Grid item xs={4} className="btn-center">
                                <MyButton name={t("btnexportERP")} disabled={true} />
                            </Grid>
                            {/* Nhập kệ ERP */}
                            <Grid item xs={4} className="btn-center">
                                <MyButton name={t("btnrackERP")} onClick={() => handleOpen("enter-shelves")} disabled={disable}/>
                                {modalType === 'enter-shelves' && (
                                    <EnterShelves open={open} onClose={handleClose} />
                                )}
                            </Grid>
                        </Grid>
                        <Grid container gap={0.5} justifyContent={'center'}>
                            {/* Thông tin */}
                            <Grid item  className="btn-center">
                                <MyButton className="btn-stockin" name={t("btnInformation") as string} onClick={() => handleOpen("detail")} disabled={disable} />
                                {modalType === 'detail' && (
                                    <Detail open={open} onClose={handleClose} rack={txtshelve} />
                                )}
                            </Grid>
                            {/* Thống kê */}
                            <Grid item  className="btn-center">
                                <MyButton className="btn-stockin" name={t("btnStatistical") as string} onClick={() => handleOpen("statistic")} disabled={disable} />
                                {modalType === 'statistic' && (
                                    <Statistics open={open} onClose={handleClose} materialNo={dataRow && dataRow.Material_No} />
                                )}
                            </Grid>
                            {/* Tồn kho */}
                            <Grid item  className="btn-center">
                                <MyButton className="btn-stockin" name={t("btnInventory_In") as string} onClick={() => navigate("/inventory-in")} disabled={disable} />
                            </Grid>
                            {/* QC */}
                            <Grid item  className="btn-center">
                                <MyButton className="btn-stockin" name="QC" onClick={() => handleOpen("qc")} disabled={disable} />
                                {modalType === 'qc' && (
                                    <QC open={open} onClose={handleClose} />
                                )}
                            </Grid>
                            {/* Nhập kho */}
                            <Grid item  className="btn-center">
                                <MyButton className="btn-stockin" name={t("btnEnter_Stock") as string} onClick={() => handleOpen("import-and-export")} disabled={disable} />
                                {modalType === 'import-and-export' && (
                                    <ImportAndExport form='stockin' open={open} onClose={handleClose} />
                                )}
                            </Grid>
                        </Grid>
                    </Stack>
                </Stack>
            </Box>
            <Stack overflow={"hidden"} sx={{ height: '100%' }}>
                <TableOrigin columns={columns} rows={rows} handlerowClick={handleRowClick} handleDoubleClick={handleDoubleClick} arrNotShowCell={['_id']} />
                {/* Confirm đá vật tư ra khỏi kệ  */}
                {modalType === 'delete' && (
                    <ModalDeleteForm barcode={datadelete} open={open} onClose={handleClose} onPressOK={() => handlePressOK(datadelete)} />
                )}
                {/* Máy ảnh */}
                {modalScan && <QRScanner onScan={handleScan} open={modalScan} onClose={() => { setModalScan(false); setMode(false); }} />}
                {cofirmType === 'materialOut' && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("msgExistingMaterialExport") as string} />}

            </Stack>

        </FullScreenContainerWithNavBar>

    )
}

export default Stockin