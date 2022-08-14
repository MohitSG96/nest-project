import { ConfigService } from '@nestjs/config';
import { REDIS } from '../constants';
// import Redis from 'ioredis';
import * as Redis from 'redis';
import { Logger } from '@nestjs/common';

export type RedisClient = Redis.RedisClient;

export const redisProviders = [
  {
    provide: REDIS,
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => {
      let redisURL = config.get('REDIS_URL');
      // let host, post;
      const redisUserName = config.get('REDIS_USER');
      const redisPassword = config.get('REDIS_PASSWORD');
      const host = config.get('REDIS_HOST', 'localhost');
      const port = config.get('REDIS_PORT', '6379');

      if (!redisURL) {
        redisURL = `redis://${host}:${port}`;
      }

      const redisClient = Redis.createClient({
        port: port,
        host: host,
        password: redisPassword,
      });

      redisClient.on('connect', () => {
        Logger.log('Redis connected.');
      });

      redisClient.on('error', (error) => {
        Logger.error(error, 'Redis connection Error');
      });

      redisClient.on('close', (e) => {
        Logger.error(e, 'Redis connection Closed');
      });

      return redisClient;
    },
  },
];
