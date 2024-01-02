import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material"
import { useTranslation } from "react-i18next";

interface FormConfirmMaterial {
    title?: string,
    data?: any,
    open?: any,
    onPressOK?: any,
    onClose?: any
}

const FormConfirmMaterial = (props: FormConfirmMaterial) => {
    const { title, data, open, onPressOK, onClose } = props
    const { t } = useTranslation();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        height: '40%',
        bgcolor: '#1c2538',
        border: '2px solid white',
        borderRadius: 3,
        boxShadow: 24,
        p: 2,
        "@media screen and (max-width: 1200px)": {
            top: '40%',
            width: '50%',
            height: '50%',
        },
    };
    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Stack direction={'column'} height={'100%'} >
                    <Stack height={'80%'} justifyContent={'center'}>
                        <Typography  color={'white'} sx={{ fontSize: 20, textAlign: 'center' }}>{title}</Typography>
                        < TextField
                            id="outlined-multiline-flexible"
                            multiline
                            rows={5}
                        />
                    </Stack>
                    <Stack height={'20%'} direction={'row'} justifyContent={'flex-end'} alignItems={'end'}>
                        <Button className='textsizebtn' onClick={onPressOK} style={{ color: 'white', backgroundColor: '#17594A', marginRight: 20, width: '30%', height: '60%' }}>{t("btnSuccess")}</Button>
                        <Button className='textsizebtn' onClick={onClose} style={{ color: 'white', backgroundColor: '#F24C3D', width: '30%', height: '60%' }}>{t("btnCancel")}</Button>
                    </Stack>
                </Stack>
            </Box>

        </Modal >
    )
}

export default FormConfirmMaterial;
