import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-auth') {
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
  async validate(payload: any) {
    const user = await this.userService.findOneById(payload.sub);
    if (!user || !user.id) {
      return null;
    }
    delete user.cryptPass;
    return user;
  }
}
