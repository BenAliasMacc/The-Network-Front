import { createSlice, createSelector } from "@reduxjs/toolkit";

export const trendsSlice = createSlice({
    name: 'trends',
    initialState: {
        trends: {}
    },
    reducers: {
        getTrends: (state, action) => {
            state.trends = action.payload;
        },
    },
});

export const { getTrends } = trendsSlice.actions;

export default trendsSlice.reducer;
