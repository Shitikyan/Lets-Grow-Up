import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { LoginDto } from 'src/dto/user.dto';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';

interface JwtPayload {
  username: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password: userPassword, ...result } = user;
      return result;
    }
    return null;
  }
  async login(loginDto: LoginDto) {
    const { username } = loginDto;
    const user = await this.userService.findOne({ username });

    const payload = { username: user.username };
    const accessToken = this.jwtService.sign(payload);
    return { access_token: accessToken };
  }
  async generateToken(user: User): Promise<string> {
    const payload = { username: user.username };
    return this.jwtService.sign(payload);
  }
  async validateJwt(payload: JwtPayload): Promise<any> {
    const { username } = payload;
    const user = await this.userService.findOne({ username });
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
  }
}
