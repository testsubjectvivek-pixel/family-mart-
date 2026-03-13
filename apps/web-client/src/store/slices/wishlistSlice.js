import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { wishlistAPI } from '../../services/api';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchWishlist = createAsyncThunk('wishlist/fetch', async (_, { rejectWithValue }) => {
  try {
    const response = await wishlistAPI.get();
    return response.data.wishlist;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed');
  }
});

export const addToWishlist = createAsyncThunk('wishlist/add', async (productId, { rejectWithValue }) => {
  try {
    const response = await wishlistAPI.add(productId);
    return response.data.wishlist;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed');
  }
});

export const removeFromWishlist = createAsyncThunk('wishlist/remove', async (productId, { rejectWithValue }) => {
  try {
    const response = await wishlistAPI.remove(productId);
    return response.data.wishlist;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed');
  }
});

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => { state.isLoading = true; })
      .addCase(fetchWishlist.fulfilled, (state, action) => { state.isLoading = false; state.items = action.payload; })
      .addCase(fetchWishlist.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
      .addCase(addToWishlist.fulfilled, (state, action) => { state.items = action.payload; })
      .addCase(removeFromWishlist.fulfilled, (state, action) => { state.items = action.payload; });
  },
});

export default wishlistSlice.reducer;
