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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1800);

  //Função para monitorar a largura da tela
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1800);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
      toast.error('Failed to load notes.', {
        className: 'bg-amber-400 text-stone-700',
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
      toast.error('Title and content are required.', {
        className: 'bg-amber-400 text-stone-700',
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
      toast.success('Note saved successfully!', {
        className: 'bg-amber-400 text-stone-700',
      });
      setIsModalOpen(false);
    } catch (err) {
      toast.error('Error saving note.', {
        className: 'bg-amber-400 text-stone-700',
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
      toast.success('Note deleted successfully!', {
        className: 'bg-amber-400 text-stone-700',
      });
    } catch (err) {
      toast.error('Error deleting note.', {
        className: 'bg-amber-400 text-stone-700',
      });
    }
  };

  return (
    <div className="p-10 pt-28 bg-stone-900 min-h-screen">
      {/* enviando o handleSearch e o searchQuery para o NavNotes como props */}
      <NavNotes searchQuery={searchQuery} handleSearch={handleSearch} />
      <h1 className=" text-center text-3xl text-white mb-6 mt-4 font-light">Welcome, how was your day today? Did you achieve your goals?</h1>

      <hr className="border-gray-500 w-2/3 mx-auto my-4" />
      
      <div className="flex items-center gap-4 mb-6 w-full justify-center mx-auto">
       
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button
          onClick={handleAddNote}
          className="bg-amber-400 hover:bg-amber-500 text-stone-700 font-semibold py-4 px-28 rounded"
        >
          New feedback
        </button>
      </div>

      {isSearching ? (
        <p className="text-white">loading notes...</p>
      ) : notes.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {notes.map(note => (
            <div
              key={note.id}
              className="border border-gray-300 rounded p-4 bg-stone-800 shadow-lg"
            >
              <p className="text-sm text-gray-500 italic mb-2">
                {new Date(note.date).toLocaleDateString()}
              </p>
              <h3 className="text-xl font-medium mb-2 text-white">
                {note.title}
              </h3>

              {/* Conteudo */}
              <p className="text-base mb-4 break-words whitespace-pre-wrap text-white max-h-80 overflow-hidden">
                {note.content}
              </p>

              {/* Botão para abrir o modal com o conteúdo completo */}
              {(note.content.length > 900 || isMobile) && (
                <button
                  type="button"
                  className="text-amber-400  text-sm mb-4"
                  onClick={() => {
                    setCurrentNote({
                      title: note.title,
                      content: note.content,
                    });
                    setIsModalOpen(true);
                  }}
                >
                  Read more...
                </button>
              )}

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
                  <FaTrash/>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <img 
          src="/ilustration.png" 
          alt="Imagem central, sem notas." 
          className='w-[600px] mt-36 object-contain opacity-70'
          />
        </div>
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
