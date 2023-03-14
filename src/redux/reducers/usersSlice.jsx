import { createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";
import axios from "axios";
import requests from "../../api/requests";

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        const response = await axios.get(requests.getUser);
        return response.data;
    } catch (error) {
        console.log(error);
    };
});

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: {},
        loading: 'idle',
        error: false
    },
    reducers: {
        edit: (state, action) => {
            state.user = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = "loading";
            state.error = false
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.loading = "loaded";
            state.error = false
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = "error";
            state.error = action.error.message;
        })
    }
});

export const selectUsers = createSelector(
    (state) => ({
       users: state.usersSlice.users,
       loading: state.usersSlice.loading,
    }), (state) =>  state
);    

export default usersSlice.reducer;