import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MaterialTableChecked {
  items: any[];
}

const initialState: MaterialTableChecked = {
  items: []
};

// eslint-disable-next-line react-refresh/only-export-components
const MaterialTableChecked = createSlice({
  name: 'MaterialTableChecked',
  initialState,
  reducers: {
    addItemMaterialTableChecked: (state, action: PayloadAction<any>) => {
      state.items.push(action.payload);
    },
    removeItemMaterialTableChecked: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex(item => item.id === action.payload);
      if(index !== -1) {
        state.items.splice(index, 1);
      }
    },
    clearItemsMaterialTableChecked: (state) => {
      state.items = [];
    },
    copyItemsMaterialTableChecked: (state, action: PayloadAction<any[]>) => {
        state.items = action.payload;
    },
  }
});

export const { addItemMaterialTableChecked, removeItemMaterialTableChecked, clearItemsMaterialTableChecked,copyItemsMaterialTableChecked } = MaterialTableChecked.actions;
export default MaterialTableChecked.reducer;