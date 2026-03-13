import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { reviewsAPI } from '../../services/api';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchReviews = createAsyncThunk('reviews/fetch', async ({ productId, page = 1 }, { rejectWithValue }) => {
  try {
    const response = await reviewsAPI.getByProduct(productId, { page });
    return { reviews: response.data.reviews || [], productId };
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch reviews');
  }
});

export const addReview = createAsyncThunk('reviews/add', async (data, { rejectWithValue }) => {
  try {
    const response = await reviewsAPI.add(data);
    return response.data.review;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to add review');
  }
});

export const markHelpful = createAsyncThunk('reviews/markHelpful', async (reviewId, { rejectWithValue }) => {
  try {
    await reviewsAPI.markHelpful(reviewId);
    return reviewId;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to mark helpful');
  }
});

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => { state.isLoading = true; })
      .addCase(fetchReviews.fulfilled, (state, action) => { state.isLoading = false; state.items = action.payload.reviews; })
      .addCase(fetchReviews.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
      .addCase(addReview.pending, (state) => { state.isLoading = true; })
      .addCase(addReview.fulfilled, (state, action) => { state.isLoading = false; state.items.unshift(action.payload); })
      .addCase(addReview.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
      .addCase(markHelpful.fulfilled, (state, action) => {
        const review = state.items.find(r => r._id === action.payload);
        if (review) review.helpful = (review.helpful || 0) + 1;
      });
  },
});

export default reviewSlice.reducer;
