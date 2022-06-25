import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { GetUserDTO } from './get-user.dto';

/**
 * User detail to be stored in DB
 */
export class UserDTO extends GetUserDTO {
  /**
   * User's encrypted password
   */
  @IsOptional()
  @ApiProperty({
    example: 'hashed-password',
    description: 'Password',
    required: false,
  })
  readonly cryptPass?: string;
}
