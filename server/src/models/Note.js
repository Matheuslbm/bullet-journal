import prisma from '../config/database.js';

export const createNote = async data => {
  return await prisma.note.create({ data });
};

export const findAllNotes = async (userId) => {
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

export const updateNote = async (id, data) => {
  return await prisma.note.update({
    where: { id },
    data,
  });
};

export const deleteNote = async (id) => {
  return await prisma.note.delete({ where: { id } });
};
