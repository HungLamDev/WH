import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface ArrayInventoryState {
    deliverys: any[];
}

const initialState: ArrayInventoryState = {
    deliverys: []
};

// eslint-disable-next-line react-refresh/only-export-components
const ArrayInventory = createSlice({
    name: 'ArrayInventory',
    initialState,
    reducers: {
        addArrayInventory: (state, action: PayloadAction<any>) => {
            state.deliverys.push(action.payload);
        },
        copyArrayInventory: (state, action: PayloadAction<any[]>) => {
            state.deliverys = [...action.payload];
        },
        clearArrayInventory: (state) => {
            state.deliverys = [];
        },
        updateRY_Status1ByMaterialNo: (state, action: PayloadAction<{ materialNo: string, newStatus: any }>) => {
            const { materialNo, newStatus } = action.payload;
            const foundItem = state.deliverys.find((item) => item.Material_No === materialNo);
            if (foundItem) {
                foundItem.RY_Status1 = newStatus;
            }
        },
        updateRY_Status2ByMaterialNo: (state, action: PayloadAction<{ materialNo: string, RY: string , newStatus: any }>) => {
            const { materialNo, RY, newStatus } = action.payload;
            const foundItem = state.deliverys.find((item) => item.Material_No === materialNo && item.RY === RY );
            if (foundItem) {
                foundItem.RY_Status2 = newStatus;
            }
        },
        doublelickOrderNo: (state, action: PayloadAction<{ orderNo: string, RY: string , newStatus: any }>) => {
            const { orderNo, RY, newStatus } = action.payload;
            const foundItem = state.deliverys.find((item) => item.Num_No === orderNo && item.RY === RY );
            if (foundItem) {
                foundItem.RY = newStatus[0].RY;
                foundItem.Num_No = newStatus[0].Num_No
            }
        },
    }
})
export const { addArrayInventory, copyArrayInventory, clearArrayInventory,updateRY_Status1ByMaterialNo,updateRY_Status2ByMaterialNo,doublelickOrderNo } = ArrayInventory.actions;

export default ArrayInventory.reducer;