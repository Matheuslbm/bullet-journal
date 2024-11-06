//Esse arquivo é responsável pela configuração e instância do Prisma Client, que se conecta ao banco de dados para executar as operações.

import { PrismaClient } from '@prisma/client';

// Cria uma nova instância do Prisma Client para interagir com o banco de dados
const prisma = new PrismaClient();

export default prisma;

// Essa instância (prisma) será usada para realizar consultas no banco de dados, como inserções, atualizações, exclusões e leituras.