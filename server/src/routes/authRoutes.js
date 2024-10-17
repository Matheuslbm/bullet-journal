import { Router } from 'express';
import {
  login,
  register,
  registerValidation,
  loginValidation,
  updateProfile,
  updateProfileValidation,
  profile
} from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import multer from 'multer';
import path from 'path';

const router = Router();

// Configura o Multer para armazenar imagens de perfil
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // define o caminho para armazenar imagens
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // gera nome unico para o arquivo
  },
});

export const upload = multer({ storage });

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.put(
  '/edit',
  authMiddleware,
  upload.single('profileImage'),
  updateProfileValidation,
  updateProfile
);
router.get('/profile', authMiddleware, profile)

export default router;
