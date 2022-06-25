import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';

/**
 * Database Module to access all other modules
 */
@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
