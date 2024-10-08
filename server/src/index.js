import express from 'express';

import cors from 'cors';
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

// Rota simples para testar
app.get('/', (req, res) => {
  res.send('Bullet Journal API is running!');
});

app.listen(3002, () => {
  console.log(`server is running on port http://localhost:${3002}`);
});
