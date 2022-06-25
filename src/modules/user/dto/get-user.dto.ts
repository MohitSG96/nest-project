import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

/**
 * UserData to be returned
 */
export class GetUserDTO {
  /**
   * User's email
   */
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'exapmle@gmail.com',
    description: 'User Email',
    required: true,
  })
  readonly email: string;

  /**
   * User's name
   */
  @IsNotEmpty()
  @ApiProperty({
    example: 'Alex',
    description: 'User Name',
    required: false,
  })
  readonly name: string;

  /**
   * User's phone
   */
  @ApiProperty({
    example: 7894561230,
    description: 'User Phone',
    required: false,
  })
  readonly phone?: string;

  /**
   * User is active or not
   */
  @ApiProperty({
    example: true,
    description: 'User is active or not',
    required: false,
  })
  readonly isActive?: boolean;
}
