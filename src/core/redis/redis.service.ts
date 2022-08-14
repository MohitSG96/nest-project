import { Inject, Injectable } from '@nestjs/common';
import { REDIS } from '../constants';
import { RedisClient } from './redis.provider';

interface ScoreFilter {
  min?: number;
  max?: number;
  LIMIT?: {
    offset: number;
    count: number;
  };
}

@Injectable()
export class RedisService {
  constructor(@Inject(REDIS) private readonly redisRepo: RedisClient) {}

  private handleResponse(cb: (...args: any) => void, opts?: any) {
    return (err, result) => {
      if (err) {
        return cb && cb(err);
      }

      if (opts?.parse) {
        const isMultiple = Array.isArray(result);
        if (!isMultiple) {
          result = [result];
        }

        result = result.map((_result) => {
          try {
            _result = JSON.parse(_result);
          } catch (e) {
            return cb && cb(e);
          }
          return _result;
        });

        result = isMultiple ? result : result[0];
      }

      return cb && cb(null, result);
    };
  }

  incrScore(key: string, member: string | number, value = 0) {
    return new Promise((resolve, reject) => {
      this.redisRepo.zincrby(
        key,
        value,
        member.toString(),
        this.handleResponse((error, result) =>
          error ? reject(error) : resolve(result),
        ),
      );
    });
  }

  getUserScore(key: string, member: string | number) {
    return new Promise((resolve, reject) => {
      this.redisRepo.zscore(
        key,
        member.toString(),
        this.handleResponse((err, result) =>
          err ? reject(err) : resolve(result),
        ),
      );
    });
  }

  getScoreBoard(key: string, filter: ScoreFilter) {
    const min = filter.min ?? 0;
    const max = filter.max ?? 999999;
    return new Promise((resolve, reject) => {
      this.redisRepo.zrevrange(
        key,
        min,
        max,
        'WITHSCORES',
        this.handleResponse((err, result) =>
          err ? reject(err) : resolve(result),
        ),
      );
    });
  }
}
