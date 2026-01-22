import { Router } from 'express';
import { PrismaService } from '../services/PrismaService.js';

export const healthRouter = Router();

healthRouter.get('/', async (_req, res) => {
  try {
    await PrismaService.getInstance().$queryRaw`SELECT 1`;

    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'connected',
      },
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'disconnected',
      },
    });
  }
});
