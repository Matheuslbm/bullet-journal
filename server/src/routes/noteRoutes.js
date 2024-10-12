import { Router } from 'express';
import { addNote, getNotes, deleteNote, updateNote, searchNotes} from '../controllers/noteController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


const router = Router();

router.post('/', authMiddleware, addNote);
router.get('/', authMiddleware, getNotes);
router.put('/:id', authMiddleware, updateNote);
router.delete('/:id', authMiddleware, deleteNote);

// Rota para pesquisa de notas
router.get('/search/:userId', authMiddleware, searchNotes)

export default router;
