import React, { useState, useEffect } from 'react';
import UserModal from '@/components/UserModal';
import api from '@/api/axios';

const UserProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

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
        setError('Erro ao carregar perfil do usuário.');
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
    } catch (err) {
      setError('Erro ao salvar as informações do usuário.');
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); //define novo arquivo
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFile(null); // limpa o arquivo ao fechar modal
  }

  return (
    <div className="flex flex-col items-center">
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
<img
        src={profileImage ? `http://localhost:5000${profileImage}` : 'URL_DA_IMAGEM_PADRAO'}
        alt="User"
        className="w-40 h-40 rounded-full cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      />
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
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default UserProfile;
