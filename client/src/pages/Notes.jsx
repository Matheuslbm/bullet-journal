import React from 'react';
import { useState, useEffect } from 'react';
import api from '@/api/axios';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get('/notes'); // obter notas
        setNotes(response.data);
      } catch (err) {
        setError('Falha ao carregar notas.');
      }
    };
    fetchNotes();
  });

  const handleAddNote = async () => {
    // Lógica para adicionar nota
    const newNote = { title: 'Nova nota', content: 'Conteúdo da Nota' };
    try {
      const response = await api.post('/notes', newNote); // chama o backend para adicionar
      setNotes([...notes, response.data]); // atualiza o estado com a nova nota
    } catch (err) {
      setError('Erro ao adicionar nota.');
    }
  };

  const handleEditNote = async id => {
    // Lógica para editar nota
    const updatedNote = {title: 'Nota Atualizada', content: 'Conteúdo atualizado'}
    try {
      await api.put(`/notes/${id}`, updatedNote); // Edita a nota no backend
      setNotes(notes.map(note => note.id === id ? {...note, ...updatedNote} : note)); // atualiza estado
    } catch (err) {
      setError('Erro ao editar nota.')
    }
  };

  const handleDeleteNote = async id => {
    // Lógica para excluir nota
    try {
      await api.delete(`/notes/${id}`); // deleta a nota no backend
      setNotes(notes.filter(note => note.id !== id)); // remove a nota do estado
    } catch (err) {
      setError('Erro ao deletar nota.')
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl">Suas Notas</h1>
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button onClick={handleAddNote} className="">
        Adicionar Nota
      </button>
      {error && <p className="text-red-500">{error}</p>}
      
      {/* Renderização das notas */}
      {notes.map(note => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button onClick={() => handleEditNote(note.id)}>Editar</button>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button onClick={() => handleDeleteNote(note.id)}>Excluir</button>
        </div>
      ))}
    </div>
  );
};

export default Notes;
