import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDTO {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'exapmle@gmail.com',
    description: 'User Email',
    required: false,
  })
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'Alex',
    description: 'User Name',
    required: false,
  })
  readonly name: string;

  @ApiProperty({
    example: 7894561230,
    description: 'User Phone',
    required: false,
  })
  readonly phone?: string;

  @ApiProperty({
    example: true,
    description: 'User is active or not',
    required: false,
  })
  readonly isActive?: boolean;

  @ApiProperty({
    example: 'hashed-password',
    description: 'Password',
    required: false,
  })
  readonly cryptPass?: string;
}
