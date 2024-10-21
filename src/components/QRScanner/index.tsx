import { Modal, Box, Button } from "@mui/material";
import React, { useState } from "react";
import { QrScanner } from '@yudiel/react-qr-scanner';

interface ScannerQRProps {
  onScan: (result: string | null) => void, open: any, onClose: any,
}

const QRScanner: React.FC<ScannerQRProps> = ({ onScan, open, onClose }) => {
  const [scannerKey, setScannerKey] = useState(0); // Khởi tạo state cho key của component QrScanner

  const handleScan = (data: any | null) => {
    if (data) {
      onScan(data);
      setScannerKey((prevKey) => prevKey + 1); // Thay đổi giá trị key của component QrScanner
    }
  };

  const handleError = (error: Error) => {
    // console.error(error);
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '350px',
    height: '350px',
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
            backdropFilter: "blur(1px)"
          },
        },
      }}
    >
      <Box sx={style}>
        <Button onClick={onClose} style={{
          color: '#1c2538',
          backgroundColor: 'white',
          borderRadius: "50px",
          height: "30px",
          width: '30px',
          padding: '0',
          border: '3px solid #1c2538',
          position: 'absolute',
          top: '-15px',
          right: '-5px'
        }}>
          X
        </Button>
        <QrScanner
          key={scannerKey}
          scanDelay={500}
          onError={handleError}
          onResult={handleScan}
          containerStyle={{ width: "100%", margin: "auto" }}
          constraints={{ facingMode: 'environment' }}
        />
      </Box>
    </Modal>
  );
};

export default QRScanner;