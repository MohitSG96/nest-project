import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import schemas from 'src/schemas';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';

dotenv.config();
/**
 * Database provider for Database Module
 */
export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config: any;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize({
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
        ...config,
      });
      sequelize.addModels(schemas);
      await sequelize.sync();
      return sequelize;
    },
  },
];
