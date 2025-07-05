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
export const updateProduct = createAsyncThunk("products/updateProduct",async ({id,productData})=>{
    const responce=await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products${id}`,productData,
        {
            headers:{
                Authorization:`Bearer ${localStorage.getItem("userToken")}`
            },
        }
    );
    return responce.data
});


// Async thunk to feach similar products
export const fetchSimilarProducts=createAsyncThunk("products/fetchSimilarProducts",async({id})=>{
    const responce = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`

    );
    return responce.data;
});


const productsSlice = createSlice({
    name:"products",
    initialState:{
        products:[],
        selectedProduct:null,//store the details of the single Products
        similarProducts:[],
        loading:false,
        error:null,
        filter:{
            category:"",
            size:"",
            color:"",
            gender:"",
            brand:"",
            miniPrice:"",
            maxprice:"",
            sortBy:"",
            search:"",
            material:"",
            collection:"",

        },
    },
    reducers:{
        setFilter:(state,action)=>{
            state.filter={...state.filter,...action.payload};
        },
        clearFilters:(state)=>{
            state.filter={
            category:"",
            size:"",
            color:"",
            gender:"",
            brand:"",
            miniPrice:"",
            maxprice:"",
            sortBy:"",
            search:"",
            material:"",
            collection:"",
            };
        },
    },

    extraReducers:(builder)=>{
        builder
        //handle fetching products with filter
        .add(fetchProductsByFilters.pending, (state)=>{
            state.loading=true
            state.error=null

        })
        .addCase(fetchProductsByFilters.fulfilled,(state,action)=>{
            state.loading= false;
            state.products=Array.isArray(action.payload) ? action.payload : [];

        })
        .addCase(fetchProductsByFilters.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.error.message; 
        })
        // Handle fetching single product details
        .add(feachPRoductDetails.pending, (state)=>{
            state.loading=true
            state.error=null

        })
        .addCase(feachPRoductDetails.fulfilled,(state,action)=>{
            state.loading = false;
            state.selectedProduct= action.payload

        })
        .addCase(feachPRoductDetails.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.error.message; 
        })
        // Handle fetchig single product details
        .add(updateProduct.pending, (state)=>{
            state.loading=true
            state.error=null

        })
        .addCase(updateProduct.fulfilled,(state,action)=>{
            state.loading= false;
            const updatedProduct= action.payload;
            const index = state.products.findIndex((product)=> product._id === updateProduct._id);
            if(index!=-1){
                state.product[index]=updatedProduct
            }
        })
        .addCase(updateProduct.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.error.message; 
        }) 
        .add(fetchSimilarProducts.pending, (state)=>{
            state.loading=true
            state.error=null

        })
        .addCase(fetchSimilarProducts.fulfilled,(state,action)=>{
            state.loading= false;
            state.product= action.payload;
        })
        .addCase(fetchSimilarProducts.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.error.message; 
        }) 
        

    }
});


export const {setFilter,clearFilters}=productsSlice.actions;
export default productsSlice.reducer;
// 12:33:03 timestamp
