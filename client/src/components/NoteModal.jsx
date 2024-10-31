import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const NoteModal = ({
  isOpen,
  onClose,
  title,
  setTitle,
  content,
  setContent,
  onSave,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
      className='bg-stone-900 text-white max-w-lg md:max-w-2xl lg:max-w-3xl w-full rounded-lg '
      style={{
        maxHeight: '90vh', // Limite de altura
        overflowY: 'auto', // Scroll interno
      }}
      >
        <DialogHeader>
          <DialogTitle>How was your day?</DialogTitle>
          <DialogDescription>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="bg-stone-600 border border-gray-700 text-white text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 mb-2 mt-5"
            />
            <textarea
              placeholder="Have you achieved any goals?"
              value={content}
              onChange={e => setContent(e.target.value)}
              className="bg-stone-600 border border-gray-700 text-white text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 mb-2 h-[500px] md:h-[700px]"
            />
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

export default NoteModal;
