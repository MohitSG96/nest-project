import { ConfigService } from '@nestjs/config';
import { REDIS } from '../constants';
import Redis from 'ioredis';
import { Logger, Scope } from '@nestjs/common';

export type RedisClient = Redis;

export const redisProviders = [
  {
    provide: REDIS,
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => {
      // let redisURL = config.get('REDIS_URL');
      // let host, post;
      const redisUserName = config.get('REDIS_USER');
      const redisPassword = config.get('REDIS_PASSWORD');
      const host = config.get('REDIS_HOST', 'localhost');
      const port = config.get('REDIS_PORT', '6379');

      const redisClient = new Redis({
        host: host,
        port: port,
        username: redisUserName,
        password: redisPassword,
      });

      redisClient.on('error', (err) => console.log('Redis Client Error', err));

      redisClient.on('connect', () => {
        Logger.log('Redis connected.');
      });

      redisClient.on('error', (error) => {
        Logger.error(error, 'Redis connection Error');
      });

      return redisClient;
    },
  },
];
