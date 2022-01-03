import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Authentication is missing');
  }
  const token = authHeader.split(' ')[1];

  try {
    verify(token, authConfig.jwt.secret);
    return next();
  } catch (error) {
    throw new AppError('Token invalid');
  }
}
