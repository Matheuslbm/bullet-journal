import { Router } from 'express';
import {
  addNote,
  getNotes,
  deleteNote,
  updateNote,
  searchNotes,
  addNoteValidation,
  updateNoteValidation,
} from '../controllers/noteController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', authMiddleware, addNoteValidation, addNote);
router.get('/', authMiddleware, getNotes);
router.put('/:id', authMiddleware, updateNoteValidation, updateNote);
router.delete('/:id', authMiddleware, deleteNote);

// Rota para pesquisa de notas
router.get('/search', authMiddleware, searchNotes);

export default router;
