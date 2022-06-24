import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class AuthDTO {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'example@email.com',
    description: "User's email.",
  })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  @ApiProperty({ example: '121212', description: "User's password." })
  password: string;

  @ApiProperty({
    example: 1234567890,
    description: "User's Phone Number",
    required: false,
  })
  phone: string;

  @ApiProperty({
    example: 'Alex',
    description: "User's Name.",
    required: false,
  })
  name: string;
}
