import { Box, IconButton, Modal } from "@mui/material";
import { BiArrowBack } from "react-icons/bi";
import StockoutScreen from "../../screens/StockoutScreen/StockoutForm";

const ModalStockOutSample = ({ open, handleClose }: { open: any, handleClose: any }) => {
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
                <StockoutScreen />
            </Box>
        </Modal>
    )
}

export default ModalStockOutSample