import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";
import axios from "axios";

// helper fuction to lead cart from localstroage
const localCartFromStoage = () => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : { products: [] };
};


// Helper function to save cart to localStorage
const saveCartToStorage = (cart) => {
    // localCartFromStoage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("cart", JSON.stringify(cart));

};

// Feach cart for a user or guest 
export const feachCart = createAsyncThunk(
    "cart/fechCart",
    async ({ userId, guestId }, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                {
                    params: { userId, guestId }
                }
            )
            return response.data
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);


// //Add an item  to the cart for a user or guest 
// export const addToCart = createAsyncThunk("cart/addToCart", async ({ productId, sizes, colors,
//     guestId, userId }, { rejectWithValue }) => {
//     try {
//         const response  = await axios.post(
//             `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
//             {
//                 productId,
//                 quantity,
//                 sizes,
//                 colors,
//                 guestId,
//                 userId
//             }
//         );
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response.data);

//     }
// });


export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ productId, quantity, sizes, colors, guestId, userId },
        { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
                productId,
                quantity,
                sizes,
                colors,
                guestId,
                userId
            });
            return response.data;
        } catch (error) {
            console.error("Add to Cart Error:", error.response?.data);
            return rejectWithValue(error.response?.data || { message: "Unknown error" });
        }
    }
);



//Update the quality of an items in the cart 
export const updateCartItemQuantity = createAsyncThunk("cart/updateCartItemQuantity", async ({ productId, sizes, colors, userId, guestId },
    { rejectWithValue }) => {
    try {
        const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
            {
                productId,
                quantity,
                guestId,
                userId,
                sizes,
                colors
            }
        );
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
}
);

// productId, sizes, colors


//Remove an item from the cart 
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async ({ productId, guestId,
    userId, sizes, colors }, { rejectWithValue }) => {
    try {
        const response = await axios({
            method: "DELETE",
            url: `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
            data: { productId, guestId, userId, sizes, colors },
        });
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});


// Merge guest cart into user cart
export const mergeCart = createAsyncThunk("cart/mergeCart", async ({ guestId, user }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
            { guestId, user },
            {
                headers: {
                    // Authorization: `Bearer ${localCartFromStoage.getItem("userToken")}`
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`

                },
            }
        );
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: localCartFromStoage(),
        loading: false,
        error: null,
    },
    reducers: {
        clearCart: (state) => {
            state.cart = { products: [] };
            localStorage.removeItem("cart");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(feachCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(feachCart.fulfilled, (state, action) => {
                // state.loading = false;
                // state.cart = action.payload;
                // saveCartToStorage(action.payload);
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);

            })
            .addCase(feachCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch cart";
            })
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                // state.loading = false;
                // state.cart = action.payload;
                // saveCartToStorage(action.payload);
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);

            })
            // .addCase(addToCart.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload?.message || "Failed to add to cart";
            // })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to add to cart";
                })
            .addCase(updateCartItemQuantity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
                // state.loading = false;
                // state.cart = action.payload;
                // saveCartToStorage(action.payload);
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);

            })
            .addCase(updateCartItemQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to update item quantity";
            })
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                // state.loading = false;
                // state.cart = action.payload;
                // saveCartToStorage(action.payload);
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);

            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to remove items";
            })
            .addCase(mergeCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(mergeCart.fulfilled, (state, action) => {
                // state.loading = false;
                // state.cart = action.payload;
                // saveCartToStorage(action.payload);
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);

            })
            .addCase(mergeCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to merge cart";
            });
    }
});

// export const {clesrCart} = cartSlice.actions;
// export default cartSlice.reducer;
export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
