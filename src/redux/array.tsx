import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface MaterialTableState {
  items: any[];
}

const initialState: MaterialTableState = {
  items: []
};

// eslint-disable-next-line react-refresh/only-export-components
const MaterialTable = createSlice({
  name: 'MaterialTable',
  initialState,
  reducers: {
    addItemMaterialTable: (state, action: PayloadAction<any>) => {
      state.items.push(action.payload);
    },
    removeItemMaterialTable: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex(item => item.id === action.payload);
      if(index !== -1) {
        state.items.splice(index, 1);
      }
    },
    clearItemsMaterialTable: (state) => {
      state.items = [];
    }
  }
});

export const { addItemMaterialTable, removeItemMaterialTable, clearItemsMaterialTable } = MaterialTable.actions;
export default MaterialTable.reducer;