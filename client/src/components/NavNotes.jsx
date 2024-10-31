import React from 'react';
import UserProfile from '@/components/UserProfile';
import { FaPowerOff } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NavNotes = ({ searchQuery, handleSearch }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-stone-800 shadow-lg z-50">
      <div className="flex items-center justify-between h-24 px-4 md:px-10 ">
        {/* Logo  */}
        <img
          src="/logo-removebg-preview.png"
          alt="Logo"
          className="w-24 lg:w-40"
        />

        {/* Input de busca */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search"
          className="border rounded p-1 lg:p-2 lg:py-4 ml-auto mr-6 w-28 lg:w-80 bg-stone-600 text-white"
        />

        {/* UserProfile */}
        <div className="flex items-center space-x-4 ml-auto">
          <UserProfile />

          <button
            type="button"
            onClick={handleLogout}
            className="cursor-pointer"
          >
            <FaPowerOff className="w-6 h-6 mt-3 text-amber-400" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavNotes;
