import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ordersAPI } from '../../services/api';

const initialState = {
  orders: [],
  currentOrder: null,
  isLoading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk('orders/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await ordersAPI.getAll();
    return response.data.orders;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
  }
});

export const fetchMyOrders = fetchOrders;

export const fetchOrderById = createAsyncThunk('orders/fetchById', async (id, { rejectWithValue }) => {
  try {
    const response = await ordersAPI.getById(id);
    return response.data.order;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Order not found');
  }
});

export const createOrder = createAsyncThunk('orders/create', async (data, { rejectWithValue }) => {
  try {
    const response = await ordersAPI.create(data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create order');
  }
});

export const cancelOrder = createAsyncThunk('orders/cancel', async (id, { rejectWithValue }) => {
  try {
    const response = await ordersAPI.cancel(id);
    return response.data.order;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to cancel order');
  }
});

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => { state.currentOrder = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => { state.isLoading = true; })
      .addCase(fetchOrders.fulfilled, (state, action) => { state.isLoading = false; state.orders = action.payload; })
      .addCase(fetchOrders.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
      .addCase(fetchOrderById.fulfilled, (state, action) => { state.currentOrder = action.payload; })
      .addCase(createOrder.fulfilled, (state, action) => { state.currentOrder = action.payload.order; })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex(o => o._id === action.payload._id);
        if (index !== -1) state.orders[index] = action.payload;
      });
  },
});

export const { clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
