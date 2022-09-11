import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
    name: 'loader',
    initialState: {
        data: {
            showloader: false,
        }
    },
    reducers: {
        setLoader: (state,{ payload }) => {
            state.data = payload
        }
    }
});

export const { setLoader } = loaderSlice.actions

export default loaderSlice.reducer
