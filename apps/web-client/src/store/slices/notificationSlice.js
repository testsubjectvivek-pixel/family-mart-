import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { notificationsAPI } from '../../services/api';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

export const getNotifications = createAsyncThunk('notifications/getAll', async (params = {}, { rejectWithValue }) => {
  try {
    const response = await notificationsAPI.getAll(params);
    return response.data.notifications || [];
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch notifications');
  }
});

export const markAsRead = createAsyncThunk('notifications/markAsRead', async (id, { rejectWithValue }) => {
  try {
    await notificationsAPI.markAsRead(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to mark as read');
  }
});

export const markAllAsRead = createAsyncThunk('notifications/markAllAsRead', async (_, { rejectWithValue }) => {
  try {
    await notificationsAPI.markAllAsRead();
    return true;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to mark all as read');
  }
});

export const deleteNotification = createAsyncThunk('notifications/delete', async (id, { rejectWithValue }) => {
  try {
    await notificationsAPI.delete(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete notification');
  }
});

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => { state.isLoading = true; })
      .addCase(getNotifications.fulfilled, (state, action) => { state.isLoading = false; state.items = action.payload; })
      .addCase(getNotifications.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
      .addCase(markAsRead.fulfilled, (state, action) => {
        const notification = state.items.find(n => n._id === action.payload);
        if (notification) notification.isRead = true;
      })
      .addCase(markAllAsRead.fulfilled, (state) => {
        state.items.forEach(n => n.isRead = true);
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.items = state.items.filter(n => n._id !== action.payload);
      });
  },
});

export default notificationSlice.reducer;
