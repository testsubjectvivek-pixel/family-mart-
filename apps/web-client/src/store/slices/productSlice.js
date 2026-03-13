import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productsAPI, categoriesAPI } from '../../services/api';

const initialState = {
  products: [],
  featuredProducts: [],
  trendingProducts: [],
  categories: [],
  currentProduct: null,
  isLoading: false,
  error: null,
  pagination: { page: 1, totalPages: 1, total: 0 },
};

export const fetchProducts = createAsyncThunk('products/fetchAll', async (params = {}, { rejectWithValue }) => {
  try {
    const response = await productsAPI.getAll(params);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
  }
});

export const fetchFeaturedProducts = createAsyncThunk('products/fetchFeatured', async (_, { rejectWithValue }) => {
  try {
    const response = await productsAPI.getFeatured();
    return response.data.products;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed');
  }
});

export const fetchTrendingProducts = createAsyncThunk('products/fetchTrending', async (_, { rejectWithValue }) => {
  try {
    const response = await productsAPI.getTrending();
    return response.data.products;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed');
  }
});

export const fetchCategories = createAsyncThunk('products/fetchCategories', async (_, { rejectWithValue }) => {
  try {
    const response = await categoriesAPI.getAll();
    return response.data.categories;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed');
  }
});

export const fetchProductById = createAsyncThunk('products/fetchById', async (id, { rejectWithValue }) => {
  try {
    const response = await productsAPI.getById(id);
    return response.data.product;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Product not found');
  }
});

export const searchProducts = createAsyncThunk('products/search', async (query, { rejectWithValue }) => {
  try {
    const response = await productsAPI.search(query);
    return response.data.products;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Search failed');
  }
});

export const createProduct = createAsyncThunk('products/create', async (data, { rejectWithValue }) => {
  try {
    const response = await productsAPI.create(data);
    return response.data.product;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create product');
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPage: (state, action) => { state.pagination.page = action.payload; },
    clearError: (state) => { state.error = null; },
    clearCurrentProduct: (state) => { state.currentProduct = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.isLoading = true; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products || [];
        state.pagination = action.payload.pagination || { page: 1, totalPages: 1, total: 0 };
      })
      .addCase(fetchProducts.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => { state.featuredProducts = action.payload; })
      .addCase(fetchTrendingProducts.fulfilled, (state, action) => { state.trendingProducts = action.payload; })
      .addCase(fetchCategories.fulfilled, (state, action) => { state.categories = action.payload; })
      .addCase(fetchProductById.fulfilled, (state, action) => { state.currentProduct = action.payload; })
      .addCase(searchProducts.fulfilled, (state, action) => { state.products = action.payload; });
  },
});

export const { setPage, clearError, clearCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
