import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: {}
    },
    reducers: {
        setUserData:(state,{payload}) => {
            state.data = payload
            localStorage.setItem('user-token','Bearer ' + payload.token);
        }
    }
})

export const { setUserData } = userSlice.actions

export default userSlice.reducer
