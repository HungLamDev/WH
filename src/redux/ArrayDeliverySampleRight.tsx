import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface ArrayDeliverySapmleRightState {
    deliverys: any[];
}

const initialState: ArrayDeliverySapmleRightState = {
    deliverys: []
};

// eslint-disable-next-line react-refresh/only-export-components
const ArrayDeliverySapmleRight = createSlice({
    name: 'ArrayDeliverySapmleRight',
    initialState,
    reducers: {
        addArrayDeliverySapmleRight: (state, action: PayloadAction<any>) => {
            state.deliverys.push(action.payload);
        },
        copyArrayDeliverySapmleRight: (state, action: PayloadAction<any[]>) => {
            state.deliverys = [...action.payload];
        },
        clearArrayDeliverySapmleRight: (state) => {
            state.deliverys = [];
        },
        updateArrayDeliverySapmleRightRY_Status1ByMaterialNo: (state, action: PayloadAction<{ materialNo: string, newStatus: any }>) => {
            const { materialNo, newStatus } = action.payload;
            const foundItem = state.deliverys.find((item) => item.Material_No === materialNo);
            if (foundItem) {
                foundItem.RY_Status1 = newStatus;
            }
        },
        updateArrayDeliverySapmleRightRY_Status2ByMaterialNo: (state, action: PayloadAction<{ materialNo: string, RY: string , newStatus: any }>) => {
            const { materialNo, RY, newStatus } = action.payload;
            const foundItem = state.deliverys.find((item) => item.Material_No === materialNo && item.RY === RY );
            if (foundItem) {
                foundItem.RY_Status2 = newStatus;
            }
        },
        doublelickArrayDeliverySapmleRightOrderNo: (state, action: PayloadAction<{ orderNo: string, RY: string , newStatus: any }>) => {
            const { orderNo, RY, newStatus } = action.payload;
            const foundItem = state.deliverys.find((item) => item.Num_No === orderNo && item.RY === RY );
            if (foundItem) {
                foundItem.RY = newStatus[0].RY;
                foundItem.Num_No = newStatus[0].Num_No
            }
        },
    }
})
export const { addArrayDeliverySapmleRight, copyArrayDeliverySapmleRight, clearArrayDeliverySapmleRight,updateArrayDeliverySapmleRightRY_Status1ByMaterialNo, updateArrayDeliverySapmleRightRY_Status2ByMaterialNo, doublelickArrayDeliverySapmleRightOrderNo } = ArrayDeliverySapmleRight.actions;

export default ArrayDeliverySapmleRight.reducer;