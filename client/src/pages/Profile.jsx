import React, { useState } from 'react';
import api from '@/api/axios';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    if (profileImage) formData.append('profileImage', profileImage);

    try {
      await api.put('/user', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (err) {
      setError('Erro ao editar perfil.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl">Editar perfil</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className=""
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className=""
          />
        </div>

        <div>
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className=""
          />
        </div>

        <div>
          <label htmlFor="foto">Foto de perfil</label>
          <input
            type="file"
            onChange={e => setProfileImage(e.target.files[0])}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default Profile;
