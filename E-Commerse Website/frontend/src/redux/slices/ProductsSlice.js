import { createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
// Async Thunk to Fesch Products by Vollection and optional Filters
export const fetchProductsByFilters=createAsyncThunk("products/fetchByFilters", 
    async({
        collection,
        size,
        color,
        gender,
        minPrice,
        maxprice,
        sortBy,
        search,
        category,
        material,
        brand,
        limit,
    })=>{
        const query = new URLSearchParams();
        if (collection) query.append("collection",collection);
        if (size) query.append("size",size);
        if (color) query.append("color",color);
        if (gender) query.append("gender",gender);
        if (minPrice) query.append("minPrice",minPrice);
        if (maxprice) query.append("maxprice",maxprice);
        if (sortBy) query.append("sortBysortBy",sortBy);
        if (search) query.append("search",search);
        if (category) query.append("category",category);
        if (material) query.append("material",material);
        if (brand) query.append("brand",brand);
        if (limit) query.append("limit",limit);

        const responce =await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`
        );
        return responce.data;
    }

);


// Asyn thunk to feach a singele product by ID
export const feachPRoductDetails = createAsyncThunk(
    "products/fetchProductDetails",
    async (id)=>{
        const responce = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products${id}`
        );
        return responce.data;
    }
);



// Async thunk to fetch similar products
export const updateProduct = createAsyncThunk("products")