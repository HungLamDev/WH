import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface FOC {
    foc: any;
}

const initialState: FOC = {
    foc: false
};

// eslint-disable-next-line react-refresh/only-export-components
const FOC = createSlice({
    name: 'FOC',
    initialState,
    reducers: {
        addFOC: (state, action: PayloadAction<any>) => {
            state.foc = action.payload;
        },
        clearFOC: (state) => {
            state.foc = false;
        },
        
    }
});

export const { addFOC, clearFOC } = FOC.actions;
export default FOC.reducer;