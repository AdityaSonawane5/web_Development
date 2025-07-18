import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import productReducer from "./slices/ProductsSlice";
import cartReducer from "./slices/CartSlice"
import checkoutReducer from "./slices/checkoutSlice"
import orderReducer from "./slices/orderSlice"
import adminReducer from "./slices/adminSlice";
import adminProductReducer from "./slices/adminProductSlice";
import adminOrdersReducer from "./slices/adminOrderSlice";

const store = configureStore({
    reducer: {
        auth:authReducer,
        products:productReducer,
        cart:cartReducer,
        checkout:checkoutReducer,
        orders:orderReducer,
        admin:adminReducer,
        adminProducts:adminProductReducer,
        adminOrders:adminOrdersReducer
    },
    // auth:authReducer,
});

export default store;
//13:38:00 timestamp