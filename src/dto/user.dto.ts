import { IsString, MinLength, IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from 'src/entities/role.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @MinLength(4)
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  role: string;
}
