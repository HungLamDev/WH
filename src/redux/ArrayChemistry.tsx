import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Chemistry {
  Arr_Material: string;
  Data_Material_Delivery_Serial: string;
  Date_Count: string;
  Date_I_O: string;
  Date_Out: string;
  Date_Out2: string;
  Img_DF: string;
  Material_Name: string;
  Material_No: string;
  Note_Account: string;
  Order_No: string;
  Order_No_In: string;
  Order_No_In1: string;
  Order_No_In2: string;
  Order_No_In3: string;
  Order_No_In5: string;
  Order_No_In6: string;
  Order_No_Out: string;
  Order_No_Out1: string;
  Qty_Out: string;
  Qty_Redundant: string;
  RY: string;
  Sign: string;
  Unit: string;
  Value_Date_Card: string;
  Value_Material_Name: string;
  Value_Material_No: string;
  Value_Unit_Card: string;
}

interface ArrayChemistryState {
  items: any[];
}

const initialState: ArrayChemistryState = {
  items: [],
};

// eslint-disable-next-line react-refresh/only-export-components
const ArrayChemistry = createSlice({
  name: "ArrayChemistry",
  initialState,
  reducers: {
    editItem: (state, action: PayloadAction<any>) => {
      const indexToUpdate = state.items.findIndex(
        (item) => item._id === action.payload._id
      );
      if (indexToUpdate !== -1) {
        state.items[indexToUpdate] = action.payload;
      }
    },
    copyValues: (state, action: PayloadAction<any[]>) => {
      state.items = action.payload;
    },
    clearChemistry: (state) => {
      state.items = [];
    }
  },
});
export const { editItem, copyValues, clearChemistry } = ArrayChemistry.actions;

export default ArrayChemistry.reducer;
