import { Router } from 'express';
import { addNote, getNotes } from '../controllers/noteController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', authMiddleware, addNote);
router.get('/:userId', authMiddleware, getNotes);
// Add rotas para update e delete

export default router;