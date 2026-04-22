// API utility for frontend to connect to backend
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const api = {
  // Products
  getProducts: async (category = null) => {
    const url = category && category !== 'All'
      ? `${API_BASE_URL}/products?category=${category}`
      : `${API_BASE_URL}/products`;
    const res = await fetch(url);
    return res.json();
  },

  getProductById: async (id) => {
    const res = await fetch(`${API_BASE_URL}/products/${id}`);
    return res.json();
  },

  // Users
  register: async (userData) => {
    const res = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return res.json();
  },

  login: async (email, password) => {
    const res = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  getUser: async (id) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },

  updateUser: async (id, userData) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    });
    return res.json();
  },

  // Orders
  createOrder: async (orderData) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE_URL}/orders/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    });
    return res.json();
  },

  getOrder: async (id) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE_URL}/orders/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },

  getUserOrders: async (userId) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE_URL}/orders/user/${userId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },

  forgotPassword: async (email) => {
    const res = await fetch(`${API_BASE_URL}/users/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Something went wrong');
    return data;
  },

  resetPassword: async (token, newPassword) => {
    const res = await fetch(`${API_BASE_URL}/users/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Something went wrong');
    return data;
  },

  sellerForgotPassword: async (email) => {
    const res = await fetch(`${API_BASE_URL}/users/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Something went wrong');
    return data;
  },

  sellerResetPassword: async (token, newPassword) => {
    const res = await fetch(`${API_BASE_URL}/users/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Something went wrong');
    return data;
  },

  getSellerStore: async (slug) => {
    const res = await fetch(`${API_BASE_URL}/sellers/store/${slug}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Store not found');
    return data;
  },

  // Site Settings (Dynamic Banners)
  getSettings: async () => {
    const res = await fetch(`${API_BASE_URL}/users/config/settings`);
    if (!res.ok) return {};
    return res.json();
  },

  updateSetting: async (key, value) => {
    const res = await fetch(`${API_BASE_URL}/users/config/settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value })
    });
    return res.json();
  }
};

export const login = api.login;
export const signup = api.register;
export const forgotPassword = api.forgotPassword;
export const resetPassword = api.resetPassword;
export default api;
