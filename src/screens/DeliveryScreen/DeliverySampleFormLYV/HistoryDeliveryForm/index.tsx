import { useTranslation } from "react-i18next"
import FullScreenContainerWithNavBar from "../../../../components/FullScreenContainerWithNavBar"
import { Autocomplete, Box, Grid, Stack, TextField } from "@mui/material"
import InputFieldV1 from "../../../../components/InputField/index_new"
import React, { useState } from "react"
import DatePickerFieldV1 from "../../../../components/DatePickerField/index_new"
import moment from "moment"
import MyButton from "../../../../components/MyButton"

const HistoryDeliveryForm = () => {
    const { t } = useTranslation()

    const [disable, setDisable] = useState(false)
    const [valueAutocomplete, setValueAutocomplete] = React.useState<string | null>('');
    const [openDateTo, setOpenDateTo] = useState(moment());
    const [openDateFrom, setOpenDateFrom] = useState(moment());

    const handleDateChange = (name: string, param: any) => {
        if (name === 'openDateFrom') {
            setOpenDateFrom(param);
        }
        if (name === 'openDateTo') {
            setOpenDateTo(param);
        }
    };

    return (
        <FullScreenContainerWithNavBar
            hidden={true}
            sideBarDisable={true}
            onShowScan={undefined}
            sideBarNavigate=''
            title={t("btnHistory")}
            navigate="/delivery-sample-lyv"
        >
            <Box
                paddingX={1}
                paddingBottom={1}
                className={"dark-bg-secondary border-bottom-white"}
            >
                <Stack alignItems={'center'}>
                    <Grid container spacing={2} width={'80%'}>
                        <Grid item xs={4} display={'flex'}>
                            <InputFieldV1
                                xsLabel={4}
                                xsInput={7}
                                label='Test No'
                                disable={disable}
                                value={""}
                                handle={undefined}
                            />
                        </Grid>
                        <Grid container item xs={4} display={'flex'}>
                            <Grid item xs={4} display={'flex'} alignItems={'center'}>
                                <span className='textsize'>{"Trạng thái"}</span>
                            </Grid>
                            <Grid item xs={7} display={'flex'}>
                                <Autocomplete
                                    value={valueAutocomplete}
                                    onChange={(event: any, newValue: string | null) => {
                                        setValueAutocomplete(newValue);
                                    }}
                                    className="dark-bg-primary "
                                    disablePortal
                                    options={[...new Set([])]}
                                    id="combo-box-demo"
                                    disabled={disable}
                                    sx={{
                                        borderRadius: "50px",
                                        border: "1px solid",
                                        width: '100%',

                                        "& .MuiInputBase-root": {
                                            height: "2rem",
                                            padding: 0,

                                            '@media screen and (max-width: 1200px)': {
                                                height: "1.8rem !important",
                                            },

                                            '@media screen and (max-width: 900px)': {
                                                height: "1.5rem !important",
                                            },
                                        },

                                    }}
                                    renderInput={(params) => (
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
                        <Grid container item xs={4} display={'flex'}>
                            <Grid item xs={5} display={'flex'} alignItems={'center'}>
                                <span className='textsize'>{"Sample Order"}</span>
                            </Grid>
                            <Grid item xs={7} display={'flex'}>
                                <Autocomplete
                                    value={valueAutocomplete}
                                    onChange={(event: any, newValue: string | null) => {
                                        setValueAutocomplete(newValue);
                                    }}
                                    className="dark-bg-primary "
                                    disablePortal
                                    options={[...new Set([])]}
                                    id="combo-box-demo"
                                    disabled={disable}
                                    sx={{
                                        borderRadius: "50px",
                                        border: "1px solid",
                                        width: '100%',

                                        "& .MuiInputBase-root": {
                                            height: "2rem",
                                            padding: 0,

                                            '@media screen and (max-width: 1200px)': {
                                                height: "1.8rem !important",
                                            },

                                            '@media screen and (max-width: 900px)': {
                                                height: "1.5rem !important",
                                            },
                                        },

                                    }}
                                    renderInput={(params) => (
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
                        <Grid container item xs={4} display={'flex'}>
                            <Grid item xs={4} display={'flex'} alignItems={'center'}>
                                <span className='textsize'>{t("lblFromDate")}</span>
                            </Grid>
                            <Grid item xs={7} display={'flex'}>
                                <DatePickerFieldV1
                                    xsLabel={0}
                                    xsDate={12}
                                    valueDate={(param: any) => handleDateChange('openDateFrom', param)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item xs={4} display={'flex'}>
                            <Grid item xs={4} display={'flex'} alignItems={'center'}>
                                <span className='textsize'>{t("lblFromDate")}</span>
                            </Grid>
                            <Grid item xs={7} display={'flex'} >
                                <DatePickerFieldV1
                                    xsLabel={0}
                                    xsDate={12}
                                    valueDate={(param: any) => handleDateChange('openDateFrom', param)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} justifyContent={'center'} gap={"20px"}>
                            <Grid item display={'flex'}>
                                <MyButton height='2rem' name={t('btnSearch')} onClick={undefined} disabled={disable} />
                            </Grid>
                            <Grid item display={'flex'}>
                                <MyButton height='2rem' name={t('btnClean')} onClick={undefined} disabled={disable} />
                            </Grid>
                            <Grid item display={'flex'}>
                                <MyButton height='2rem' name={t('btnExcel')} onClick={undefined} disabled={disable} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Stack>
            </Box>
        </FullScreenContainerWithNavBar>
    )
}

export default HistoryDeliveryForm