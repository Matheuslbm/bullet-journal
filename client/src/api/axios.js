import axios from 'axios';

// Base URL para o backend
const api = axios.create({
  baseURL: 'http://localhost:5000', // URL do meeu back-end
});

// Adicionar o token JWT em todas as requisiçoes, se ele estiver no localStorage
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
