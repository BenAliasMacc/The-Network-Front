import { createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";
import axios from "axios";
import requests from "../../api/requests";

export const fetchPost = createAsyncThunk('post/fetchPost', async (num) => {
    try {
        const response = await axios.get(requests.getPost);
        const array = response.data.slice(0, num);
        return array;
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
        updatePost: (state, action) => {
            state.post.map((post) => {
                if(post._id === action.payload.postId) return post.message =  action.payload.message;
                else return null;             
            })
        },
        deletePost: (state, action) => {
            state.post = state.post.filter((post) => post._id !== action.payload.id);
        },
        likePost: (state, action) => {
            state.post.map((post) => {
                if(post._id === action.payload.postId) return post.likers = [...post.likers, action.payload.userId];
                else return null;             
            })
        },
        unlikePost: (state, action) => {
            state.post.map((post) => {
                if(post._id === action.payload.postId) return post.likers = post.likers.filter((id) => id !== action.payload.userId)              
                else return null;
            })
        },
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

export const { likePost, unlikePost, updatePost, deletePost } = postSlice.actions;

export default postSlice.reducer;
