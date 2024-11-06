import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';

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
  const [fileName, setFileName] = useState('');

  const handleFileChange = e => {
    const file = e.target.files[0];
    setFileName(file ? file.name : '');
    onFileChange(e);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-stone-900 text-white rounded-lg">
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
            <div className="block w-full text-sm mb-2">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="block text-black font-medium bg-amber-400 border hover:bg-amber-600 border-gray-700 rounded-lg cursor-pointer py-2 text-center"
              >
                {fileName || 'Choose File'}
              </label>
            </div>
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
            Cancel
          </button>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button
            onClick={onSave}
            className="bg-amber-400 hover:bg-amber-500 text-stone-800 font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;
