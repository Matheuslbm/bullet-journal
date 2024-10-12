import prisma from '../config/database.js';

export const createNote = async data => {
  return await prisma.note.create({ data });
};

export const findAllNotes = async userId => {
  return await prisma.note.findMany({
    where: { userId: Number(userId) },
    select: {
      date: true,
      title: true,
      content: true,
    },
    orderBy: {
      date: 'desc',
    },
  });
};

export const searchNotesInDb = async (userId, searchTerm) => {
  return await prisma.note.findMany({
    where: {
      userId: Number.parseInt(userId),
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: 'insensitive', // torna a busca case-insensitive
          },
        },
        {
          content: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
      ],
    },
    orderBy: {date: 'desc'},
  });
};

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

export const deleteNoteById = async (id, userId) => {
  return await prisma.note.deleteMany({
    where: {
      id: Number(id),
      userId: userId, // verifica se o usuário é o dono da nota
    },
  });
};
