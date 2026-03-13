import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { blogAPI } from '../../services/api';

const initialState = {
  items: [],
  currentPost: null,
  featuredPosts: [],
  isLoading: false,
  error: null,
};

export const getBlogs = createAsyncThunk('blog/getBlogs', async (params = {}, { rejectWithValue }) => {
  try {
    const response = await blogAPI.getAll(params);
    return response.data.blogs || [];
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch blogs');
  }
});

export const getFeaturedBlogs = createAsyncThunk('blog/getFeaturedBlogs', async (_, { rejectWithValue }) => {
  try {
    const response = await blogAPI.getFeatured();
    return response.data.blogs || [];
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch featured blogs');
  }
});

export const getBlogBySlug = createAsyncThunk('blog/getBlogBySlug', async (slug, { rejectWithValue }) => {
  try {
    const response = await blogAPI.getBySlug(slug);
    return response.data.blog;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Blog not found');
  }
});

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    clearCurrentBlog: (state) => { state.currentPost = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.pending, (state) => { state.isLoading = true; })
      .addCase(getBlogs.fulfilled, (state, action) => { state.isLoading = false; state.items = action.payload; })
      .addCase(getBlogs.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
      .addCase(getFeaturedBlogs.fulfilled, (state, action) => { state.featuredPosts = action.payload; })
      .addCase(getBlogBySlug.pending, (state) => { state.isLoading = true; })
      .addCase(getBlogBySlug.fulfilled, (state, action) => { state.isLoading = false; state.currentPost = action.payload; })
      .addCase(getBlogBySlug.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; });
  },
});

export const { clearCurrentBlog } = blogSlice.actions;
export default blogSlice.reducer;
