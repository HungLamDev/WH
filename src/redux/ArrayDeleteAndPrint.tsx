import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

interface ArrayDeleteAndPrintState {
    items: any[];
}

const initialState: ArrayDeleteAndPrintState = {
    items: []
};

// eslint-disable-next-line react-refresh/only-export-components
const ArrayDeleteAndPrint = createSlice({
    name: 'ArrayDeleteAndPrint',
    initialState,
    reducers: {
        copyValuesArrayDeleteAndPrint: (state, action: PayloadAction<any[]>) => {
            state.items = [...action.payload];
        },
        removeItemByBarcodeArrayDeleteAndPrint: (state, action: PayloadAction<string>) => {
            const barcodeToRemove = action.payload;
            state.items = state.items.filter(item => item.Barcode !== barcodeToRemove);
        },
        clearArrayDeleteAndPrint: (state) => {
            state.items = [];
        },
        changeItemsByBarcodeArrayDeleteAndPrint: (state, action: PayloadAction<{ barcodes: any[], modifyDate: any }>) => {
            const { barcodes, modifyDate } = action.payload;
            
            barcodes.forEach(barcode => {
              // Tìm phần tử có barcode tương ứng trong mảng
              const itemIndex = state.items.findIndex(item => item.Barcode === barcode);
          
              if (itemIndex !== -1) {
                // Nếu tìm thấy phần tử, thay đổi Modify_Date của nó thành giá trị được truyền vào
                state.items[itemIndex].ngay = moment(modifyDate).format("DD/MM/YYYY");
              }
            });
          },
    }
})
export const { copyValuesArrayDeleteAndPrint, removeItemByBarcodeArrayDeleteAndPrint, clearArrayDeleteAndPrint, changeItemsByBarcodeArrayDeleteAndPrint} = ArrayDeleteAndPrint.actions;

export default ArrayDeleteAndPrint.reducer;