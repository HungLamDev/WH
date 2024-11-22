import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface UserERP {
    user: any [];
}

const initialState: UserERP = {
    user: []
};

// eslint-disable-next-line react-refresh/only-export-components
const UserERP = createSlice({
    name: 'UserERP',
    initialState,
    reducers: {
        addUserERP: (state, action: PayloadAction<any[]>) => {
            state.user = action.payload;
        },
        clearUserERP: (state) => {
            state.user = [];
        },
    }
});

export const { addUserERP, clearUserERP } = UserERP.actions;
export default UserERP.reducer;