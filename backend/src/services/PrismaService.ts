import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

export class PrismaService {
  static getInstance(): PrismaClient {
    if (!prisma) {
      prisma = new PrismaClient({
        log:
          process.env.NODE_ENV === 'development'
            ? ['query', 'error', 'warn']
            : ['error'],
      });
    }
    return prisma;
  }

  static async disconnect(): Promise<void> {
    if (prisma) {
      await prisma.$disconnect();
    }
  }
}

export const db = PrismaService.getInstance();
