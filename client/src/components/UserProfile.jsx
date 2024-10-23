import React, { useState, useEffect } from 'react';
import UserModal from '@/components/UserModal';
import api from '@/api/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FaPowerOff } from 'react-icons/fa';

const UserProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/auth/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const { name, email, profileImage } = response.data;
        setName(name);
        setEmail(email);
        setProfileImage(profileImage);
      } catch (err) {
        toast.error('Falha no registro. Tente novamente.', {
          className: 'bg-gray-800 text-white',
        });
      }
    };

    fetchUserProfile();
  }, []);

  const handleSaveUser = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (password) formData.append('password', password); // só adicionar se estiver preenchido
    if (file) {
      formData.append('profileImage', file);
    }

    try {
      const response = await api.put('/auth/edit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const { profileImage } = response.data.user;
      setProfileImage(profileImage); //Atualiza a img no front-end
      setFile(null); // Limpa o arquivo após o envio
      setIsModalOpen(false); // Fecha o modal
      toast.success(
        'Suas informaçoes de usuário foram alteradas com sucesso!',
        {
          className: 'bg-gray-800 text-white',
        }
      );
    } catch (err) {
      toast.error('Falha no registro. Tente novamente.', {
        className: 'bg-gray-800 text-white',
      });
    }
  };

  const handleFileChange = e => {
    setFile(e.target.files[0]); //define novo arquivo
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFile(null); // limpa o arquivo ao fechar modal
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsModalOpen(true);
          }
        }}
        className="w-14 h-14 rounded-full cursor-pointer"
      >
        <img
          src={
            profileImage
              ? `http://localhost:5000${profileImage}`
              : 'http://localhost:5000/uploads/user-avatar_8210743.png'
          }
          alt="User"
          className="w-full h-full rounded-full"
        />
      </button>
      <UserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onSave={handleSaveUser}
        onFileChange={handleFileChange}
      />

      <button type="button" onClick={handleLogout} className="cursor-pointer">
        <FaPowerOff className="w-5 h-5 mt-3 text-red-500"/>
      </button>
    </div>
  );
};

export default UserProfile;
