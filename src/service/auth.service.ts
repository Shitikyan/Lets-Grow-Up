import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { LoginDto } from 'src/dto/user.dto';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';

interface JwtPayload {
  username: string;
  sub: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, inputPassword: string): Promise<any> {
    const user = await this.userService.findOne({ where: { username } });
    console.log(user, 'LLL<<<<');

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordsMatch = await bcrypt.compare(
      inputPassword.trim(),
      user.password.trim(),
    );

    if (!passwordsMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
      payload,
    };
  }

  async login(loginDto: LoginDto) {
    const { username } = loginDto;
    const user = await this.userService.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    const decodedToken = this.jwtService.decode(accessToken);
    console.log(decodedToken);

    return { access_token: accessToken };
  }

  async generateToken(user: User): Promise<string> {
    const payload: JwtPayload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async validateJwt(payload: JwtPayload): Promise<any> {
    const { sub } = payload;
    console.log('vaaaaaa');
    const user = await this.userService.getById(sub);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
  }
}
