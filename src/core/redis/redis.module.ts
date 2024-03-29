import { Module } from '@nestjs/common';
import { redisProviders } from './redis.provider';
import { RedisService } from './redis.service';

@Module({
  providers: [RedisService, ...redisProviders],
  exports: [...redisProviders, RedisService],
})
export class RedisModule {}
