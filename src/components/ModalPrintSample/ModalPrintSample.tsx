import { Box, IconButton, Modal } from "@mui/material";
import { BiArrowBack } from "react-icons/bi";
import DataHistoryPrintScreen from "../../screens/PrintOtherScreen/PrintSampleScreen";

const ModalPrintSample = ({ open, handleClose, data }: { open: any, handleClose: any, data: any }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '100%',
        bgcolor: '#1c2538',
    };
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box sx={{
                    position: 'absolute',
                    height: '10%',
                    width: '10%',
                    zIndex: '9',
                    background: '#2f3b52'
                }}>
                    <IconButton className={'back-button'} onClick={handleClose}>
                        <BiArrowBack className=" icon-wrapper" />
                    </IconButton>
                </Box>
                <DataHistoryPrintScreen data={data} />
            </Box>
        </Modal>
    )
}

export default ModalPrintSample