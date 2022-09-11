import { createSlice } from "@reduxjs/toolkit";

const styleSlice = createSlice({
    name: 'style',
    initialState: {
        className: ''
    },
    reducers: {
        setClassName: (state, {payload}) => {
            state.className = payload
        }
    }
})

export const { setClassName, checkClassName } = styleSlice.actions

export default styleSlice.reducer
