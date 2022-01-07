import type { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';

import AppError from '@shared/errors/AppError';
import cacheConfig from '@config/cache';

async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const redisClient = new Redis({
      host: cacheConfig.config.redis.host,
      port: cacheConfig.config.redis.port,
      password: cacheConfig.config.redis.password || undefined,
    });

    const limiter = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: 'ratelimit',
      points: 5,
      duration: 1,
    });

    await limiter.consume(request.ip);
    return next();
  } catch (error) {
    throw new AppError('Too many requests.', 429);
  }
}
export default rateLimiter;
