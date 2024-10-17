import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Bem-vindo ao Bullet Journal</h1>
      <div className="mt-4">
        <Link to="/login" className="text-blue-500 mr-4">
          Login
        </Link>
        <Link to="/register" className="text-blue-500">
          Registrar
        </Link>
      </div>
    </div>
  );
};

export default Home;
