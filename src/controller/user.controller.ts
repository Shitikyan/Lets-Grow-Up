// user.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from 'src/dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(@Body() userData: CreateUserDto): Promise<User> {
    return this.userService.createUser(userData);
  }
}
