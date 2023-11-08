import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ArrayAccountingCardState {
    items: any;
}

const initialState: ArrayAccountingCardState = {
    items: {}
};

// eslint-disable-next-line react-refresh/only-export-components
const ArrayAccountingCard = createSlice({
    name: 'ArrayAccountingCard',
    initialState,
    reducers: {
        copyArrayAccountingCard: (state, action: PayloadAction<any>) => {
            state.items = action.payload;
        },
    }
})

export const { copyArrayAccountingCard } = ArrayAccountingCard.actions;

export default ArrayAccountingCard.reducer;