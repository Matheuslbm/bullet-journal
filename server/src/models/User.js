import prisma from '../config/database.js';

export const createUser = async data => {
  return await prisma.user.create({ data });
};

export const findUserByEmail = async email => {
  return await prisma.user.findUnique({ where: { email } });
};
