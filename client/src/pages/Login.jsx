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
    <div className="flex h-screen bg-[#ffb400] justify-center items-center relative">
      {/* Logo que redireciona para Home */}
      <button
        type="button"
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 lg:top-8 lg:left-10 focus:outline-none"
      >
        <img
          src="/public/logo-removebg-preview.png"
          alt="Logo"
          className="w-32 lg:w-56"
        />
      </button>

      {/* Contêiner do formulário e imagem */}
      <div className="flex flex-col lg:flex-row justify-center items-center space-y-8 lg:space-y-0 lg:space-x-8 px-4">
        {/* Formulário */}
        <form
          onSubmit={handleSubmit}
          className="bg-amber-400 p-8 rounded-2xl shadow-2xl w-full max-w-md lg:max-w-lg"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-center">
            Login
          </h2>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-stone-600 text-sm font-bold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="bg-stone-200 border border-violet-400 text-stone-600 text-sm rounded-lg block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-stone-600 text-sm font-bold mb-2"
            >
              Senha:
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="bg-stone-200 border border-violet-400 text-stone-600 text-sm rounded-lg block w-full p-2.5"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#bdaffc] hover:bg-[#a1c1e4] text-stone-600 font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#bdaffc]"
          >
            Entrar
          </button>
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <p
            onClick={() => navigate('/register')}
            className="mt-4 text-center text-stone-500 cursor-pointer hover:underline"
          >
            Não tem uma conta? Registre-se aqui
          </p>
        </form>

        {/* Imagem ao lado do formulário */}
        <div className="lg:flex justify-center items-center">
          <img
            src="/public/caneta.png"
            alt="Caneta"
            className="lg:w-[700px] max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;