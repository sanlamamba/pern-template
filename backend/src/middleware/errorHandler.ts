import type { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  status?: number;
}

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Internal server error',
  });
};

export const createError = (message: string, status = 500): AppError => {
  const err: AppError = new Error(message);
  err.status = status;
  return err;
};
