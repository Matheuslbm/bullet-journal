import axios from 'axios';

// Base URL para o backend
const api = axios.create({
  baseURL: 'https://bullet-journal-ecru.vercel.app/', // URL do meeu back-end
});

// Adicionar o token JWT em todas as requisiçoes, se ele estiver no localStorage
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//Interceptor para tratar respostas e redirecionar no caso de token expirado
api.interceptors.response.use(
  response => response, // retorna a resposta normalmente se nao houver erro
  error => {
    if (error.response && error.response.status === 403) {
      // Remove o token do localStorage
      localStorage.removeItem('token');

      // Redireciona para a página de login
      window.location.href = '/login';
    }

    return Promise.reject(error); // Propaga o erro para ser tratado onde for necessario
  }
);

export default api;
