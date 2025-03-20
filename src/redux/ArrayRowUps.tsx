import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';


interface ArrayRowUpInterface {
    _id: number,
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

interface ArrayRowUpsState {
    items: any[];
}

const initialState: ArrayRowUpsState = {
    items: []
};

// eslint-disable-next-line react-refresh/only-export-components
const ArrayRowUps = createSlice({
    name: 'ArrayRowUps',
    initialState,
    reducers: {
        addItemRowUps: (state, action: PayloadAction<any>) => {
            state.items.push(action.payload);
        },
        copyValuesRowUps:  (state, action: PayloadAction<any[]>) => {
            state.items = [...action.payload];
        },
        removeItemByBarcodeRowUps: (state, action: PayloadAction<string>) => {
            const barcodeToRemove = action.payload;
            state.items = state.items.filter(item => item.Barcode !== barcodeToRemove);
        },
        clearArrayRowUps: (state) => {
            state.items = [];
        },
        changeItemsByBarcodeArrayRowUps: (state, action: PayloadAction<{ barcodes: any[], modifyDate: any, Work_Order: any }>) => {
            const { barcodes, modifyDate, Work_Order } = action.payload;

            barcodes.forEach(barcode => {
                // Tìm phần tử có barcode tương ứng trong mảng
                const itemIndex = state.items.findIndex(item => item.Barcode === barcode);

                if (itemIndex !== -1) {
                    // Nếu tìm thấy phần tử, thay đổi Modify_Date của nó thành giá trị được truyền vào
                    state.items[itemIndex].ngay = moment(modifyDate).format("YYYY-MM-DD");
                    state.items[itemIndex].Work_Order = Work_Order;
                }
            });
        },
        changeItemsArrayRowUps: (state, action: PayloadAction<{ barcodes: any[] , modifyDate: any, Work_Order: any }>) => {
            const { barcodes,modifyDate, Work_Order } = action.payload;

            barcodes.forEach(barcode => {
                // Tìm phần tử có barcode tương ứng trong mảng
                const itemIndex = state.items.findIndex(item => item.Barcode === barcode);

                if (itemIndex !== -1) {
                    // Nếu tìm thấy phần tử, thay đổi Modify_Date của nó thành giá trị được truyền vào
                    state.items[itemIndex].Print_Date = moment(modifyDate).format("YYYY-MM-DD");
                    state.items[itemIndex].ngay = moment(modifyDate).format("DD/MM/YYYY");
                    state.items[itemIndex].Work_Order = Work_Order;
                }
            });
        },
    }
})
export const { addItemRowUps, copyValuesRowUps, removeItemByBarcodeRowUps, clearArrayRowUps, changeItemsByBarcodeArrayRowUps, changeItemsArrayRowUps } = ArrayRowUps.actions;

export default ArrayRowUps.reducer;