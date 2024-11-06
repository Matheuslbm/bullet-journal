// Importa a instância do Prisma configurada para conectar ao banco de dados
import prisma from '../config/database.js';

// Função para criar uma nova nota no banco de dados
// Recebe um objeto 'data' contendo o título, conteúdo, data e o ID do usuário (userId)
export const createNote = async data => {
  return await prisma.note.create({ data });
};

// Função para buscar todas as notas de um usuário específico
// Filtra as notas pelo 'userId', selecionando apenas id, date, title, e content, e ordena por data em ordem decrescente
export const findAllNotes = async userId => {
  return await prisma.note.findMany({
    where: { userId: Number(userId) },
    select: {
      id: true,
      date: true,
      title: true,
      content: true,
    },
    orderBy: {
      date: 'desc',
    },
  });
};

// Função para realizar uma busca nas notas pelo 'userId' e termo de busca 'search'
// Procura no título e no conteúdo das notas usando 'contains' e ignorando maiúsculas e minúsculas
export const searchNotesInDb = async (userId, search) => {
  const searchFilter = search
    ? {
        OR: [
          {
            title: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            content: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      }
    : {}; // se nao houver busca, nao adiciona nenhum filtro.

  return await prisma.note.findMany({
    where: {
      userId: Number.parseInt(userId),
      ...searchFilter,
    },
    orderBy: { date: 'desc' },
  });
};

// Função para atualizar uma nota pelo seu ID
// Verifica se o 'userId' do 'data' corresponde ao dono da nota, e atualiza título e conteúdo
export const updateNoteById = async (id, data) => {
  return await prisma.note.update({
    where: {
      id: Number(id),
      userId: data.userId, //verifica se o usuário é o dono da nota
    },
    data: {
      title: data.title,
      content: data.content,
    },
  });
};

// Função para deletar uma nota pelo seu ID e userId
// Usa 'deleteMany' para garantir que apenas notas do usuário logado possam ser deletadas
export const deleteNoteById = async (id, userId) => {
  return await prisma.note.deleteMany({
    where: {
      id: Number(id),
      userId: userId, // verifica se o usuário é o dono da nota
    },
  });
};

/*
define as operações para manipulação de notas no banco de dados usando o Prisma. 
Este arquivo organiza as operações de manipulação de notas, garantindo que apenas o usuário dono das notas possa atualizar ou deletá-las.
Cada função encapsula uma ação específica no banco de dados, promovendo um código limpo e organizado.
*/
