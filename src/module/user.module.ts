// user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserController } from '../controller/user.controller';
import { UserService } from '../service/user.service';
import { RoleModule } from './role.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  RoleModule,
],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
