import { useTranslation } from "react-i18next";
import FullScreenContainerWithNavBar from "../FullScreenContainerWithNavBar";
import { Box, Grid, IconButton, Modal, Stack, Typography } from "@mui/material";
import { BiArrowBack } from "react-icons/bi";

interface ReturnStampProps {
    title?: string,
    open?: any,
    onClose?: any,
    onPressOK?: any,
    showOk?: boolean
}

const ReturnStamp = (props: ReturnStampProps) => {
    const { title, open, onClose, onPressOK, showOk = true } = props
    const { t } = useTranslation();

    //#region style
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: '90%',
        bgcolor: '#1c2538',
        border: '2px solid white',
        borderRadius: 3,
        boxShadow: 24,
        display: 'flex',
        flexDirection: 'column'
    };
    //#endregion

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
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} style={{ borderBottom: '1px solid gray' }}>
                    {/* Nút back */}
                    <IconButton className={'back-button'} onClick={onClose}>
                        <BiArrowBack className=" icon-wrapper" />
                    </IconButton>
                    {/* Tittle */}
                    <Typography variant="h5" component="h5" color={'white'}>{t("btnSearch")}</Typography>
                    <Typography variant="h5" component="h5" color={'white'}></Typography>
                </Stack>
                <Stack>
                    <Grid container>
                        
                    </Grid>
                </Stack>
            </Box>
        </Modal>
    )
}

export default ReturnStamp