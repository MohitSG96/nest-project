import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class AuthDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  password: string;

  phone: string;

  name: string;
}
