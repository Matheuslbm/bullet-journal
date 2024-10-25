import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="h-screen bg-[#ffb400] flex flex-col justify-between">
      {/** Barrasuperior com logo e botões */}
      <header className="flex justify-between items-center px-6 py-5 md:px-10">
        <img src="/public/logo-removebg-preview.png" alt="logo escrito yourself feedback" className='w-64 md-32' />
        <div>
          <Link to="/login" className="text-white text-sm md:text-lg font-light bg-[#fd401a] px-8 py-4 md:px-12 md:py-7 rounded-full me-6 hover:bg-[rgba(216,88,88,0.97)]">
            Login
          </Link>

          <Link to="/register" className="text-white text-sm md:text-lg font-light bg-[#fd401a] px-8 py-4 md:px-12 md:py-7 rounded-full me-6 hover:bg-[rgba(216,88,88,0.97)]">
            Register
          </Link>
        </div>
      </header>

      {/* Conteúdo principal */}
      <div className="flex flex-col lg:flex-row items-center justify-center flex-1 px-6 lg:px-32">
        {/* Texto de apresentaçào */}
        <div className="text-center lg:text-left max-w-lg">
          <h1 className="text-7xl font-bold mb-8 leading-tight">Good ideas yourself ➦</h1>
          <p className="text-2xl mb-16 leading-relaxed ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam cumque reprehenderit repudiandae quaerat cum voluptate, quos, illum exercitationem rerum unde delectus consequatur saepe suscipit rem, nostrum modi. Quidem, expedita ea!
          </p>

          <Link to="/register" className="bg-black text-white px-14 py-6 rounded-full text-2xl hover:bg-stone-800">
            Comece agora
          </Link>
        </div>

        {/** Imagem ao lado do texto */}
        <div className="mt-8 lg:mt-0 lg:ml-16 w-full lg:w-1/2 flex justify-center">
          <img src="/public/menina.png" alt="mulher sorrindo apontando para cima" className="md:w-[1200px] w-full" />
        </div>
      </div>
    </div>
  );
};

export default Home;
