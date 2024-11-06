// Importa o Router do Express para definir rotas de autenticação
// Importa os controladores e validações do authController
// Importa o middleware de autenticação para proteger rotas que exigem login

import { Router } from 'express';
import {
  login,
  register,
  registerValidation,
  loginValidation,
  updateProfile,
  updateProfileValidation,
  profile,
} from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import multer from 'multer';


const router = Router();

// Configura o Multer para armazenar imagens de perfil
const storage = multer.memoryStorage();

export const upload = multer({ storage });

// Define as rotas de autenticação
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

// Rota de edição do perfil do usuário
router.put(
  '/edit',
  authMiddleware,
  upload.single('profileImage'),
  updateProfileValidation,
  updateProfile
);

// Rota de perfil do usuário, acessível apenas a usuários autenticados, para ediçao do perfil
router.get('/profile', authMiddleware, profile);

export default router;

/* define as rotas de autenticação da aplicação Bullet Journal. Ele configura as rotas para o registro, login, atualização de perfil e visualização do perfil do usuário, além de configurar o Multer para lidar com o upload de imagens de perfil. Incluindo as regras de validação */