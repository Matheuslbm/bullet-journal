import React, { useState, useEffect } from 'react';
import UserModal from '@/components/UserModal';
import api from '@/api/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

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
        console.log(profileImage);
      } catch (err) {
        toast.error('Registration failed. Please try again.', {
          className: 'bg-amber-400 text-stone-700',
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
      toast.success('Your user information has been changed successfully!', {
        className: 'bg-amber-400 text-stone-700',
      });
    } catch (err) {
      toast.error('Error updating profile.', {
        className: 'bg-amber-400 text-stone-700',
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
        className="w-20 h-20 rounded-full overflow-hidden cursor-pointer"
      >
        <img
          src={
            profileImage
              ? `https://bullet-journal-ecru.vercel.app${profileImage}`
              : 'https://bullet-journal-ecru.vercel.app/uploads/user-avatar_8210743.png'
          }
          alt="User"
          className="w-full h-full object-cover object-center"
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
        profileImage={profileImage}
      />
    </div>
  );
};

export default UserProfile;
