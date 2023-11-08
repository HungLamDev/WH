import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ArrayRowDowntoUpState{
    items: any;
}

const initialState: ArrayRowDowntoUpState = {
    items: []
};

// eslint-disable-next-line react-refresh/only-export-components
const ArrayRowDowntoUp = createSlice({
    name: 'ArrayRowDowntoUp',
    initialState,
    reducers: {
        addItemArrayRowDowntoUp: (state, action: PayloadAction<any>) => {
            state.items.push(action.payload);
        },
        copyValuesArrayRowDowntoUp: (state, action: PayloadAction<any[]>) => {
            state.items = action.payload;
        },
        clearArrayRowDowntoUp: (state) => {
            state.items = [];
        }
    }
})
export const { addItemArrayRowDowntoUp, copyValuesArrayRowDowntoUp,clearArrayRowDowntoUp } = ArrayRowDowntoUp.actions;

export default ArrayRowDowntoUp.reducer;