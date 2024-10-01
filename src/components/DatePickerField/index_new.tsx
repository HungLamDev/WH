import { Grid, Stack, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { MobileDatePicker, MobileDatePickerSlotsComponentsProps } from "@mui/x-date-pickers/MobileDatePicker";
import { useState, useEffect } from "react";
import HorizontalStack from "../HorizontalStack";
import { currentDay, previousDate } from "../../utils/date.ts";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { clearChangeMonth } from "../../redux/Datetimepicker.ts";

interface DatePickerFieldV1Props
{ 
    label?: string, 
    valueDate?: any, 
    onValueChange?: string, 
    readonly?: boolean, 
    customClass?: string,
    xsLabel?: number
    xsDate?: number
}
const DatePickerFieldV1 = (props: DatePickerFieldV1Props) => {
    const { label, valueDate, onValueChange, readonly, customClass, xsLabel = 4, xsDate= 7 } = props
    const [selectedDate, setSelectedDate] = useState(moment());
    //const changeMonth = useSelector((state: any) => state.DateTimePicker.dates);
    useEffect(() => {
        setSelectedDate(moment(onValueChange))
    }, [onValueChange])

    return (
        <HorizontalStack
            direction={"row"}
            width={'100%'}
            className={`${customClass}`}
            alignItems={'center'}
        >
            <Grid container alignItems={'center'}  flexWrap={'nowrap'} columnGap={'5px'} >
                <Grid item xs={xsLabel} display={'flex'} >
                    <Typography className="textsize" sx={{ wordBreak: 'break-word' }}>{label}</Typography>
                </Grid>
                <Grid item xs={xsDate} flexShrink={0}>
                    <LocalizationProvider
                        dateAdapter={AdapterMoment}
                        dateFormats={{
                            monthAndYear: "MM/YYYY",
                        }}

                    >
                        <MobileDatePicker
                            disabled={readonly}
                            format={"DD/MM/YYYY"}
                            value={selectedDate}
                            onChange={(value: any) => {
                                setSelectedDate(value)
                                valueDate(moment(value).format('MM/DD/YYYY'));
                            }}
                            defaultValue={currentDay}
                            reduceAnimations={true}
                            slotProps={{
                                textField: {
                                    inputProps: {
                                        className: "dark-bg-primary",
                                        sx: {
                                            borderRadius: "50px",
                                            color: "white",
                                            border: "1px solid white",
                                            height: "2rem",
                                            p: 0,
                                            textAlign: "center",

                                            '@media screen and (max-width: 1200px)': {
                                                fontSize: '14px !important',
                                                height: "1.8rem",

                                            },
                                            '@media screen and (max-width: 900px)': {
                                                height: "1.5rem",
                                                fontSize: '12px !important',
                                            },
                                        },
                                    },
                                    sx: {
                                        "& fieldset": { border: "none!important" },
                                        width: '100%'
                                    },
                                },
                                toolbar: {
                                    hidden: true,
                                },
                                shortcuts: {
                                    hidden: true,
                                },

                            }}
                        />
                    </LocalizationProvider>
                </Grid>
            </Grid>
        </HorizontalStack>
    );
};

export default DatePickerFieldV1;
