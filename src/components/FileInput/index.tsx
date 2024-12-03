/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, ChangeEvent } from "react";
import FileUploadIcon from '@mui/icons-material/FileUpload';

interface FileInputProps {
    onImageSelected: (dataURL: string | ArrayBuffer | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onImageSelected }) => {

    const inputRef = useRef<HTMLInputElement>(null);

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            if (event.target.files[0].type.startsWith("image/")) {

                const reader = new FileReader();
                // reader.readAsDataURL(event.target.files[0]);
                reader.onload = function () {
                    if (reader.readyState === 2) {
                        onImageSelected(reader.result);
                    }
                };
                reader.readAsDataURL(event.target.files[0]);
            } 

        }
    };

    const onChooseImg = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    return (
        <div >
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleOnChange}
                style={{ display: "none" }}
            />

            <button
                style={{ cursor:'pointer',width:'100%',background: 'transparent', border: '2px solid white', color: "white", padding: '5px', borderRadius: '12px' }}
                onClick={onChooseImg}>
                <FileUploadIcon />
            </button>
        </div>
    );
};

export default FileInput;
