// Importa o Express para criar o servidor e o CORS para permitir requisições de outros domínios
// Importa as rotas de autenticação e notas que foram definidas em arquivos separados
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';

// Cria a instância do servidor Express
const app = express();

// Define a porta que o servidor vai escutar; usa a porta do ambiente (5000 configurado no env) ou a 5000 como padrão
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors()); // Habilita CORS para permitir requisições de diferentes origens
app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições

// Rota simples para testar
app.get('/', (req, res) => {
  res.send('Bullet Journal API is running!');
});

// Rotas de auth(user) e de notas
app.use('/auth', authRoutes);
app.use('/notes', noteRoutes);
app.use('/uploads', express.static('uploads')); // Rota estática para servir arquivos de upload, as fotos de perfil

// Inicia o servidor e o coloca para "ouvir" a porta especificada
app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});
