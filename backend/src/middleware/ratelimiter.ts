import { Request, Response, NextFunction } from 'express';
import { createClient } from 'redis';

const redis = createClient({ url: "redis://127.0.0.1:6379" });

redis.connect()
  .then(() => console.log('Rate Limiter: Connected to Redis'))
  .catch(console.error);

export const rateLimiter = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const ip = req.ip;
  const limit = 20;
  const countlimit = `count:${ip}`;
  const blockKey = `blocked:${ip}`;
  
  try {
    const isblocked = await redis.get(blockKey);
    if (isblocked) {
      res.status(429).send('You are blocked');
      return;
    }

    let count = await redis.incr(countlimit);
    if (count === 1) {
      await redis.expire(countlimit, 60);
    }

    if (count > limit) {
      await redis.set(blockKey, '1', { EX: 600 });
      res.status(429).send('You are blocked');
      return;
    }

    next();
  } catch (error) {
    console.error('Rate limiter error:', error);
    res.status(500).send('Internal Server Error');
  }
}; 
