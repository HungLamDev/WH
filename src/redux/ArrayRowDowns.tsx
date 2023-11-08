import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Stamp {
    Arrival_QTY: number,
    Barcode: string,
    Color: string,
    Label_Status: string,
    Log_Material_Label_Serial: string,
    Material_Label_Serial: string,
    Material_Name: string,
    Material_No: string,
    Material_Type: string,
    Modify_Date: string,
    Order_No: string,
    Print_Date: string,
    Print_QTY: string,
    Print_Times: number,
    Production: string,
    Program_Log: string,
    QTY: number,
    Roll: string,
    Size: string,
    Supplier: string,
    Supplier_No: string,
    Total_Qty: number,
    Unit: string,
    User_Serial_Key: string,
    Work_Order: string
}

interface ArrayRowDownState {
    items: any[];
}

const initialState: ArrayRowDownState = {
    items: []
};

// eslint-disable-next-line react-refresh/only-export-components
const ArrayRowDowns = createSlice({
    name: 'ArrayRowDowns',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<any>) => {
            state.items.push(action.payload);
        },
        copyValues: (state, action: PayloadAction<any[]>) => {
            state.items = [...action.payload];
        },
        removeItemByBarcode: (state, action: PayloadAction<string>) => {
            const barcodeToRemove = action.payload;
            state.items = state.items.filter(item => item.Barcode !== barcodeToRemove);
        },
        clearArrayRowDowns: (state) => {
            state.items = [];
        }
    }
})
export const { addItem, copyValues,removeItemByBarcode,clearArrayRowDowns } = ArrayRowDowns.actions;

export default ArrayRowDowns.reducer;