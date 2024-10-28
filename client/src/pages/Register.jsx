import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/api/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    // verifica se as senhas correspondem
    if (password !== confirmPassword) {
      toast.error('Passwords do not match', {
        className: 'bg-amber-400 text-stone-700',
      });
      return;
    }

    // Lógica de registro (chamar a API)
    try {
      await api.post('/auth/register', {
        name,
        email,
        password,
      });
      toast.success(
        'Registration successful! You can log in now.',
        {
          className: 'bg-amber-400 text-stone-700',
        }
      );
      navigate('/login'); // redireciona para página de login após registro
    } catch (err) {
      toast.error('Registration failed. Please try again.', {
        className: 'bg-amber-400 text-stone-700',
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
          src="logo-removebg-preview.png"
          alt="Logo"
          className="w-32 lg:w-56"
        />
      </button>

      {/* Contêiner do formulário e imagem */}
      <div className="bg-amber-400 flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-8 px-8 py-12 rounded-2xl shadow-2xl lg:w-[1200px] lg:h-[600px]">
        {/* Formulário */}
        <form
          onSubmit={handleSubmit}
          className="p-8 w-full max-w-md lg:max-w-lg"
        >
          <h2 className="text-3xl lg:text-6xl font-bold mb-4 text-center text-stone-700 mt-16 lg:mt-0">
            Create an account
          </h2>
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <p
            onClick={() => navigate('/login')}
            className="text-center text-stone-500 mb-10 cursor-pointer hover:underline"
          >
            Already have an account?{' '}
            <span className="font-semibold">Log in</span>
          </p>

            {/* Input de nome */}
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="bg-stone-200 border border-violet-400 text-stone-600 text-sm rounded-lg block w-full p-3.5 mb-6 placeholder-gray-500"
              placeholder="Your name"
              required
            />
          </div>
          <div className="mb-4">
            {/* Input de Email */}
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="bg-stone-200 border border-violet-400 text-stone-600 text-sm rounded-lg block w-full p-3.5 mb-6 placeholder-gray-500"
              placeholder="Your email"
              required
            />
          </div>

          <div className="mb-4">
            {/* Input de password */}
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="bg-stone-200 border border-violet-400 text-stone-600 text-sm rounded-lg block w-full p-3.5 mb-6 placeholder-gray-500"
              placeholder="Password"
              required
            />
          </div>
          <div className="mb-4">
            {/* Input de  confirm password */}
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="bg-stone-200 border border-violet-400 text-stone-600 text-sm rounded-lg block w-full p-3.5 mb-6 placeholder-gray-500"
              placeholder="Confirm your password"
              required
            />
          </div>

          {/* Botão de criar conta */}
          <button
            type="submit"
            className="w-full bg-[#bdaffc] hover:bg-[#a1c1e4] text-stone-700 font-light py-3.5 px-4 mt-3 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#bdaffc]"
          >
            Create account
          </button>
        </form>

        {/* Imagem ao lado do formulário */}
        <div className="lg:flex justify-center items-center">
          <img 
          src="/lapis.png" 
          alt="mão com um lápis apontando para o formulário de registro" 
          className='lg:w-[700px] max-w-full h-auto'
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
