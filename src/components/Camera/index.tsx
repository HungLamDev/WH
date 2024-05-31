import { useCallback, useRef } from "react";
import Webcam from "react-webcam";
import CancelIcon from '@mui/icons-material/Cancel';
import CameraIcon from '@mui/icons-material/Camera';
interface CameraProps {
    onImageSelected: (dataURL: string | ArrayBuffer | null) => void;
    onCancelCam: (value: string) => void;
}


const Camera: React.FC<CameraProps> = ({ onCancelCam, onImageSelected }) => {
    const videoConstraints: MediaTrackConstraints = {
        // width: '100%' as ConstrainULong,
        height: '100%' as ConstrainULong,
        width: '100%' as ConstrainULong,
        // height: 300,
        facingMode: 'environment',
        //mirrored: false, 
        // ForceScreenshotSourceSize:true,
        // screenshotQuality: 1,
        //facingMode: { exact: "environment" },
        aspectRatio: 1,
    };

    const webcamRef = useRef<Webcam | null>(null);
    const capture = useCallback(() => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc) { // Kiểm tra xem hình ảnh đã được chụp thành công chưa
                onImageSelected(imageSrc);
            } else {
                console.error("Failed to capture image."); // Xử lý khi không thể chụp hình
            }
        } else {
            console.error("Webcam not initialized."); // Xử lý khi webcam chưa được khởi tạo
        }
    }, [webcamRef]);

    const HandleCancel = () => {
        onCancelCam('Camera')
    }

    return (
        <>
            <div style={{display:'flex', flexDirection:'column', gap: 10}}>
                <Webcam
                    audio={false}
                    ref={webcamRef as React.RefObject<Webcam>}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    screenshotQuality={1}
                    imageSmoothing={true}
                    mirrored={false}
                />
                <div style={{display:'flex', justifyContent:'space-around', gap: 10}}>
                    <button style={{cursor:'pointer'}} className="text-red-500 border dark:border-yellow-400 justify-center items-center  flex  btn px-2 text-3xl" onClick={HandleCancel}>
                        <CancelIcon />
                    </button>
                    <button style={{cursor:'pointer'}} className="text-fuchsia-700 border dark:border-yellow-400 justify-center items-center   flex  btn px-2 text-4xl" onClick={capture}>
                        <CameraIcon />
                    </button>
                </div>
            </div>
        </>
    )
}

export default Camera