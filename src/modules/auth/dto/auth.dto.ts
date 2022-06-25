import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { GetUserDTO } from 'src/modules/user/dto';

/**
 * Auth DTO for User SignUp/login
 */
export class AuthDTO extends GetUserDTO {
  /**
   * User's password
   */
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  @ApiProperty({ example: '121212', description: "User's password." })
  password: string;
}
