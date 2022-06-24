import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { AuthDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly userService: UserService,
  ) {}
  async login(dto: AuthDTO) {
    const user = await this.userService.findOneByEmail(dto.email);

    // If user does not exist throw Exception
    if (!user) {
      throw new ForbiddenException('Credential Incorrect');
    }

    const pwMatches = await bcrypt.compare(dto.password, user.cryptPass);
    if (!pwMatches) {
      throw new ForbiddenException('Credential Incorrect');
    }

    return user;
  }

  async signup(dto: AuthDTO) {
    // generate Hashed Password
    const hash = await bcrypt.hash(
      dto.password,
      Number(this.config.get('SALT')),
    );

    // save the new user
    try {
      const user = await this.userService.create({ ...dto, cryptPass: hash });

      return user;
    } catch (error) {}
  }

  signToken(userId: number, email: string) {
    const data = { sub: userId, email: email };
    const secret = this.config.get('JWTKEY');
    const expiresIn = this.config.get('TOKEN_EXPIRATION');
    return this.jwt.signAsync(data, { expiresIn, secret });
  }
}
