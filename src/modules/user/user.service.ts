import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { UserDTO } from './dto';
import { User } from './user.entity';

/**
 * UserServices fot the User Module
 */
@Injectable()
export class UserService {
  /**
   * Initializes the User Services to connect with services
   * @param userRepository User Repository that performs operations on DB
   */
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: typeof User,
  ) {}

  /**
   * Creates and stores User in DB
   * @param user UserData for which the Details is to be saved in DB
   * @returns UserData after creation
   */
  async create(user: UserDTO) {
    return await this.userRepository.create(user);
  }

  /**
   * Finds the User by email ID
   * @param email DB user's email ID
   * @returns UserData
   */
  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  /**
   * Finds the User by unique ID
   * @param id DB User ID
   * @returns UserData
   */
  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }
}
