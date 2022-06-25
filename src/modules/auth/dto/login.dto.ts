import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

/**
 * Auth DTO for User login
 */
export class LoginDTO {
  /**
   * User's email
   */
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'example@gmail.com', description: "User's Email" })
  email: string;

  /**
   * User's password
   */
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  @ApiProperty({ example: '121212', description: "User's password." })
  password: string;
}
