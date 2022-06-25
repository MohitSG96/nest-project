import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { GetUserDTO, UserDTO } from './dto';
import { User } from './user.entity';
import { UserService } from './user.service';

/**
 * User's Business logic class
 */
@UseGuards(JwtGuard)
@ApiExtraModels(UserDTO)
@ApiExtraModels(GetUserDTO)
@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Get the detail of logged-in user
   * @param user User from request JWT Token
   * @returns User Object
   */
  @Get('me')
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(GetUserDTO),
    },
  })
  @ApiResponse({
    status: 401,
    description: 'unauthorized User',
  })
  async getMe(@GetUser() user: User): Promise<{ data: User; msg: string }> {
    return { data: user, msg: 'User Info' };
  }
}
