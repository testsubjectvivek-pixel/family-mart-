import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cartAPI } from '../../services/api';

const initialState = {
  items: [],
  subtotal: 0,
  gst: 0,
  discount: 0,
  total: 0,
  isDrawerOpen: false,
  deliveryEstimate: 10, // minutes
  isLoading: false,
  error: null,
};

export const fetchCart = createAsyncThunk('cart/fetch', async (_, { rejectWithValue }) => {
  try {
    const response = await cartAPI.get();
    return response.data.cart;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
  }
});

export const addToCart = createAsyncThunk('cart/add', async (data, { rejectWithValue }) => {
  try {
    const response = await cartAPI.addItem(data);
    return response.data.cart;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to add item');
  }
});

export const updateCartItem = createAsyncThunk('cart/update', async ({ itemId, quantity }, { rejectWithValue }) => {
  try {
    const response = await cartAPI.updateItem(itemId, { quantity });
    return response.data.cart;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update');
  }
});

export const removeFromCart = createAsyncThunk('cart/remove', async (itemId, { rejectWithValue }) => {
  try {
    const response = await cartAPI.removeItem(itemId);
    return response.data.cart;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to remove');
  }
});

export const applyCoupon = createAsyncThunk('cart/applyCoupon', async (code, { rejectWithValue }) => {
  try {
    const response = await cartAPI.applyCoupon(code);
    return response.data.cart;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Invalid coupon');
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.subtotal = 0;
      state.gst = 0;
      state.discount = 0;
      state.total = 0;
    },
    setDrawerOpen: (state, action) => {
      state.isDrawerOpen = action.payload;
    },
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
    setDeliveryEstimate: (state, action) => {
      state.deliveryEstimate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => { state.isLoading = true; })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload?.items || [];
        state.subtotal = action.payload?.subtotal || 0;
        state.gst = action.payload?.gst || 0;
        state.discount = action.payload?.discount || 0;
        state.total = action.payload?.total || 0;
      })
      .addCase(fetchCart.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.subtotal = action.payload.subtotal;
        state.gst = action.payload.gst;
        state.discount = action.payload.discount;
        state.total = action.payload.total;
        // Auto open drawer on add
        state.isDrawerOpen = true;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.subtotal = action.payload.subtotal;
        state.gst = action.payload.gst;
        state.total = action.payload.total;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.subtotal = action.payload.subtotal;
        state.gst = action.payload.gst;
        state.total = action.payload.total;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.discount = action.payload.discount;
        state.total = action.payload.total;
      });
  },
});

export const { clearCart, setDrawerOpen, toggleDrawer, setDeliveryEstimate } = cartSlice.actions;
export default cartSlice.reducer;
