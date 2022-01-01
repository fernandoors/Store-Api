import AppError from '@shared/errors/AppError';
import type { Request, Response, NextFunction } from 'express';

function errors(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}

export default errors;
