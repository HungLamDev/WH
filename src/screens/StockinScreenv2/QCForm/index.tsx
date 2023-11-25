//#region import
import InputField from '../../../components/InputField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Stack, Box, Modal, Typography, IconButton } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { GridColDef } from '@mui/x-data-grid';
import MyTable3 from '../../../components/MyTable3';
import { useState, useEffect } from 'react';
import { config } from '../../../utils/api';
import { connect_string } from "../../LoginScreen/ChooseFactory";
import axios from 'axios';
import TableOrigin from '../../../components/TableOrigin';
import { useTranslation } from 'react-i18next';
import { BiArrowBack } from 'react-icons/bi';
import { useSelector } from 'react-redux';
//#endregion
const QC = ({ open, onClose }: { open?: any, onClose?: any }) => {
    const { t } = useTranslation();
    //#region column header table
    const columns: GridColDef[] = [
        {
            field: 'DDBH',
            headerName: t("chxRY") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'QCDate',
            headerName: t("dcpQCDate") as string,
            width: 150,
            editable: true,
            headerClassName: 'custom-header'
        },
        {
            field: 'Result',
            headerName: t("dcpResult") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'REMARK',
            headerName: t("dcpRemak_RY") as string,
            width: 300,
            headerClassName: 'custom-header'
        },
        {
            field: 'Reason',
            headerName: t("dcpReason") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'InspectorID',
            headerName: t("dcpInspectorID") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'InspectorName',
            headerName: t("dcpInspectorName") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
    ];
    //#endregion
    
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
    //#endregion
   
    //#region Variable
    const [txtscan, setTxtScan] = useState('')
    const [rows, setRows] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    //#endregion
    
    //#region Func OnChange Input
    const handleTxtScan = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTxtScan(event.target.value)
    };
    //#endregion

    //#region useEffect
    useEffect(() => {
        if (txtscan.length > 5) {
            ScanValue()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [txtscan])
    //#endregion
    
    //#region useSelector
    const dataUser = useSelector((state: any) => state.UserLogin.user);
    //#endregion

    //#region Func Logic
    const ScanValue = () => {
        setIsLoading(true)
        const url = connect_string + "api/txtScan_TextChanged_FrmInQC"
        const data = {
            txtScan: txtscan,
            get_version: dataUser[0].WareHouse

        }
        axios.post(url, data, config).then(response => {
            const arr = response.data.map((item: any, index: any) => ({
                _id: index,
                DDBH: item.DDBH,
                QCDate: item.QCDate,
                Result: item.Result,
                REMARK: item.REMARK,
                Reason: item.Reason,
                InspectorID: item.InspectorID,
                InspectorName: item.InspectorName
            }))
            setRows(arr)
            if (txtscan.length >= 15) {
                setTxtScan(arr[0].DDBH)
            }
        }).finally(() => {
            setIsLoading(false)
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
                <Stack height={'100%'}>
                    <Stack height={'10%'} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <IconButton className={'back-button'} onClick={onClose}>
                            <BiArrowBack className=" icon-wrapper" sx={{ color: 'white' }} />
                        </IconButton>                        
                        <Typography variant="h4" component="h4" color={'white'}>{t("lblQC_Infor") as string}</Typography>
                        <Typography></Typography>
                    </Stack>
                    <Stack height={'90%'} >
                        <Box sx={{ height: '10%', display: 'flex', width: '100%', justifyContent: 'end', marginBottom: '10px', alignItems: 'center' }}>
                            {isLoading && <CircularProgress size={'25px'} color='info' />}
                            <InputField focus={true} label='' handle={handleTxtScan} keydown="" value={txtscan} disable={false} />
                        </Box>
                        <Box sx={{ height: '85%', width: '100%', overflow:'hidden' }}>
                            <TableOrigin columns={columns} rows={rows} arrNotShowCell={['_id']} handleDoubleClick={null} handlerowClick={null} />
                        </Box>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export default QC