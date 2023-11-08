import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface ArrayDeliveryState {
    deliverys: any[];
}

const initialState: ArrayDeliveryState = {
    deliverys: []
};

// eslint-disable-next-line react-refresh/only-export-components
const ArrayDelivery = createSlice({
    name: 'ArrayDelivery',
    initialState,
    reducers: {
        addArrayDelivery: (state, action: PayloadAction<any>) => {
            state.deliverys.push(action.payload);
        },
        copyArrayDelivery: (state, action: PayloadAction<any[]>) => {
            state.deliverys = [...action.payload];
        },
        clearArrayDelivery: (state) => {
            state.deliverys = [];
        },
        updateRY_Status1ByMaterialNo: (state, action: PayloadAction<{ materialNo: string, newStatus: any }>) => {
            const { materialNo, newStatus } = action.payload;
            const foundItem = state.deliverys.find((item) => item.Material_No === materialNo);
            if (foundItem) {
                foundItem.RY_Status1 = newStatus;
            }
        },
        updateRY_Status1ByDelivery_Serial: (state, action: PayloadAction<{ DeliverySerial: string, newStatus: any }>) => {
            const { DeliverySerial, newStatus } = action.payload;
            const foundItem = state.deliverys.find((item) => item.Delivery_Serial === DeliverySerial);
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
        updateMaterialNo: (state, action: PayloadAction<{ _id: any,materialNo: string, newMaterialNo: any }>) => {
            const { _id,materialNo, newMaterialNo } = action.payload;
            const foundItem = state.deliverys.find((item) =>  item._id === _id  );
            if (foundItem) {
                foundItem.Material_No = newMaterialNo;
            }
        },
        updateMaterialName: (state, action: PayloadAction<{ _id: any, newMaterialName: any }>) => {
            const { _id, newMaterialName } = action.payload;
            const foundItem = state.deliverys.find((item) =>  item._id === _id  );
            if (foundItem) {
                foundItem.Material_Name = newMaterialName;
            }
        },
        updateContent: (state, action: PayloadAction<{ _id: any, newContent: any }>) => {
            const { _id, newContent } = action.payload;
            const foundItem = state.deliverys.find((item) =>  item._id === _id  );
            if (foundItem) {
                foundItem.RY_Status1 = newContent;
            }
        },

    }
})
export const { addArrayDelivery, copyArrayDelivery, clearArrayDelivery,updateRY_Status1ByMaterialNo,updateRY_Status2ByMaterialNo,doublelickOrderNo,updateMaterialNo, updateMaterialName,updateRY_Status1ByDelivery_Serial, updateContent } = ArrayDelivery.actions;

export default ArrayDelivery.reducer;