import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="flex justify-between items-center h-[10vh] lg:py-5 px-5 md:px-20">
        {/* Logo */}
        <Link to='/' className="text-3xl  text-slate-700">
        🎨 Esther Ramos
        </Link> 


        {/* Menu hamburguer para telas pequenas */}
        <div className="lg:hidden">
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button onClick={toggleMenu}>
            {menuOpen ? (
              <AiOutlineClose size={30} />
            ) : (
              <AiOutlineMenu size={30} />
            )}
          </button>
        </div>

        {/* Links de navegação para telas maiores */}
        <div className="hidden lg:flex items-center space-x-8">
          <ul className="flex space-x-8 text-[18px]">
            <li>
              <Link
                to="/"
                className="hover:text-gray-400 hover:border-b-2 border-slate-800"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/perfil"
                className="hover:text-gray-400 hover:border-b-2 border-slate-800"
              >
                Perfil
              </Link>
            </li>
            <li>
              <Link
                to="/obras"
                className="hover:text-gray-400 hover:border-b-2 border-slate-800"
              >
                Obras
              </Link>
            </li>
            <li>
              <Link
                to="/exposicoes"
                className="hover:text-gray-400 hover:border-b-2 border-slate-800"
              >
                Exposições
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Menu responsivo que aparece em telas pequenas */}
      {menuOpen && (
        <div className="lg:hidden bg-slate-50 w-full absolute top-16 left-0 z-50 shadow-md ">
          <ul className="flex flex-col items-center p-5 space-y-4">
            <li>
              <Link
                to="/"
                onClick={toggleMenu}
                className="text-xl hover:text-gray-400 hover:border-b-2 border-slate-800"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/perfil"
                onClick={toggleMenu}
                className="text-xl hover:text-gray-400 hover:border-b-2 border-slate-800"
              >
                Perfil
              </Link>
            </li>
            <li>
              <Link
                to="/obras"
                onClick={toggleMenu}
                className="text-xl hover:text-gray-400 hover:border-b-2 border-slate-800"
              >
                Obras
              </Link>
            </li>
            <li>
              <Link
                to="/exposicoes"
                onClick={toggleMenu}
                className="text-xl hover:text-gray-400 hover:border-b-2 border-slate-800"
              >
                Exposições
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Nav;

//className="hover:text-gray-400 hover:border-b-2 border-slate-800"
