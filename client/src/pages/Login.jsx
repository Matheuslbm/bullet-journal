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
      toast.error('Login failed. Please check your credentials.', {
        className: 'bg-amber-400 text-stone-700', // Estilização com Tailwind
      });
    }
  };

  return (
    <div className="flex h-screen bg-stone-700 justify-center items-center relative">
      {/* Logo que redireciona para Home */}
      <button
        type="button"
        onClick={() => navigate('/')}
        className="absolute hidden lg:block lg:top-8 lg:left-10 focus:outline-none"
      >
        <img
          src="/logo-removebg-preview.png"
          alt="Logo"
          className="w-32 lg:w-56"
        />
      </button>

      {/* Contêiner do formulário e imagem */}
      <div className="bg-amber-400 flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-8 px-8 py-12 rounded-2xl shadow-2xl lg:w-[1200px] lg:h-[600px]
      ">
        {/* Formulário */}
        <form
          onSubmit={handleSubmit}
          className= 'p-8  w-full max-w-md lg:max-w-lg'
        >
          <h2 className="text-3xl lg:text-6xl font-bold mb-4 text-center text-stone-700">
            Sign in
          </h2>
          <p className=' text-center text-stone-500 mb-10'>Welcome back! Please enter your details</p>

           {/* Input de Email */}
          <div className="mb-4">        
            <input
              type="email"
              placeholder='Email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="bg-stone-200 border border-violet-400 text-stone-600 text-sm rounded-lg block w-full p-3.5 mb-6 placeholder-gray-500"
              required
            />
          </div>

          {/* Input de Senha */}
          <div className="mb-6">
            <input
              type="password"
              placeholder='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="bg-stone-200 border border-violet-400 text-stone-600 text-sm rounded-lg block w-full p-3.5 placeholder-gray-500"
              required
            />
          </div>

          {/* Botão de Login */}
          <button
            type="submit"
            className="w-full bg-[#bdaffc] hover:bg-[#a1c1e4] text-stone-700 font-light py-3.5 px-4 mt-3 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#bdaffc]"
          >
            Sign in
          </button>

           {/* Link para Registro */}
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <p
            onClick={() => navigate('/register')}
            className="mt-4 text-center text-stone-500 cursor-pointer hover:underline"
          >
            Don't have an account? <span className='font-bold'>Sign up</span>
          </p>
        </form>

        {/* Imagem ao lado do formulário */}
        <div className="lg:flex justify-center items-center">
          <img
            src="/caneta.png"
            alt="Caneta"
            className="lg:w-[700px] max-w-full h-auto lg:mb-20"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;