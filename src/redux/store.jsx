import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { postSlice } from './reducers/postSlice';
import { trendsSlice } from './reducers/trendsSlice';
import { userSlice } from './reducers/userSlice';
import { usersSlice } from './reducers/usersSlice';

export const store = configureStore({
    reducer: {
        userSlice: userSlice.reducer,
        usersSlice: usersSlice.reducer,
        postSlice: postSlice.reducer,
        trendsSlice: trendsSlice.reducer
    },
    devTools: false
    // middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware().concat(userSlice.middleware),
});

setupListeners(store.dispatch);