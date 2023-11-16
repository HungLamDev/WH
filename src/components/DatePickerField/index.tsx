import { Stack, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { MobileDatePicker, MobileDatePickerSlotsComponentsProps } from "@mui/x-date-pickers/MobileDatePicker";
import { useState, useEffect } from "react";
import HorizontalStack from "../HorizontalStack";
import { currentDay, previousDate } from "../../utils/date.ts";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { clearChangeMonth } from "../../redux/Datetimepicker.ts";
const DatePickerField = ({ label, valueDate, onValueChange, readonly }: { label?: string, valueDate?: any, onValueChange?: string, readonly?: boolean }) => {
  const dispatch = useDispatch()
  const [selectedDate, setSelectedDate] = useState(moment());
  //const changeMonth = useSelector((state: any) => state.DateTimePicker.dates);
  useEffect(() => {
    setSelectedDate(moment(onValueChange))

  }, [onValueChange])

  return (
    <HorizontalStack
      direction={"row"}
      justifyContent={"space-between"}
      className={"input-field-container"}
    >
      <Typography className="textsize">{label}</Typography>
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
            //console.log(selectedDate)
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
                  '@media screen and (max-width: 1000px)': {
                    fontSize: '14px !important',
                  },
                },
              },
              sx: {
                "& fieldset": { border: "none!important" },

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
    </HorizontalStack>
  );
};

export default DatePickerField;
