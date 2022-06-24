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

@UseGuards(JwtGuard)
@ApiExtraModels(UserDTO)
@ApiExtraModels(GetUserDTO)
@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
export class UserController {
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
  async getMe(
    @GetUser() user: User,
  ): Promise<{ data: User; msg: 'User Info' }> {
    return { data: user, msg: 'User Info' };
  }
}
