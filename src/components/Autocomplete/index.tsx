import { Autocomplete, Grid, Stack, TextField, Typography } from "@mui/material"
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
    data?:any
    xsLabel?: number,
    xsInput?: number
}

const MyAutocomplete = (props: InputFieldV1Props) => {
    const { label, value, handle, keydown, type, disable, customClass, selected, focus, onFocus, xsLabel = 4, xsInput = 7, data=[] } = props
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
                    <Autocomplete
                        value={value}
                        onChange={(event: any, newValue: string | null) => {
                            handle(newValue);
                        }}
                        className="dark-bg-primary "
                        disablePortal
                        options={data}
                        id="combo-box-demo"
                        // disabled={disable}
                        sx={{
                            borderRadius: "50px",
                            border: "1px solid",
                            width: '100%',
                            "& .MuiInputBase-root": {
                                height: "2rem ",
                                paddingX:'14px',
                                paddingY:'0px',
                                '@media screen and (max-width: 1200px)': {
                                    height: "1.8rem !important",
                                },

                                '@media screen and (max-width: 900px)': {
                                    height: "1.5rem !important",
                                },
                            },

                        }}
                        renderInput={(params: any) => (
                            <TextField
                                {...params}
                                className="dark-bg-primary"
                                sx={{
                                    borderRadius: "50px",
                                    color: "white",
                                    height: "2rem",
                                    "& fieldset": {
                                        borderColor: "white",
                                        border: "none"
                                    },
                                    "& .MuiInputBase-input": {
                                        '@media screen and (max-width: 1200px)': {
                                            fontSize: '14px'
                                        },

                                        '@media screen and (max-width: 900px)': {
                                            fontSize: '12px'
                                        },

                                    },
                                    '@media screen and (max-width: 1200px)': {
                                        height: "1.8rem",
                                    },

                                    '@media screen and (max-width: 900px)': {
                                        height: "1.5rem",
                                    },
                                }}
                            />
                        )}
                    />
                </Grid>
            </Grid>
        </Stack>
    )
}

export default MyAutocomplete