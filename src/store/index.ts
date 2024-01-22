import { configureStore } from '@reduxjs/toolkit';
import users from './slices/users';

const store = configureStore({
    reducer: { users },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
