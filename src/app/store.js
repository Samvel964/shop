import { configureStore } from "@reduxjs/toolkit";
import errorsReducer from "../features/errorsSlice";
import userReducer from "../features/userSlice";
import styleReducer from "../features/styleSlice";
import loaderReducer from "../features/loaderSlice";

export default configureStore({
    reducer: {
        errors: errorsReducer,
        user: userReducer,
        style: styleReducer,
        loader: loaderReducer,
    }
});
