import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface ArrayAccountingCardMaterialState {
  items: any[];
}

const initialState: ArrayAccountingCardMaterialState = {
  items: [],
};

// eslint-disable-next-line react-refresh/only-export-components
const ArrayAccountingCardMaterial = createSlice({
  name: "ArrayAccountingCardMaterial",
  initialState,
  reducers: {
    copyValuesAccountingCardMaterial: (state, action: PayloadAction<any[]>) => {
      state.items = action.payload;
    },
    clearAccountingCardMaterial: (state) => {
      state.items = [];
    },
  },
});
export const { copyValuesAccountingCardMaterial, clearAccountingCardMaterial } = ArrayAccountingCardMaterial.actions;

export default ArrayAccountingCardMaterial.reducer;
