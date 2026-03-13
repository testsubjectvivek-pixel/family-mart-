import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  forgotPassword: (data) => api.post('/auth/forgot-password', data),
  resetPassword: (data, token) => api.post(`/auth/reset-password/${token}`, data),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
};

// Products API
export const productsAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  search: (query) => api.get('/products/search', { params: { q: query } }),
  getFeatured: () => api.get('/products', { params: { featured: true } }),
  getTrending: () => api.get('/products', { params: { trending: true } }),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
};

// Categories API
export const categoriesAPI = {
  getAll: () => api.get('/categories'),
  getById: (id) => api.get(`/categories/${id}`),
  create: (data) => api.post('/categories', data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  delete: (id) => api.delete(`/categories/${id}`),
};

// Cart API
export const cartAPI = {
  get: () => api.get('/cart'),
  addItem: (data) => api.post('/cart/add', data),
  updateItem: (itemId, data) => api.put(`/cart/update/${itemId}`, data),
  removeItem: (itemId) => api.delete(`/cart/remove/${itemId}`),
  applyCoupon: (code) => api.post('/cart/apply-coupon', { couponCode: code }),
  clear: () => api.delete('/cart/clear'),
};

// Orders API
export const ordersAPI = {
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  create: (data) => api.post('/orders', data),
  cancel: (id) => api.put(`/orders/${id}/cancel`),
  verifyPayment: (orderId, data) => api.post(`/orders/${orderId}/verify-payment`, data),
  updateStatus: (id, data) => api.put(`/orders/${id}/status`, data),
};

// Users API
export const usersAPI = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  updateStatus: (id, data) => api.put(`/users/${id}/status`, data),
  delete: (id) => api.delete(`/users/${id}`),
  getAddresses: () => api.get('/users/addresses'),
  addAddress: (data) => api.post('/users/addresses', data),
  deleteAddress: (id) => api.delete(`/users/addresses/${id}`),
};

// Wishlist API
export const wishlistAPI = {
  get: () => api.get('/wishlist'),
  add: (productId) => api.post('/wishlist/add', { productId }),
  remove: (productId) => api.delete(`/wishlist/remove/${productId}`),
};

// Promo Codes API
export const promoCodesAPI = {
  getAll: () => api.get('/promo'),
  create: (data) => api.post('/promo', data),
  update: (id, data) => api.put(`/promo/${id}`, data),
  delete: (id) => api.delete(`/promo/${id}`),
};

// Notifications API
export const notificationsAPI = {
  getAll: () => api.get('/notifications'),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/read-all'),
  delete: (id) => api.delete(`/notifications/${id}`),
};

// Wallet API
export const walletAPI = {
  getBalance: () => api.get('/wallet/balance'),
  getTransactions: (params) => api.get('/wallet/transactions', { params }),
  addMoney: (data) => api.post('/wallet/add', data),
};

// Referral API
export const referralAPI = {
  getCode: () => api.get('/referral/code'),
  getStats: () => api.get('/referral/stats'),
  applyCode: (code) => api.post('/referral/apply', { code }),
};

// Blog API
export const blogAPI = {
  getAll: (params) => api.get('/blogs', { params }),
  getBySlug: (slug) => api.get(`/blogs/${slug}`),
  getFeatured: () => api.get('/blogs/featured'),
};

// Reviews API
export const reviewsAPI = {
  getByProduct: (productId, params) => api.get(`/reviews/product/${productId}`, { params }),
  add: (data) => api.post('/reviews', data),
  markHelpful: (reviewId) => api.put(`/reviews/${reviewId}/helpful`),
};

// Search API (using products search)
export const searchAPI = {
  search: (query, params) => api.get('/products/search', { params: { q: query, ...params } }),
};

// Upload API
export const uploadAPI = {
  singleImage: (formData) => api.post('/upload/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
};

export default api;
