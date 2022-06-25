import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDTO, LoginDTO } from './dto';

/**
 * Authorization Business Logic
 */
@ApiTags('Auth')
@Controller('auth')
@ApiExtraModels(AuthDTO)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Create new user
   * @param body User Data to create new User in DB
   * @returns User metadata with auth token
   */
  @Post('signup')
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(AuthDTO),
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid user data',
  })
  async signUp(@Body() body: AuthDTO) {
    const user = await this.authService.signup(body);
    const { email, id, name } = user;
    const token = await this.authService.signToken(id, email);
    return { msg: 'Signed Up', data: { email, id, name }, token };
  }

  /**
   * Logs in existing user using email and password
   * @param body User Data to login
   * @returns User metadata with auth token
   */
  @Post('login')
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(AuthDTO),
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid user data',
  })
  async login(@Body() body: LoginDTO) {
    const user = await this.authService.login(body);
    const { email, id, name } = user;
    const token = await this.authService.signToken(id, email);
    return { msg: 'Logged In', data: { email, id, name }, token };
  }
}
