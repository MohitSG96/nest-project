import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

/**
 * Auth DTO for User SignUp/login
 */
export class AuthDTO {
  /**
   * User's password
   */
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  @ApiProperty({ example: '121212', description: "User's password." })
  password: string;

  /**
   * User's email
   */
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'exapmle@gmail.com', description: 'User Email' })
  readonly email: string;

  /**
   * User's name
   */
  @IsString()
  @ApiProperty({
    example: 'Alex',
    description: 'User Name',
    required: true,
  })
  readonly name: string;

  /**
   * User's phone
   */
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(13)
  @ApiProperty({
    example: 7894561230,
    description: 'User Phone',
    required: false,
  })
  readonly phone?: string;

  /**
   * User is active or not
   */
  @IsOptional()
  @ApiProperty({
    example: true,
    description: 'User is active or not',
    required: false,
  })
  readonly isActive?: boolean;
}
