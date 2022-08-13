import { Inject, Injectable } from '@nestjs/common';
import { REDIS } from '../constants';
import { RedisClient } from './redis.provider';

interface ScoreFilter {
  min?: string | number;
  max?: string | number;
  LIMIT?: {
    offset: number;
    count: number;
  };
}

@Injectable()
export class RedisService {
  constructor(@Inject(REDIS) private readonly redisRepo: RedisClient) {}

  incrScore(key: string, member: string | number, value = 0) {
    return this.redisRepo.zincrby(key, value, member.toString());
  }

  getUserScore(key: string, member: string | number) {
    return this.redisRepo.zscore(key, member.toString());
  }

  getScoreBoard(key: string, filter: ScoreFilter) {
    const min = filter.min ?? '-inf';
    const max = filter.max ?? '+inf';
    return this.redisRepo.zrevrange(key, min, max, 'WITHSCORES');
  }
}
