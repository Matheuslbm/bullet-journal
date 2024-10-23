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
      toast.error('As senhas não correspondem.', {
        className: 'bg-gray-800 text-white',
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
        'Registro realizado com sucesso! Você pode fazer login agora.',
        {
          className: 'bg-gray-800 text-white',
        }
      );
      navigate('/login'); // redireciona para página de login após registro
    } catch (err) {
      toast.error('Falha no registro. Tente novamente.', {
        className: 'bg-gray-800 text-white',
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
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
        <div>
          <label htmlFor="confirmPassword">Confirmar Senha:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default Register;
