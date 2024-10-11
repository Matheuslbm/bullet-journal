import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

// Rota simples para testar
app.get('/', (req, res) => {
  res.send('Bullet Journal API is running!');
});

// Rotas de auth e de notas chamando
app.use('/auth', authRoutes);
app.use('/notes', noteRoutes);

// ouvindo a porta
app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});
