import { Router } from 'express';
import { login, register, registerValidation, loginValidation } from '../controllers/authController.js';

const router = Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

export default router;
