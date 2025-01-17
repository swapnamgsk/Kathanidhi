import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    // Add any auth headers if needed
    // 'Authorization': `Bearer ${localStorage.getItem('token')}` 
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if it exists
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      console.error('Network error:', error);
      throw new Error('Server is not responding. Please check if it is running.');
    }
    return Promise.reject(error);
  }
);

export default api;
