import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/modules/user/user.service';

/**
 * JWTStrategy implementation via Passport to inject inside Protected Routes
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-auth') {
  /**
   * Initializes JWT with config and user services
   * @param config Global Config Service
   * @param userService User Service
   */
  constructor(
    readonly config: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWTKEY'),
      ignoreExpiration: false,
    });
  }

  /**
   * Used to validate the user is authorized or not
   * @param payload decoded JWT token
   * @returns User Data from DB
   */
  async validate(payload: any) {
    const user = await this.userService.findOneById(payload.sub);
    if (!user || !user.id) {
      return null;
    }
    delete user.cryptPass;
    return user;
  }
}
