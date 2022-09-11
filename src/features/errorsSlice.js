import { createSlice } from "@reduxjs/toolkit"

const errorSlice = createSlice({
    name: 'errors',
    initialState: {
        data: {}
    },
    reducers: {
        setErrors: (state, {payload}) => {
            state.data = payload
        }
    }
});

export const { setErrors } = errorSlice.actions

export default errorSlice.reducer
