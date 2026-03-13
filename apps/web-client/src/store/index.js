import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';
import orderReducer from './slices/orderSlice';
import wishlistReducer from './slices/wishlistSlice';
import blogReducer from './slices/blogSlice';
import walletReducer from './slices/walletSlice';
import searchReducer from './slices/searchSlice';
import referralReducer from './slices/referralSlice';
import notificationReducer from './slices/notificationSlice';
import reviewReducer from './slices/reviewSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productReducer,
    orders: orderReducer,
    wishlist: wishlistReducer,
    blog: blogReducer,
    wallet: walletReducer,
    search: searchReducer,
    referral: referralReducer,
    notifications: notificationReducer,
    reviews: reviewReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
