import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
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
    private readonly config: ConfigService,
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

  /**
   * Updates the User ID
   * @param id User's ID to be updated
   * @param user User Data
   * @returns UserData Object
   */
  async findOneAndUpdate(id: number, user: Partial<UserDTO>) {
    return (
      await this.userRepository.update<User>(user, {
        returning: true,
        where: { id },
      })
    )?.[1]?.[0];
  }

  /**
   * Updates the user's password
   * @param id User ID
   * @param password User's new password
   * @returns UserData Object
   */
  async updatePassword(id: number, password: string) {
    // generate Hashed Password
    const hash = await bcrypt.hash(password, Number(this.config.get('SALT')));

    try {
      const user = await this.userRepository.update<User>(
        { cryptPass: hash },
        { returning: true, where: { id } },
      );
      return user?.[1]?.[0];
    } catch (error) {
      throw error;
    }
  }

  /**
   * Deletes User from DB
   * @param id User ID
   * @returns Deleted User or not
   */
  async deleteUser(id: number) {
    return this.userRepository.destroy<User>({ where: { id } });
  }
}
