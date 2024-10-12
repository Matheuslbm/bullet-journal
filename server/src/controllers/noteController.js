import {
  createNote,
  findAllNotes,
  updateNoteById,
  deleteNoteById,
  searchNotesInDb,
} from '../models/Note.js';

export const addNote = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.userId; // userId obtido pelo middleware de autenticação

  try {
    const note = await createNote({ title, content, userId });
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: 'Error creating note' });
  }
};

export const getNotes = async (req, res) => {
  const { userId } = req;

  try {
    const notes = await findAllNotes(userId);
    console.log(notes);
    res.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Error fetching notes' });
  }
};

// Função para buscar notas
export const searchNotes = async (req, res) => {
  const { userId } = req.params;
  const { searchTerm } = req.query;

  try {
    const notes = await searchNotesInDb(userId, searchTerm);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Error searching notes' });
  }
};

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const userId = req.userId; // userId obtido pelo middleware de autenticação

  try {
    // Verifique se a nota pertence ao usuário autenticado
    const note = await updateNoteById(id, { title, content, userId });
    if (!note)
      return res
        .status(404)
        .json({ error: 'Note not found or not authorized' });

    res.status(200).json({ message: 'Note updated successfully', note });
  } catch (error) {
    res.status(400).json({ error: 'Error updating note' });
  }
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId; // userId obtido pelo middleware de autenticação

  try {
    // Verifique se a nota pertence ao usuário autenticado antes de deletar
    const note = await deleteNoteById(id, userId);
    if (!note)
      return res
        .status(404)
        .json({ error: 'Note not found or not authorized' });

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting note' });
  }
};
