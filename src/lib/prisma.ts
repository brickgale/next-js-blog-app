import { PrismaClient } from '@prisma/client';
import config from '../../prisma/prisma.config';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const prisma = globalForPrisma.prisma || new PrismaClient(config);

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;