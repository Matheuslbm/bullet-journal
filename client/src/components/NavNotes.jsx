import React from 'react';
import UserProfile from '@/components/UserProfile';
import { FaPowerOff } from 'react-icons/fa';

const NavNotes = () => {

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-stone-800 shadow-md z-50">
      <div className="flex justify-start items-center h-24 px-4 md:px-10 ">
        {/* UserProfile */}
        <UserProfile />
        <h1 className='text-emerald-800 text-3xl ml-4 font-medium'>Bullet Journal</h1>
        <div className="flex-grow">

        </div>
        <button type="button" onClick={handleLogout} className="ml-64 cursor-pointer">
          <FaPowerOff className="w-6 h-6 mt-3 text-emerald-800" />
        </button>
      </div>
    </nav>
  );
};

export default NavNotes;
