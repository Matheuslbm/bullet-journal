import { check, validationResult } from 'express-validator';
import {
  createUser,
  findUserByEmail,
  updateUserById,
  findUserById,
} from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//Validação para a rota de  registro
export const registerValidation = [
  check('name').notEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Valid email is required'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

export const register = async (req, res) => {
  //Validação
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //Logica de registro
  const { name, email, password } = req.body;

  try {
    //Verificar se o email ja esta em uso
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    // criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // criar o usuário
    const user = await createUser({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during registration' });
  }
};

// validação para a rota de login
export const loginValidation = [
  check('email').isEmail().withMessage('Valid email is required'),
  check('password').notEmpty().withMessage('Password is required'),
];

export const login = async (req, res) => {
  // validacao
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //logica de login
  const { email, password } = req.body;

  try {
    // verificar se o usuario existe
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ error: 'Invalid credentials' });

    // Comparar senha
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ error: 'Invalid credentials' });

    // gerar token jwt
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during login' });
  }
};

export const profile = async (req, res) => {
  try {
    const userId = req.userId; // Recuperado do middleware verifyToken
    const user = await findUserById(userId); // Buscando o usuário no banco de dados

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json({
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
    });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao carregar perfil do usuário' });
  }
};

// validação para rota de edição
export const updateProfileValidation = [
  check('email').optional().isEmail().withMessage('Valid email is required'),
  check('name').optional().notEmpty().withMessage('Name is required'),
  check('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be a least 6 characters long'),
];

// Função para editar perfil de usuário
export const updateProfile = async (req, res) => {
  //validacao
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;
  const userId = req.userId;
  const file = req.file;

  try {
    // busca o usuário no db
    const existingUser = await findUserById(userId);

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Atualiza os campos fornecidos
    const updatedData = {
      name: name || existingUser.name,
      email: email || existingUser.email,
    };

    // se a senha for fornecida, criptografa-a
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashedPassword;
    }

    // se houver um arquivo de imagem, armazene-o no campo profileImage
    if (file) {
      updatedData.profileImage = `/uploads/${file.filename}`; // onde armazena imagem
    }

    // atualiza o usuário no db
    const updatedUser = await updateUserById(userId, updatedData);
    res.json({
      message: 'Profile updated successfully',
      user: {
        ...updatedUser,
        profileImage: updatedData.profileImage || existingUser.profileImage, // Retorna o caminho da imagem
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Error updating profile' });
  }
};
