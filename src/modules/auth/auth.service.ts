import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { AuthDTO, LoginDTO } from './dto';

/**
 * AuthService to be accessed by AuthController to perform Operations
 */
@Injectable()
export class AuthService {
  /**
   * Initializes the Auth service
   * @param jwt JWTService
   * @param config Global Config Service
   * @param userService User Service
   */
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly userService: UserService,
  ) {}

  /**
   * Check's whether logged in user has the right credential to login
   * @param dto UserData like email and password
   * @returns UserData from DB
   */
  async login(dto: LoginDTO) {
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

  /**
   * Sign's up the user with hashing the password using `bcrypt`
   * @param dto UserData to be created in DB
   * @returns UserData after saved in DB
   */
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
    } catch (error) {
      throw error;
    }
  }

  /**
   * Creates JWT Token for the User
   * @param userId DB user ID
   * @param email DB user email
   * @returns JWT token
   */
  signToken(userId: number, email: string) {
    const data = { sub: userId, email: email };
    const secret = this.config.get('JWTKEY');
    const expiresIn = this.config.get('TOKEN_EXPIRATION');
    return this.jwt.signAsync(data, { expiresIn, secret });
  }
}
