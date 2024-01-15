import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserController } from '../controller/user.controller';
import { UserService } from '../service/user.service';
import { RoleModule } from './role.module';
import { AuthService } from 'src/service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { JwtStrategy } from 'src/jwt.strategy';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RoleModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtStrategy],
})
export class UserModule {}
