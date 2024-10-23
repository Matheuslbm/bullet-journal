import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/api/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token); // salva o token

      navigate('/notes');
    } catch (err) {
      toast.error('Login falhou. Verifique suas credenciais.', {
        className: 'bg-gray-800 text-white', // Estilização com Tailwind
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Entrar
        </button>
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <p
          onClick={() => navigate('/register')}
          className="text-blue-500 cursor-pointer"
        >
          Não tem uma conta? Registre-se aqui
        </p>
      </form>
    </div>
  );
};

export default Login;
