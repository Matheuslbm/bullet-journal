// Importa o Router do Express para definir rotas de notas
// Importa funções do noteController para gerenciar operações de notas

import { Router } from 'express';
import {
  addNote,
  getNotes,
  deleteNote,
  updateNote,
  searchNotes,
  addNoteValidation,
  updateNoteValidation,
} from '../controllers/noteController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

// Rota para adicionar uma nova nota
// A rota é protegida pelo authMiddleware e valida o corpo da requisição com addNoteValidation
router.post('/', authMiddleware, addNoteValidation, addNote);

// Rota para obter todas as notas do usuário autenticado
// authMiddleware protege a rota para que apenas usuários logados tenham acesso
router.get('/', authMiddleware, getNotes);

// Rota para atualizar uma nota existente
// authMiddleware protege a rota e updateNoteValidation valida o corpo da requisição
// :id é um parâmetro dinâmico que representa o ID da nota a ser atualizada
router.put('/:id', authMiddleware, updateNoteValidation, updateNote);

// Rota para deletar uma nota específica
// authMiddleware protege a rota e :id é o ID da nota a ser deletada
router.delete('/:id', authMiddleware, deleteNote);

// Rota para pesquisa de notas
router.get('/search', authMiddleware, searchNotes);

export default router;

/*noteRoutes.js, define as rotas para operações relacionadas às notas na aplicação Bullet Journal, como adicionar, obter, atualizar, deletar e pesquisar notas, garantindo que apenas usuários autenticados possam acessar e manipular suas próprias notas, e adiciona uma rota de pesquisa para localizar notas específicas com base em critérios. */