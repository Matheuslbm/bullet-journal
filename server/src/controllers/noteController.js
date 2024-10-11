import {
  createNote,
  findAllNotes,
  updateNote,
  deleteNote,
} from '../models/Note.js';

export const addNote = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.userId

  try {
    const note = await createNote({ title, content, userId });
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: 'Error creating note' });
  }
};

export const getNotes = async (req, res) => {
  const { userId } = req.params;
  

  try {
    const notes = await findAllNotes(userId);
    console.log(notes)
    res.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error)
    res.status(500).json({ error: 'Error fetching notes' });
  }
};

// // Adicione funções para editar e excluir notas

