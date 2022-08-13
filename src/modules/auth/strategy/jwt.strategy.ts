import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/modules/user/user.service';
import { User } from 'src/schemas/user.entity';

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
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
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
    const userCache = await this.cacheManager.get<User>(payload.sub);

    if (userCache) {
      return userCache;
    }

    const user = await this.userService.findOneById(payload.sub);
    if (!user || !user.id) {
      await this.cacheManager.set(payload.sub, user, { ttl: 60 * 60 });
      return null;
    }
    delete user.cryptPass;
    return user;
  }
}
