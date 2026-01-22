import { db } from '../services/PrismaService.js';
import type { PrismaClient } from '@prisma/client';

export abstract class BaseRepository<T> {
  protected db: PrismaClient;

  constructor() {
    this.db = db;
  }

  abstract findById(id: string): Promise<T | null>;
  abstract findAll(): Promise<T[]>;
  abstract create(data: Partial<T>): Promise<T>;
  abstract update(id: string, data: Partial<T>): Promise<T>;
  abstract delete(id: string): Promise<T>;
}
