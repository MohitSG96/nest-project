import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() body: AuthDTO) {
    const user = await this.authService.signup(body);
    const { email, id, name } = user;
    const token = await this.authService.signToken(id, email);
    return { msg: 'Signed Up', data: { email, id, name }, token };
  }

  @Post('login')
  async login(@Body() body: AuthDTO) {
    const user = await this.authService.login(body);
    const { email, id, name } = user;
    const token = await this.authService.signToken(id, email);
    return { msg: 'Logged In', data: { email, id, name }, token };
  }
}
