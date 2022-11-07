import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import { postSlice } from './reducers/postSlice';
import { userSlice } from './reducers/userSlice';
import { usersSlice } from './reducers/usersSlice';

export const store = configureStore({
    reducer: {
        userSlice: userSlice.reducer,
        usersSlice: usersSlice.reducer,
        postSlice: postSlice.reducer
    },
    // middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware().concat(userSlice.middleware),
});

setupListeners(store.dispatch);