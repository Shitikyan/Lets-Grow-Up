// user.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { AuthService } from 'src/service/auth.service';
import { CreateUserDto, LoginDto } from 'src/dto/user.dto';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async registerUser(@Body() userData: CreateUserDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.userService.createUser({
      ...userData,
      password: hashedPassword,
    });

    const token = await this.authService.generateToken(user);

    return { user, token };
  }

  @Post('login')
  async loginUser(@Body() credentials: LoginDto): Promise<any> {
    const { username, password } = credentials;

    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = await this.authService.login(user);
    return { token };
  }
}
