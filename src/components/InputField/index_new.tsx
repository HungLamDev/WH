import { Grid, Stack, TextField, Typography } from "@mui/material";
import '../../App.scss'
import { useEffect, useRef } from "react";

interface InputFieldV1Props {
    label?: string,
    value?: any,
    handle?: any,
    keydown?: any,
    type?: string,
    disable?: boolean,
    customClass?: string,
    selected?: boolean,
    focus?: boolean,
    onFocus?: any,
    xsLabel?: number
    xsInput?: number,
    handleOnFocus?: any,
    id?: string
}

const InputFieldV1 = (props: InputFieldV1Props) => {
    const {
        label,
        value,
        handle,
        keydown,
        type,
        disable,
        customClass,
        selected,
        focus,
        onFocus,
        xsLabel = 4,
        xsInput = 7,
        handleOnFocus,
        id
    } = props

    const textFieldRef: any = useRef(null);
    useEffect(() => {
        if (onFocus) {
            textFieldRef.current.focus();
        }
    }, [onFocus])


    return (
        <Stack
            direction={"row"}
            alignItems={"center"}
            className={`${customClass}`}
            width={'100%'}
        >
            <Grid container alignItems={'center'} flexWrap={'nowrap'} columnGap={'5px'}
            >
                <Grid item xs={xsLabel} display={'flex'} >
                    <Typography className="textsize" sx={{ wordBreak: 'break-word' }}>{label}</Typography>
                </Grid>
                <Grid item xs={xsInput} flexShrink={0}>
                    <TextField
                        id={id}
                        inputRef={textFieldRef}
                        autoFocus={focus}
                        select={selected}
                        disabled={disable}
                        autoComplete="off"
                        type={type ? type : "text"}
                        onFocus={handleOnFocus}
                        sx={{
                            width: '100%',
                        }}
                        InputProps={{
                            inputProps: {
                                step: null,
                            },
                            className: "dark-bg-primary",
                            value: value,
                            onChange: handle,
                            onKeyDown: typeof keydown === "function" ? keydown : undefined,
                            sx: {
                                borderRadius: "50px",
                                color: "white",
                                height: "1.9rem ",


                                "& fieldset": { borderColor: "white" },

                                // '& .MuiInputBase-input': {

                                '@media screen and (max-width: 1200px)': {
                                    fontSize: '14px !important',
                                    height: "1.6rem",
                                },

                                '@media screen and (max-width: 900px)': {
                                    fontSize: '12px !important',
                                    height: "1.5rem",
                                },
                                // },
                            },
                        }}
                    ></TextField>
                </Grid>
            </Grid>
        </Stack>
    );
};

export default InputFieldV1;
