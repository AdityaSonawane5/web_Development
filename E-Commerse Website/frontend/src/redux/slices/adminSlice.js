// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // fech all user (admin only )
// export const fetchUsers = createAsyncThunk("admin/fetchUsers",async()=>{
//     const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
//         {
//             headers:{Authorization:`Bearer ${localStorage.getItem("usersToken")}`},
//         }
//     );
//     response.data;
// });

// // Add the create user action
// export const addUser = createAsyncThunk("admin/addUser",async (userData,{rejectWithValue})=>{
//     try {
//         const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,userData,
//             {
//                 headers:{
//                     Authorization: `Bearer ${localStorage.getItem("userToken")}`
//                 },
//             }
//         );
//         return response.data;
//     } catch (error) {
//         return rejectWithValue(error.response.data);
//     }
// });


// // Update user info
// export const updateUser = createAsyncThunk("admin/updateUser",
//     async ({id,name,email,role})=>{
//         const response = await axios.put(
//             `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,{name,email,role},
//             {
//                 headers:{
//                     Authorization:`Bearer ${localStorage.getItem("userToken")}`,
//                 },
//             }
//         );
//         response.data;
//     }
// );


// // Delete a User
// export const deleteUser = createAsyncThunk("admin/deleteUser",async (id)=>{
//     await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
//         {
//             headers:{
//                 Authorization:`Bearer ${localStorage.getItem("userToken")}`,

//             }
//         }
//     );
//     return id;
// });

// const adminSlice = createAsyncThunk({
//     name:"admin",
//     initialState:{
//         users:[],
//         loading:false,
//         error:null,
//     },
//     reducer:{},
//     extraReducers:(builder)=>{
//         builder
//         .addCase(fetchUsers.pending,(state)=>{
//             state.loading = true
//         })
//         .addCase(fetchUsers.fulfilled,(state,action)=>{
//             state.loading = false
//             state.user=action.plyload
//         })
//         .addCase(fetchUsers.rejected,(state,action)=>{
//             state.loading = false;
//             state.error=action.error.message
//         })
//         .addCase(updateUser.fulfilled,(state,action)=>{
//             const updatedUser = action.plyload;
//             const userIndex = state.users.findIndex(
//                 (user)=>user._id===updatedUser._id
//             );
//             if(userIndex !== -1){
//                 state.users[userIndex] = updatedUser;
//             }
//         })
//         .addCase(deleteUser.fulfilled,(state,action)=>{
//             state.users=state.users.filter((user)=>user._id != action.plyload);
//         })
//         .addCase(addUser.pending,(state)=>{
//             state.loading = true;
//             state.error = null;
//         })
//         .addCase(addUser.fulfilled,(state,action)=>{
//             state.loading = false;
//             state.users.push(action.plyload.user); //add  a new users to the state 
//         })
//         .addCase(addUser.rejected,(state,action)=>{
//             state.loading = false;
//             state.error = action.payload.message;
//         })
        
//     }
// });

// export default adminSlice.reducer;






import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all users (admin only)
export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
    });
    return response.data;
});

// Add user
export const addUser = createAsyncThunk("admin/addUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`, userData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

// Update user
export const updateUser = createAsyncThunk("admin/updateUser", async ({ id, name, email, role }) => {
    const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
        { name, email, role },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        }
    );
    return response.data;
});

// Delete user
export const deleteUser = createAsyncThunk("admin/deleteUser", async (id) => {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
    });
    return id;
});

// Slice
const adminSlice = createSlice({
    name: "admin",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const updatedUser = action.payload;
                const index = state.users.findIndex((user) => user._id === updatedUser._id);
                if (index !== -1) {
                    state.users[index] = updatedUser;
                }
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter((user) => user._id !== action.payload);
            })
            .addCase(addUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload.user);
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Something went wrong";
            });
    },
});

export default adminSlice.reducer;
