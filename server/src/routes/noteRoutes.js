import { Router } from 'express';
import { addNote, getNotes, deleteNote, updateNote} from '../controllers/noteController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


const router = Router();

router.post('/', authMiddleware, addNote);
router.get('/', authMiddleware, getNotes);
router.put('/:id', authMiddleware, updateNote);
router.delete('/:id', authMiddleware, deleteNote);
// Add rotas para update e delete

export default router;
