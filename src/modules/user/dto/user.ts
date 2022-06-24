import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDTO {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly name: string;

  readonly phone?: string;

  readonly isActive?: boolean;

  readonly cryptPass?: string;
}
