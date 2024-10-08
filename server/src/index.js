import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js'

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes)

// Rota simples para testar
app.get('/', (req, res) => {
  res.send('Bullet Journal API is running!');
});

app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});
