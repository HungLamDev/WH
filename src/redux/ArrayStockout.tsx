import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ArrayStockoutState {
    items: any[];
}

const initialState: ArrayStockoutState = {
    items:  []
};

// eslint-disable-next-line react-refresh/only-export-components
const ArrayStockout = createSlice({
    name: 'ArrayStockout',
    initialState,
    reducers: {
        addItemArrayStockout: (state, action: PayloadAction<any>) => {
            state.items.push(action.payload);
        },
        clearArrayStockout: (state) => {
            state.items = [];
        },
        removeArrayStockoutByBarcode: (state, action: PayloadAction<string>) => {
            const barcodeToRemove = action.payload;
            state.items = state.items.filter(item => item.Barcode !== barcodeToRemove);
        },
        copyValuesArrayStockout: (state, action: PayloadAction<any[]>) => {
            state.items = action.payload;
        },
        updateColorArrayStockout: (state, action: PayloadAction<{ barcode: any, value: any }>) => {
            const { barcode, value } = action.payload;
            const itemIndex = state.items.findIndex(item => item.Barcode === barcode);
            state.items[itemIndex].Color = value
        }
    }
})

export const { addItemArrayStockout,clearArrayStockout,removeArrayStockoutByBarcode,copyValuesArrayStockout, updateColorArrayStockout } = ArrayStockout.actions;

export default ArrayStockout.reducer;