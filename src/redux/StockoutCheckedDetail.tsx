import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StockoutDetailCheckedState {
  items: any[];
}

const initialState: StockoutDetailCheckedState = {
  items: []
};

// eslint-disable-next-line react-refresh/only-export-components
const StockoutDetailChecked = createSlice({
  name: 'StockoutDetailChecked',
  initialState,
  reducers: {
    addStockoutDetailChecked: (state, action: PayloadAction<any>) => {
      state.items.push(action.payload);
    },
    removeStockoutDetailChecked: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex(item => item.id === action.payload);
      if(index !== -1) {
        state.items.splice(index, 1);
      }
    },
    clearStockoutDetailChecked: (state) => {
      state.items = [];
    },
    copyStockoutDetailChecked: (state, action: PayloadAction<any[]>) => {
        state.items = action.payload;
    },
  }
});

export const { addStockoutDetailChecked, removeStockoutDetailChecked, clearStockoutDetailChecked,copyStockoutDetailChecked } = StockoutDetailChecked.actions;
export default StockoutDetailChecked.reducer;