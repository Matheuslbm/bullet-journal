// Importa o módulo jwt para verificação do token JWT
import jwt from 'jsonwebtoken';

// Middleware de autenticação que verifica o token do usuário
export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];  // // Extrai o token do cabeçalho Authorization (padrão "Bearer token")
  if (!token) return res.status(403).json({ error: 'No token provided' }); // Verifica se o token foi fornecido

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {  // Verifica a validade do token usando a chave secreta JWT
    if (err)
      return res.status(403).json({ error: 'Failed to authenticate token' });
    //console.log('decoded token:', decoded);
    req.userId = decoded.id;
    next();
  });
};

/* verifica a presença e validade de um token JWT nos cabeçalhos das requisições protegidas. Este middleware é essencial para proteger as rotas que requerem autenticação, garantindo que apenas usuários com um token válido possam acessar as informações ou funcionalidades protegidas. */