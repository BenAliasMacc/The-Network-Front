import { createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000/api/post/"

export const fetchPost = createAsyncThunk('post/fetchPost', async () => {
    try {
        const response = await axios(url);
        return response.data;
    } catch (error) {
        console.log(error);
    };
});

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        post: {},
        loading: 'idle',
        error: false
    },
    reducers: {
        // editUser: (state, action) => {
        //     state.user.following = [...state.user.following, action.payload]
        // },
        likePost: (state, action) => {
            state.post.map((post) => {
                if(post._id === action.payload.postId) {
                    post.likers = [...post.likers, action.payload.userId]
                }                
            })
        },
        // removeFollow: (state, action) => {
        //     state.user.following = state.user.following.filter((id) => id !== action.payload)
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPost.pending, (state) => {
            state.loading = "loading";
            state.error = false
        })
        builder.addCase(fetchPost.fulfilled, (state, action) => {
            state.post = action.payload;
            state.loading = "loaded";
            state.error = false
        })
        builder.addCase(fetchPost.rejected, (state, action) => {
            state.loading = "error";
            state.error = action.error.message;
        })
    }
});

export const selectPost = createSelector(
    (state) => ({
       posts: state.postSlice.post,
       loading: state.postSlice.loading,
    }), (state) =>  state
);

export const { likePost } = postSlice.actions;

export default postSlice.reducer;
