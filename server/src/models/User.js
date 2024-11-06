// Importa a instância do Prisma configurada para conectar ao banco de dados
import prisma from '../config/database.js';

// Função para criar um novo usuário no banco de dados
// Recebe um objeto 'data' com as informações do usuário e insere na tabela 'user'
export const createUser = async data => {
  return await prisma.user.create({ data });
};

// Função para encontrar um usuário pelo email
// Útil para verificar se um email já existe no sistema, especialmente na fase de login e registro
export const findUserByEmail = async email => {
  return await prisma.user.findUnique({ where: { email } });
};

// Função para atualizar um usuário pelo seu ID
// Recebe o 'id' do usuário e um objeto 'data' com os dados a serem atualizados
export const updateUserById = async (id, data) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};

// Função para buscar um usuário pelo ID
// Utilizada para encontrar um usuário específico, por exemplo, ao carregar informações de perfil
export const findUserById = async id => {
  return await prisma.user.findUnique({ where: { id } });
};

/* define as operações do modelo de usuário na base de dados usando o Prisma. Organiza as funções de manipulação do modelo User, usando a interface do Prisma para acessar o banco de dados e lidar com operações comuns como criação, busca e atualização de usuários. */
