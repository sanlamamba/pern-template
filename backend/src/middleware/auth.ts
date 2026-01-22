import type { Request, Response, NextFunction } from 'express';
import { getAuth } from '@clerk/express';

export interface AuthRequest extends Request {
  auth?: {
    userId: string;
    sessionId?: string;
  };
}

export function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const auth = getAuth(req);

  if (!auth.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  req.auth = {
    userId: auth.userId,
    sessionId: auth.sessionId ?? undefined,
  };

  next();
}

export function optionalAuth(
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) {
  const auth = getAuth(req);

  if (auth.userId) {
    req.auth = {
      userId: auth.userId,
      sessionId: auth.sessionId ?? undefined,
    };
  }

  next();
}
