import { check, validationResult } from 'express-validator';
import { createUser, findUserByEmail } from '../models/User.js';
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
    const user = await createUser({ name, email, password: hashedPassword });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ token, user: {id: user.id, name: user.name, email: user.email} });
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()});
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
    res.json({ token, user: {id: user.id, name: user.name, email: user.email} });
  } catch (error) {
    res.status(500).json({ error: 'Server error during login' });
  }
};
