import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Retrieve user info and token from localStorage if aviailble
const userFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

// check  for an existing guest ID is localstorege or generate a new One

// const initialGuestId = localStorage.getItem("guestId" || `guest_${new Date().getItem()}`);
// localStorage.setItem("guestId", initialGuestId);
const initialGuestId = localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", initialGuestId);


// Initial state
const initialState = {
    user: userFromStorage,
    guestId: initialGuestId,
    loading: false,
    error: null,

};


// Async Thunk for user Login
export const loginUser = createAsyncThunk("auth/loginUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, userData);
        localStorage.setItem("userInfo", JSON.stringify(response.data.user));
        localStorage.setItem("userToken", response.data.token);
        console.log(userData)
        return response.data.user; // Return the user object from the responce

    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});



// Async Thunk for user Register
export const registerUser = createAsyncThunk("auth/registerUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, userData);
        localStorage.setItem("userInfo", JSON.stringify(response.data.user));
        localStorage.setItem("userToken", response.data.token);
        console.log(response.data.user)
        return response.data.user; // Return the user object from the responce
        // console.log(response.data.user)

    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


// Slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.guestId = null;
            state.guestId = `guest_${new Date().getTime()}`; //Reset guest ID on logout
            localStorage.removeItem("userInfo");
            localStorage.removeItem("userToken");
            localStorage.setItem("guestId", state.guestId); //Set new Guest ID in localStorange 
        },
        generateNewGuessId: (state) => {
            state.guestId = `guest_${new Date().getTime()}`;
            localStorage.setItem("guestId", state.guestId);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.builder = false;
                state.error = action.payload.message;
            })
            .addCase(registerUser.pending, (state) => {
                state.builder = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.builder = false;
                state.user = action.payload.message;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.builder = false;
                state.error = action.payload.message;
            });
    }
});



export const { logout, generateNewGuessId } = authSlice.actions;
export default authSlice.reducer;
