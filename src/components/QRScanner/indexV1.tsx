import React, { useState } from "react";
import { Modal, Box, Button } from "@mui/material";
import { QrScanner } from '@yudiel/react-qr-scanner';

interface ScannerQRProps {
  open: boolean;
  onClose: any;
  onScan: (data: string | null) => void;
}

const QRScannerV1: React.FC<ScannerQRProps> = ({ open, onClose, onScan }) => {
  const [scannerKey, setScannerKey] = useState(0);

  const handleScan = (data: any | null) => {
    if (data) {
      onScan(data);
      setScannerKey((prevKey) => prevKey + 1);
    }
  };

  const handleError = (error: Error) => {
    console.error(error);
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
      onClose={onClose}
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

export default QRScannerV1;
