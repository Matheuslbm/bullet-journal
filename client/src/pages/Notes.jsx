import React, { useState, useEffect } from 'react';
import api from '@/api/axios';
import NoteModal from '@/components/NoteModal';

import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';
import NavNotes from '@/components/NavNotes';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState({ title: '', content: '' });
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const fetchNotes = async (query = '') => {
    try {
      setIsSearching(true);
      const response = await api.get('/notes/search', {
        params: { search: query },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, //token contem userId
        },
      });
      setNotes(response.data);
      setIsSearching(false);
      console.log('Resposta da API:', response.data);
      setNotes(response.data);
    } catch (err) {
      console.error('erro ao buscar notas', err);
      toast.error('Falha ao carregar notas.', {
        className: 'bg-gray-800 text-white',
      });
      setIsSearching(false);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSearch = e => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() !== '') {
      fetchNotes(query);
    } else {
      fetchNotes();
    }
  };

  const handleAddNote = () => {
    setCurrentNote({ title: '', content: '' });
    setEditingNoteId(null);
    setIsModalOpen(true);
  };

  const handleSaveNote = async () => {
    if (!currentNote.title || !currentNote.content) {
      toast.error('O título e o conteúdo são obrigatórios.', {
        className: 'bg-gray-800 text-white',
      });
      return;
    }
    try {
      if (editingNoteId) {
        await api.put(`/notes/${editingNoteId}`, currentNote, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // envia o token jwt para a autenticação
          },
        });
        setNotes(
          notes.map(note =>
            note.id === editingNoteId ? { ...note, ...currentNote } : note
          )
        );
      } else {
        const response = await api.post('/notes', currentNote, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // envia o token jwt para a autenticação
          },
        });
        setNotes([response.data, ...notes]);
      }
      toast.success('Nota salva com sucesso!', {
        className: 'bg-gray-800 text-white',
      });
      setIsModalOpen(false);
    } catch (err) {
      toast.error('Erro ao salvar a nota.', {
        className: 'bg-gray-800 text-white',
      });
    }
  };

  const handleEditNote = id => {
    console.log('editando nota com id:', id);
    const note = notes.find(note => note.id === id);
    setCurrentNote({ title: note.title, content: note.content });
    setEditingNoteId(id);
    setIsModalOpen(true);
  };

  const handleDeleteNote = async id => {
    console.log('Deletando nota com id:', id);
    try {
      await api.delete(`/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // envia o token jwt para a autenticação
        },
      });
      setNotes(notes.filter(note => note.id !== id));
      toast.success('Nota deletada com sucesso!', {
        className: 'bg-gray-800 text-white',
      });
    } catch (err) {
      toast.error('Erro ao deletar nota.', {
        className: 'bg-gray-800 text-white',
      });
    }
  };

  return (
    <div className="p-4 pt-28 bg-stone-900 min-h-screen">
      <NavNotes />
      <h1 className="text-2xl text-white mb-6">Suas Notas</h1>

      {/*/ Campo de busca */}
      <div className='flex items-center gap-4 mb-6'>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Pesquisar notas..."
          className="border rounded p-2 py-4 "
        />
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button
          onClick={handleAddNote}
          className="bg-amber-400 hover:bg-amber-500 text-stone-700 font-semibold py-4 px-4 rounded"
        >
          Adicionar Nota
        </button>
      </div>

      {isSearching ? (
        <p className='text-white'>Carregando notas...</p>
      ) : notes.length > 0 ? (
        <div className='grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {notes.map(note => (
            <div
              key={note.id}
              className="border border-gray-300 rounded p-4 bg-stone-800 shadow-lg"
            >
              <p className="text-sm text-gray-500 italic mb-2">
                {new Date(note.date).toLocaleDateString()}
              </p>
              <h3 className="text-xl font-medium mb-2 text-white">{note.title}</h3>
              <p className="text-base mb-4 p-4 break-words whitespace-pre-wrap text-white">
                {note.content}
              </p>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => handleEditNote(note.id)}
                  className="text-amber-500 hover:text-amber-700  py-2 px-1 "
                >
                  <FaEdit className="text-xl" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteNote(note.id)}
                  className="text-red-500 hover:text-red-700 py-2 px-1"
                >
                  <FaTrash className="" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-white'>Nenhuma nota encontrada.</p>
      )}

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentNote.title}
        setTitle={title => setCurrentNote({ ...currentNote, title })}
        content={currentNote.content}
        setContent={content => setCurrentNote({ ...currentNote, content })}
        onSave={handleSaveNote}
      />
    </div>
  );
};

export default Notes;
