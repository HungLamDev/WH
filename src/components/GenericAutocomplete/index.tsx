import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

type GenericAutocompleteProps<T> = {
    options: T[]; // Mảng các đối tượng
    value: T | string | null; // Giá trị hiện tại
    onChange: (value: T | string | null) => void; // Hàm xử lý khi thay đổi
    onInputChange?: (value: string) => void; // Hàm xử lý khi nhập
    getOptionLabel: (option: T | string) => string; // Hàm để lấy nhãn của từng option
    isOptionEqualToValue?: (option: T, value: T | string) => boolean; // Hàm so sánh
    disabled?: boolean; // Trạng thái vô hiệu hóa
    allowFreeSolo?: boolean; // Bật/tắt tính năng freeSolo
};

function GenericAutocomplete<T extends object | string>({
    options,
    value,
    onChange,
    onInputChange,
    getOptionLabel,
    isOptionEqualToValue,
    disabled = false,
    allowFreeSolo = false,
}: GenericAutocompleteProps<T>) {
    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                // Xử lý khi chọn hoặc nhập
                onChange(newValue);
            }}
            onInputChange={(event, newInputValue) => {
                // Xử lý khi người dùng nhập văn bản
                if (onInputChange) {
                    onInputChange(newInputValue);
                } else if (allowFreeSolo) {
                    onChange(newInputValue as T); // Cho phép gán trực tiếp khi freeSolo
                }
            }}
            freeSolo={allowFreeSolo} // Bật/tắt tính năng freeSolo
            disablePortal
            options={options}
            getOptionLabel={(option) => getOptionLabel(option)}
            isOptionEqualToValue={(option, currentValue) =>
                isOptionEqualToValue
                    ? isOptionEqualToValue(option, currentValue)
                    : option === currentValue
            }
            disabled={disabled}
            sx={{
                borderRadius: '50px',
                border: '1px solid',
                width: '100%',
                // height: '2rem !important',
                '& .MuiInputBase-root': {
                    height: '2rem !important',
                    padding: 0,
                    paddingLeft: 0.5,
                    '@media screen and (max-width: 1200px)': {
                        height: '1.8rem !important',
                    },
                    '@media screen and (max-width: 900px)': {
                        height: '1.5rem !important',
                    },
                },
            }}
            componentsProps={{
                popper: {
                    sx: {
                        '& .MuiAutocomplete-listbox': {
                            '@media screen and (max-width: 1200px)': {
                                fontSize: '14px !important',
                            },
                            '@media screen and (max-width: 900px)': {
                                fontSize: '12px !important',
                            },
                        },
                    },
                },
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    className="dark-bg-primary"
                    sx={{
                        borderRadius: '50px',
                        height: '1.9rem !important',
                        
                        '& fieldset': {
                            borderColor: 'white',
                            border: 'none',
                        },
                        '& .MuiInputBase-input': {
                            '@media screen and (max-width: 1200px)': {
                                fontSize: '14px',
                            },
                            '@media screen and (max-width: 900px)': {
                                fontSize: '12px',
                            },
                        },
                        '@media screen and (max-width: 1200px)': {
                            height: '1.8rem  !important',
                        },
                        '@media screen and (max-width: 900px)': {
                            height: '1.5rem  !important',
                        },
                    }}
                />
            )}
        />
    );
}

export default GenericAutocomplete;
