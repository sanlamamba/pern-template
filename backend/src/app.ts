import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { clerkMiddleware } from '@clerk/express';
import { errorHandler } from './middleware/errorHandler.js';
import { healthRouter } from './routes/health.js';

export const app = express();

// Security
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));

// Rate limiting
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
}));

// Body parsing
app.use(express.json());

// Auth
app.use(clerkMiddleware());

// Routes
app.use('/api/health', healthRouter);

// Error handling
app.use(errorHandler);

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});
