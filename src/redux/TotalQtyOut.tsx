import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ArrayDeleteAndPrintState {
    items: string;
}

const initialState: ArrayDeleteAndPrintState = {
    items: ''
};

// eslint-disable-next-line react-refresh/only-export-components
const TotalQtyOut = createSlice({
    name: 'TotalQtyOut',
    initialState,
    reducers: {
        addTotalQtyOut: (state, action: PayloadAction<string>) => {
            state.items = action.payload;
        },
        clearTotalQtyOut: (state) => {
            state.items = '';
        },
        congTotalQtyOut: (state, action: PayloadAction<string>) => {
            state.items += action.payload;
        },
    }
})
export const { addTotalQtyOut, clearTotalQtyOut,congTotalQtyOut} = TotalQtyOut.actions;

export default TotalQtyOut.reducer;