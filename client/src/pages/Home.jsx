import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#ffb400] flex flex-col justify-between">
      {/** Barrasuperior com logo e botões */}
      <header className="flex justify-between items-center lg:px-6 lg:py-5 px-4 py-4">
        <img src="/public/logo-removebg-preview.png" alt="logo escrito yourself feedback" className='lg:w-64 w-36 ' />
        <div className='flex space-x-3 lg:space-x-6'>
          <Link 
          to="/login" 
          className="text-white text-xs lg:text-lg font-light bg-[#fd401a] px-6 py-3 lg:px-12 lg:py-7 rounded-full hover:bg-[rgba(216,88,88,0.97)]"
          >
            Login
          </Link>

          <Link 
          to="/register" 
          className="text-white text-xs lg:text-lg font-light bg-[#fd401a] px-6 py-3 lg:px-12 lg:py-7 rounded-full hover:bg-[rgba(216,88,88,0.97)]"
          >
            Register
          </Link>
        </div>
      </header>

      {/* Conteúdo principal */}
      <div className="flex flex-col lg:flex-row items-center justify-center flex-1 px-6 lg:px-32 py-8 lg:py-0">
        {/* Texto de apresentaçào */}
        <div className="text-center lg:text-left max-w-lg mb-8 lg:mb-0">
          <h1 className="lg:text-7xl text-4xl font-bold mb-4 lg:mb-8 leading-tight">Good ideas yourself ➦</h1>
          <p className="text-lg lg:text-2xl mb-8 lg:mb-16 leading-relaxed ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam cumque reprehenderit repudiandae quaerat cum voluptate, quos, illum exercitationem rerum unde delectus consequatur saepe suscipit rem, nostrum modi. Quidem, expedita ea!
          </p>

          <Link 
          to="/register" 
          className="bg-black text-white px-8 py-4 lg:px-14 lg:py-6 rounded-full text-lg lg:text-2xl hover:bg-stone-800"
          >
            Comece agora
          </Link>
        </div>

        {/** Imagem ao lado do texto */}
        <div className="flex justify-center lg:justify-end w-full lg:w-1/2">
          <img 
          src="/public/menina.png" 
          alt="mulher sorrindo apontando para cima" 
          className="w-3/4 md:w-[600px] lg:w-[900px]"
           />
        </div>
      </div>
    </div>
  );
};

export default Home;
