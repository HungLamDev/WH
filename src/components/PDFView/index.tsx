import { Box, Modal } from '@mui/material';
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
interface PdfViewerProps {
    open: boolean,
    pdfFile: string,
    onClose: any
}

const PdfViewer = (props: PdfViewerProps) => {
    const { open, pdfFile, onClose } = props
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
        p:1
    };
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            slotProps={{
                backdrop: {
                    style: {
                        backdropFilter: "blur(2px)", 
                    },
                },
            }}
        >
            <Box sx={style}>
            <Worker workerUrl={"/pdf.worker.min.js"}>
                <Viewer fileUrl={pdfFile} />
            </Worker>
            </Box>
        </Modal>
    )
}

export default PdfViewer;