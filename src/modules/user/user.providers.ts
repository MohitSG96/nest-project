import { USER_REPOSITORY } from 'src/core/constants';
import { User } from 'src/schemas/user.entity';

/**
 * Creates User Provider to be used through out the app
 */
export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
