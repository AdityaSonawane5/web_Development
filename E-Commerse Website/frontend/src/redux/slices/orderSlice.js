import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Async Thunk to fech user order
export const fetchUserOrders=createAsyncThunk("order/fetchUserOrders",async(__DO_NOT_USE__ActionTypes,
    {rejectWithValue})=>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`,
                {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to fetch order details by ID
export const fetchOrderDetails = createAsyncThunk("order/fetchOrderDetails",async (orderId,{rejectWithValue})=>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`,
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("userToken")}`
                },
            }
        );
        return response.data;
    } catch (error) {
        rejectWithValue(error.response.data)
    }
});

const orderSlice= createSlice({
    name:"order",
    initialState:{
        orders:[],
        totalOrders:0,
        orderDetails:null,
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        //Fetch user order
        .addCase(fetchUserOrders.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchUserOrders.fulfilled, (state,action)=>{
            state.loading=false;
            state.orders=action.payload;
        })
        .addCase(fetchUserOrders.rejected, (state,action)=>{
            state.loading=false;
            state.error=action.payload.message;
        })
        //Fetch order details
        .addCase(fetchOrderDetails.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchOrderDetails.fulfilled, (state,action)=>{
            state.loading=false;
            state.orderDetails=action.payload;
        })
        .addCase(fetchOrderDetails.rejected, (state,action)=>{
            state.loading=false;
            state.error=action.payload.message;
        })
    }
})
export default orderSlice.reducer;
