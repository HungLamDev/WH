//#region import
import { Stack, Box, Modal, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
//#endregion
function ModalDeleteForm({ barcode, open, onClose, onPressOK }: { barcode: string, open: any, onClose: any, onPressOK: any }) {
    const { t } = useTranslation();
    //#region Style
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        height: '20%',
        bgcolor: '#1c2538',
        border: '2px solid white',
        borderRadius: 3,
        boxShadow: 24,
        p: 2,
    };
    //#endregion
    
    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Stack direction={'column'} height={'100%'} >
                    <Stack height={'50%'}  justifyContent={'center'}>
                        <Typography color={'white'} sx={{ fontSize: 20 }}>{t('msgDeleteBarcode') as string} {barcode}</Typography>
                    </Stack>
                    <Stack height={'50%'} direction={'row'} justifyContent={'flex-end'} alignItems={'center'}>
                        <Button onClick={onPressOK} style={{ color: 'white', backgroundColor: '#17594A', marginRight: 20, width:'30%', height:'60%'}}>{t('btnSuccess') as string}</Button>
                        <Button onClick={onClose} style={{ color: 'white', backgroundColor: '#F24C3D',width:'30%', height:'60%'}}>{t('btnCancel') as string}</Button>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    )

}

export default ModalDeleteForm
