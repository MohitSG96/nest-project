import { CacheModule, Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TaskModule } from './modules/task/task.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
import { RedisModule } from './core/redis/redis.module';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({
      ttl: 60 * 60,
      isGlobal: true,
      store: redisStore,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    TaskModule,
    DatabaseModule,
    RedisModule,
  ],
})
export class AppModule {}
