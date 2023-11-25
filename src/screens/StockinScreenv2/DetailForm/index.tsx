//#region import
import { Modal, Box, Typography, Stack, Checkbox, FormGroup, FormControlLabel, Grid, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { GridColDef } from '@mui/x-data-grid';
import InputField from '../../../components/InputField';
import './style.scss'
import { useEffect, useState } from 'react';
import MyTable3 from '../../../components/MyTable3';
import { config } from '../../../utils/api';
import { connect_string } from "../../LoginScreen/ChooseFactory";
import axios from 'axios';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import TableOrigin from '../../../components/TableOrigin';
import { useTranslation } from 'react-i18next';
import { BiArrowBack } from 'react-icons/bi';
import { styletext } from '../StockinForm';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import QRScanner from '../../../components/QRScanner';
import { successSound } from '../../../utils/pathsound';
//#endregion
function Detail({ open, onClose, rack }: { open: any, onClose: any, rack: any }) {
    const { t } = useTranslation();
    //#region Style
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        height: '90%',
        bgcolor: '#1c2538',
        border: '2px solid white',
        borderRadius: 3,
        boxShadow: 24,
    };

    const inputStyles = {
        border: '2px solid white',
        borderRadius: 4,
        'fieldset': {
            border: 'none',
        },
    };

    const input1Styles = {
        color: 'white',
        paddingLeft: '15px',
        fontSize: '13px',
        width: "230px"
    };

    const margin_input = {
        marginBottom: '10px !important'
    }
    //#endregion

    //#region useSelector
    const dataUser = useSelector((state: any) => state.UserLogin.user);
    //#endregion

    //#region Variable
    const [isLoading, setIsLoading] = useState(false)
    const [chxAll, setChxAll] = useState(true)
    const [shelve, setShelve] = useState('')
    const [txtshelve, setTxtShelve] = useState('')
    const [rows, setRows] = useState([])
    const [qrcode, setQRCode] = useState('')
    const [materialname, setMaterialName] = useState('')
    const [materialno, setMaterialNo] = useState('')
    const [conntent, setContent] = useState('')
    const [qty, setQTY] = useState('')
    const [roll, setRoll] = useState('')
    const [unit, setUnit] = useState('')
    const [mode, setMode] = useState(false)
    const [modalScan, setModalScan] = useState(false)
    //#endregion

    //#region Func Onchange Input
    const handlechxAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChxAll(event.target.checked);
    };
    const handleQRcode = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQRCode(event.target.value);
    };
    const handleMaterialName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaterialName(event.target.value);
    };
    const handleMaterialNo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaterialNo(event.target.value);
    };
    const handleContent = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
    };
    const handleQTY = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQTY(event.target.value);
    };
    const handleRoll = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRoll(event.target.value);
    };
    const handleUnit = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUnit(event.target.value);
    };
    //#endregion
   
    //#region column header table
    const columns: GridColDef[] = [
        {
            field: 'Order_No',
            headerName: t("dcpOrder_No") as string,
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
            headerName: t("dcpColor") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'Total_Qty',
            headerName: t("dcpQTY_Show") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'Unit',
            headerName: t("dcpUnit") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'Content',
            headerName: t("dcpContent") as string,
            width: 300,
            headerClassName: 'custom-header'
        },
        {
            field: 'Count_Roll',
            headerName: t("dcpRoll") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
    ];
    //#endregion
   
    //#region useEffect
    useEffect(() => {
        hanldeSendRack()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rack])

    useEffect(() => {
        if (qrcode.length > 4 && qrcode.length < 15) {
            handleScan()
            setShelve(qrcode)
        }
        if (qrcode.length === 15 || qrcode.length === 16) {
            handleScan()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [qrcode])
    //#endregion

    //#region Func Logic
    const hanldeSendRack = () => {
        setIsLoading(true)
        const url = connect_string + 'api/btnInformation_Click'
        const data = {
            User_Serial_Key: dataUser[0].UserId,
            Value_Rack_Daily: rack,
            Value_Roll: "",
            get_version: dataUser[0].WareHouse
        }
        axios.post(url, data, config).then(response => {
            if (response.data.length > 0) {
                const arr = response.data.map((item: any, index: any) => ({
                    _id: index,
                    Order_No: item.Order_No,
                    Material_No: item.Material_No,
                    Color: item.Color,
                    QTY: item.Total_Qty,
                    Unit: item.Unit,
                    Content: item.Content,
                    Count_Roll: item.Count_Roll,
                    Total_Qty: item.Total_Qty
                }))
                setRows(arr)
                setMaterialName(response.data[0].Material_Name)
                setContent(response.data[0].Content)
                setQTY(response.data[0].Total_Qty)
                setMaterialNo(response.data[0].Material_No)
                setRoll(response.data[0].Count_Roll)
                setUnit(response.data[0].Unit)
                setQRCode('')
            }
        }).finally(() => {
            setIsLoading(false)
        }
        )
    }

    const handleScan = () => {
        setIsLoading(true)
        const url = connect_string + 'api/txtScan_TextChanged_info'
        const data = {
            User_Serial_Key: dataUser[0].UserId,
            Value_Rack_Daily: rack,
            Value_Roll: "",
            chxAll: chxAll,
            txtScan: qrcode,
            get_version: dataUser[0].WareHouse

        }
        axios.post(url, data, config).then(response => {
            if (response.data.length > 0) {
                const arr = response.data.map((item: any, index: any) => ({
                    _id: index,
                    Order_No: item.Order_No,
                    Material_No: item.Material_No,
                    Color: item.Color,
                    Total_Qty: item.Total_Qty,
                    Unit: item.Unit,
                    Content: item.Content,
                    Count_Roll: item.Count_Roll
                }))
                setRows(arr)
                setMaterialName(response.data[0].Material_Name)
                setContent(response.data[0].Content)
                setQTY(response.data[0].Total_Qty)
                setMaterialNo(response.data[0].Material_No)
                setRoll(response.data[0].Count_Roll)
                setUnit(response.data[0].Unit)
                setQRCode('')
                setShelve('')
                setTxtShelve(response.data[0].Rack)
            }
        }).finally(() => {
            setIsLoading(false)
        }
        )
    }

    const handleRowClick = (params: any, item: any) => {
        if (item) {
            setMaterialName(item.Material_Name)
            setContent(item.Content)
            setQTY(item.Total_Qty)
            setMaterialNo(item.Material_No)
            setRoll(item.Count_Roll)
            setUnit(item.Unit)
        }
    }
    const handleScanClick = () => {
        setMode(true);
        setModalScan(true);
    }
    const handleScanCam = async (result: any | null) => {
        if (result || result.text) {
            setQRCode(result.text)
            // setModalScan(false)
            modalScan && successSound.play();
        }
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
                <Stack height={'100%'}>
                    <Stack paddingTop={'15px'} height={'5%'} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <IconButton className={'back-button'} onClick={onClose}>
                            <BiArrowBack className=" icon-wrapper" sx={{ color: 'white' }} />
                        </IconButton>
                        <Typography variant="h4" component="h4" color={'white'}>{t("lblMaterial_Infor") as string}</Typography>
                        <IconButton sx={{ marginLeft: '20px' }}  >
                            <CameraAltIcon onClick={handleScanClick} />
                        </IconButton>
                    </Stack>
                    <Stack direction={'row'} height={'40%'}>
                        <Stack sx={{ width: '50%', height: '100%' }} justifyContent={'space-evenly'} alignItems={'center'}>
                            <FormGroup sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '22rem', justifyContent: 'space-between' }}>
                                <FormControlLabel sx={styletext} control={<Checkbox sx={{ color: 'white' }} onChange={handlechxAll} value={chxAll} />} label={t("chxAll") as string} />
                                {isLoading && <><CircularProgress size={'20px'} color="info" sx={{ marginRight: '10px' }} /></>}
                            </FormGroup>
                            <Typography sx={{ marginRight: '20px', textAlign: 'end', width: '22rem', color: 'aqua' }}> {txtshelve ? txtshelve : rack}</Typography>
                            <InputField label={t("dcpMaterial_Name") as string} handle={handleMaterialName} keydown="" value={materialname} disable={false} />

                            <InputField label={t("dcpContent") as string} handle={handleContent} keydown="" value={conntent} disable={false} />

                            <InputField label={t("dcpQTY_Show") as string} handle={handleQTY} keydown="" value={qty} disable={false} />
                        </Stack>
                        <Stack sx={{ width: '50%', height: '100%' }} justifyContent={'space-evenly'} alignItems={'center'}>
                            <InputField label={t("gpbScan") as string} handle={handleQRcode} keydown="" value={qrcode} disable={false} />

                            <InputField label={t("dcpMaterial_No") as string} handle={handleMaterialNo} keydown="" value={materialno} disable={false} />

                            <InputField label={t("dcpRoll") as string} handle={handleRoll} keydown="" value={roll} disable={false} />

                            <InputField label={t("dcpUnit") as string} handle={handleUnit} keydown="" value={unit} disable={false} />
                        </Stack>
                    </Stack>
                    <Stack height={'55%'} overflow={"hidden"}>
                        <TableOrigin handlerowClick={handleRowClick} columns={columns} rows={rows} arrNotShowCell={['_id']} />
                    </Stack>
                    {modalScan && <QRScanner onScan={handleScanCam} open={modalScan} onClose={() => { setModalScan(false); setMode(false); }} />}
                </Stack>

            </Box>
        </Modal >
    )
}
export default Detail