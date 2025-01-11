import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { t } from 'i18next';

type GenericAutocompleteProps<T> = {
    options: T[]; 
    value: T | string | null;
    onChange: (value: T | string | null) => void; 
    onInputChange?: (value: string) => void;
    getOptionLabel: (option: T | string) => string; 
    isOptionEqualToValue?: (option: T, value: T | string) => boolean;
    disabled?: boolean; 
    allowFreeSolo?: boolean; 
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
                    onChange(newInputValue as T);
                }
            }}
            noOptionsText={t("lblNoOption") as string}
            freeSolo={allowFreeSolo} 
            disablePortal
            options={options}
            getOptionLabel={(option) => getOptionLabel(option)}
            isOptionEqualToValue={(option, currentValue) =>
                isOptionEqualToValue
                    ? isOptionEqualToValue(option, currentValue)
                    : option === currentValue
            }
            renderOption={(props, option) => {
                let color = "white"; 
                if (option && (option as any)?.check === true) {
                    color = "grey"; 
                } 
                return (
                    <li {...props} style={{ color }}>
                        {getOptionLabel(option)}
                    </li>
                );
            }}
            disabled={disabled}
            sx={{
                borderRadius: '50px',
                border: '1px solid',
                width: '100%',
                // height: '2rem !important',
                '& .MuiInputBase-root': {
                    padding: '0px 5px',
                    height: '1.9rem !important',
                    '@media screen and (max-width: 1200px)': {
                        height: '1.6rem !important',
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
                            height: '1.6rem  !important',
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
