import { createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
// Async Thunk to Fesch Products by Vollection and optional Filters
export const fetchProductsByFilters=createAsyncThunk("products/fetchByFilters", 
    async({
        collections,
        size,
        color,
        gender,
        miniPrice,
        maxprice,
        sortBy,
        search,
        category,
        material,
        brand,
        limit,
    })=>{
        const query = new URLSearchParams();
        if (collections) query.append("collections",collections);
        if (size) query.append("size",size);
        if (color) query.append("color",color);
        if (gender) query.append("gender",gender);
        if (miniPrice) query.append("miniPrice",miniPrice);
        if (maxprice) query.append("maxprice",maxprice);
        if (sortBy) query.append("sortBy",sortBy);
        if (search) query.append("search",search);
        if (category) query.append("category",category);
        if (material) query.append("material",material);
        if (brand) query.append("brand",brand);
        if (limit) query.append("limit",limit);

        const response =await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`
        );
        return response.data;
    }

);


// Asyn thunk to feach a singele product by ID
export const fetchProductDetails = createAsyncThunk(
    "products/fetchProductDetails",
    async (id)=>{
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
        );
        return response.data;
    }
);



// Async thunk to fetch similar products
export const updateProduct = createAsyncThunk("products/updateProduct",async ({id,productData})=>{
    const responce=await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products${id}`,productData,
        // import.meta.env.VITE_BACKEND_URL}/api/products/best-seller
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
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`

    );
    return response.data;
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
            collections:"",

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
            collections:"",
            };
        },
    },

    extraReducers:(builder)=>{
        builder
        //handle fetching products with filter
        .addCase(fetchProductsByFilters.pending, (state)=>{
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
        .addCase(fetchProductDetails.pending, (state)=>{
            state.loading=true
            state.error=null

        })
        .addCase(fetchProductDetails.fulfilled,(state,action)=>{
            state.loading = false;
            state.selectedProduct= action.payload

        })
        .addCase(fetchProductDetails.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.error.message; 
        })
        // Handle fetchig single product details
        .addCase(updateProduct.pending, (state)=>{
            state.loading=true
            state.error=null

        })
        .addCase(updateProduct.fulfilled,(state,action)=>{
            state.loading= false;
            const updatedProduct= action.payload;
            const index = state.products.findIndex((product) => product._id === updatedProduct._id);
            if(index!=-1){
                state.products[index]=updatedProduct
            }
        })
        .addCase(updateProduct.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.error.message; 
        }) 
        .addCase(fetchSimilarProducts.pending,(state)=>{
            state.loading=true
            state.error=null

        })
        .addCase(fetchSimilarProducts.fulfilled,(state,action)=>{
            state.loading= false;
            state.similarProducts= action.payload;
        })
        .addCase(fetchSimilarProducts.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.error.message; 
        }) 
    }
});


export const {setFilter,clearFilters}=productsSlice.actions;
export default productsSlice.reducer;


