import { Stack, Box, Modal, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import '../../App.scss'
interface ModalCofirmProps {
    title?: string,
    open?: any,
    onClose?: any,
    onPressOK?: any,
    showOk?: boolean
    showCancel?: boolean
}
function ModalCofirm(props: ModalCofirmProps) {
    const { title, open, onClose, onPressOK, showOk = true, showCancel = true } = props
    const { t } = useTranslation();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // width: '40%',
        // height: '30%',
        bgcolor: '#1c2538',
        border: '2px solid white',
        borderRadius: 3,
        boxShadow: 24,
        p: 2,
    };
    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            slotProps={{
                backdrop: {
                    style: {
                        backdropFilter: "blur(2px)", // Hiệu ứng làm mờ nền
                    },
                },
            }}
        >
            <Box sx={style}>
                <Stack direction={'column'} height={'100%'} gap={2}>
                    <Stack height={'50%'} justifyContent={'center'}>
                        <Typography className='textsize' color={'white'} sx={{ fontSize: 20 }}>{title}</Typography>
                    </Stack>
                    <Stack height={'50%'} direction={'row'} justifyContent={'flex-end'} alignItems={'center'}>
                        {
                            showOk === true &&
                            (
                                <Button className='textsizebtn' onClick={onPressOK} style={{ color: 'white', backgroundColor: '#17594A', marginRight: 20, minWidth: '25%', border: '1px solid white' }}>{t("btnSuccess")}</Button>
                            )
                        }
                        {
                            showCancel === true &&
                            (
                                <Button className='textsizebtn' onClick={onClose} style={{ color: 'white', backgroundColor: '#F24C3D', minWidth: '25%', border: '1px solid white' }}>{t("btnCancel")}</Button>
                            )
                        }
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    )

}

export default ModalCofirm