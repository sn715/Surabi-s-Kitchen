import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001');

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);

export const dishesAPI = {
  // Get all dishes
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/api/dishes', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch dishes');
    }
  },

  // Get dishes by vegetable
  getByVegetable: async (vegetable) => {
    try {
      const response = await api.get(`/api/dishes/${encodeURIComponent(vegetable)}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch dishes for vegetable');
    }
  },

  // Add new dish
  add: async (dishData) => {
    try {
      const response = await api.post('/api/dishes', dishData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add dish');
    }
  },

  // Search dishes
  search: async (searchTerm) => {
    try {
      const response = await api.get(`/api/dishes/search/${encodeURIComponent(searchTerm)}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search dishes');
    }
  }
};

export const vegetablesAPI = {
  // Get all unique vegetables
  getAll: async () => {
    try {
      const response = await api.get('/api/vegetables');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch vegetables');
    }
  }
};

export const dishTypesAPI = {
  // Get all unique dish types
  getAll: async () => {
    try {
      const response = await api.get('/api/dish-types');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch dish types');
    }
  }
};

export default api;
