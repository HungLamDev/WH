import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface UserLogin {
    user: any [];
}

const initialState: UserLogin = {
    user: []
};

// eslint-disable-next-line react-refresh/only-export-components
const UserLogin = createSlice({
    name: 'UserLogin',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<any[]>) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = [];
        },
    }
});

export const { addUser, clearUser } = UserLogin.actions;
export default UserLogin.reducer;