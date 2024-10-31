import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const UserModal = ({
  isOpen,
  onClose,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  onSave,
  onFileChange,
  profileImage,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='bg-stone-900 text-white rounded-lg'>
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
          <DialogDescription>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="bg-stone-600 border border-gray-700 text-white text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 mb-2 mt-4"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="bg-stone-600 border border-gray-700 text-white text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 mb-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="bg-stone-600 border border-gray-700 text-white text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 mb-2"
            />
            <input
              type="file"
              onChange={onFileChange}
              className="block w-full text-sm text-white bg-stone-600 border border-gray-700 rounded-lg cursor-pointer mb-2 py-2"
            />
             {/* Visualização da imagem do usuário em tamanho maior */}
             {profileImage && (
              <div className="flex justify-center my-4">
                <img
                  src={`http://localhost:5000${profileImage}`}
                  alt="User profile"
                  className="mt-8 w-48 h-48 object-cover rounded-full border border-gray-600"
                />
              </div>
            )}

          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end mt-4">
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button
            onClick={onClose}
            className="mr-2 bg-red-500 hover:bg-red-700 text-stone-800 font-bold py-2 px-4 rounded"
          >
            Cancelar
          </button>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button
            onClick={onSave}
            className="bg-amber-400 hover:bg-amber-500 text-stone-800 font-bold py-2 px-4 rounded"
          >
            Salvar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;
