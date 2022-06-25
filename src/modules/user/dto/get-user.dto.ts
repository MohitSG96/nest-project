import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

/**
 * UserData to be returned
 */
export class GetUserDTO {
  /**
   * User's ID
   */
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: 1,
    description: 'Users ID',
    required: false,
  })
  readonly id?: number;

  /**
   * User's email
   */
  @IsEmail()
  @IsOptional()
  @ApiProperty({
    example: 'exapmle@gmail.com',
    description: 'User Email',
    required: true,
  })
  readonly email?: string;

  /**
   * User's name
   */
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Alex',
    description: 'User Name',
    required: false,
  })
  readonly name?: string;

  /**
   * User's phone
   */
  @IsOptional()
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
