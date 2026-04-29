
import axios from 'axios'
import { getAccessToken } from '../services/authService';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers:{'Content-Type':'application/json'
    }
});

api.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;