import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { UserDTO } from './dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: typeof User,
  ) {}

  async create(user: UserDTO) {
    return await this.userRepository.create(user);
  }
  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }
}
