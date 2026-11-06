import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import authReducer from './authSlice';
import accountReducer from './accountSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    account: accountReducer
  }
});

export default store;
