import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`

const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`;
// async thuck to fetch admin products
export const fetchAdminPRoducts = createAsyncThunk(
    "adminProducts/fetchProducts",
    async () => {
        const response = await axios.get(`${API_URL}/api/admin/products`, {
            headers: {
                Authorization: USER_TOKEN,
            },
        });
        return response.data;
    }
);


// async fuction to create a new product
export const createProduct = createAsyncThunk("adminProducts/createProduct",
    async (productData) => {
        const response = await axios.post(
            `${API_URL}/api/admin/products`,
            productData,
            {
                headers: {
                    Authorization: USER_TOKEN,
                },
            }
        );
        return response;
    }
);


// async thunk to update an existing products
export const updateProducts = createAsyncThunk("adminProducts/updateProducts",
    async ({ id, productData }) => {
        const response = await axios.put(`${API_URL}/api/admin/products/${id}`, productData,
            {
                headers: {
                    Authorization: USER_TOKEN,
                },
            }
        );
        return response.data
    }
);

//async thunk to detele a product
export const deleteProduct = createAsyncThunk("adminProducts/deleteProduct", async (id) => {
    await axios.delete(`${API_URL}/api/product/${id}`, {
        headers: { Authorization: USER_TOKEN }
    });
    return id;
})

const adminProductSlice = createSlice({
    name: "adminProducts",
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminPRoducts.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchAdminPRoducts.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload;
            })
            .addCase(fetchAdminPRoducts.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // create Product
            // .addCase(updateProducts.fulfilled,(state,action)=>{
            //     const index =state.products.fulfilled(
            //         (product)=> product._id === action.payload._id
            //     ); 
            //     if(index !== -1){
            //         state.product[index]=action.payload;
            //     }
            // })
            .addCase(updateProducts.fulfilled, (state, action) => {
                const index = state.products.findIndex(product => product._id === action.payload._id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })

            //Delete Product
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(
                    (product) => product._id !== action.payload
                );
            });
    },
});

export default adminProductSlice.reducer;