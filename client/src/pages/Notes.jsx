import React, { useState, useEffect } from 'react';
import api from '@/api/axios';
import NoteModal from '@/components/NoteModal';
import UserProfile from '@/components/UserProfile';
import { toast } from 'react-toastify';

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
    <div className="p-4">
      <UserProfile />
      <h1 className="text-2xl">Suas Notas</h1>

      {/*/ Campo de busca */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Pesquisar notas..."
        className="border rounded p-2  mb-9 me-8  "
      />

      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button
        onClick={handleAddNote}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Adicionar Nota
      </button>

      

      {isSearching ? (
        <p>Carregando notas...</p>
      ) : notes.length > 0 ? (
        notes.map(note => (
          <div key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button
              onClick={() => handleEditNote(note.id)}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Editar
            </button>
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button
              onClick={() => handleDeleteNote(note.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Excluir
            </button>
          </div>
        ))
      ) : (
        <p>Nenhuma nota encontrada.</p>
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
