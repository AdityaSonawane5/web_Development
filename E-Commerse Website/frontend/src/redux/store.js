import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import productReducer from "./slices/authSlice";
import cartReducer from "./slices/CartSlice"
import checkoutReducer from "./slices/checkoutSlice"
const store = configureStore({
    reducer: {
        auth:authReducer,
        products:productReducer,
        cart:cartReducer,
        checkout:checkoutReducer,
    },
    auth:authReducer,
});

export default store;
