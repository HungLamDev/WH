import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface DateTimePickerState {
    dates: any;
}

const initialState: DateTimePickerState = {
    dates: ''
};

const DateTimePicker = createSlice({
    name: 'DateTimePicker',
    initialState,
    reducers: {
        changeMonth: (state, action: PayloadAction<any>) => {
            state.dates=action.payload;
        },
        clearChangeMonth: (state) => {
            state.dates = '';
        }
    }
});

export const { changeMonth, clearChangeMonth } = DateTimePicker.actions;
export default DateTimePicker.reducer;