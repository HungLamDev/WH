import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface ArrayDeliverySapmleLeftState {
    deliverys: any[];
}

const initialState: ArrayDeliverySapmleLeftState = {
    deliverys: []
};

// eslint-disable-next-line react-refresh/only-export-components
const ArrayDeliverySapmleLeft = createSlice({
    name: 'ArrayDeliverySapmleLeft',
    initialState,
    reducers: {
        addArrayDeliverySapmleLeft: (state, action: PayloadAction<any>) => {
            state.deliverys.push(action.payload);
        },
        copyArrayDeliverySapmleLeft: (state, action: PayloadAction<any[]>) => {
            state.deliverys = [...action.payload];
        },
        clearArrayDeliverySapmleLeft: (state) => {
            state.deliverys = [];
        },
        updateArrayDeliverySapmleLeftRY_Status1ByMaterialNo: (state, action: PayloadAction<{ materialNo: string, newStatus: any }>) => {
            const { materialNo, newStatus } = action.payload;
            const foundItem = state.deliverys.find((item) => item.Material_No === materialNo);
            if (foundItem) {
                foundItem.RY_Status1 = newStatus;
            }
        },
        updateArrayDeliverySapmleLeftRY_Status2ByMaterialNo: (state, action: PayloadAction<{ materialNo: string, RY: string , newStatus: any }>) => {
            const { materialNo, RY, newStatus } = action.payload;
            const foundItem = state.deliverys.find((item) => item.Material_No === materialNo && item.RY === RY );
            if (foundItem) {
                foundItem.RY_Status2 = newStatus;
            }
        },
        doublelickArrayDeliverySapmleLeftOrderNo: (state, action: PayloadAction<{ orderNo: string, RY: string , newStatus: any }>) => {
            const { orderNo, RY, newStatus } = action.payload;
            const foundItem = state.deliverys.find((item) => item.Num_No === orderNo && item.RY === RY );
            if (foundItem) {
                foundItem.RY = newStatus[0].RY;
                foundItem.Num_No = newStatus[0].Num_No
            }
        },
    }
})
export const { addArrayDeliverySapmleLeft, copyArrayDeliverySapmleLeft, clearArrayDeliverySapmleLeft,updateArrayDeliverySapmleLeftRY_Status1ByMaterialNo, updateArrayDeliverySapmleLeftRY_Status2ByMaterialNo, doublelickArrayDeliverySapmleLeftOrderNo } = ArrayDeliverySapmleLeft.actions;

export default ArrayDeliverySapmleLeft.reducer;