import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';
import { Flower } from '../entities/flower.entity';
import { OrderService } from '../service/order.service';
import { OrderController } from '../controller/order.controller';
import { FlowerService } from 'src/service/flower.service';
import { RedisService } from 'src/service/redis.service';
import { UserService } from 'src/service/user.service';
import { RoleModule } from './role.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Flower]), RoleModule],
  providers: [OrderService, FlowerService, RedisService, UserService],
  controllers: [OrderController],
})
export class OrderModule {}
