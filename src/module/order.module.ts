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
import { FlowerDetailsService } from 'src/service/flower-details.service';
import { FlowerDetails } from 'src/entities/flower-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Flower, FlowerDetails]), RoleModule],
  providers: [OrderService, FlowerDetailsService, FlowerService, RedisService, UserService],
  controllers: [OrderController],
})
export class OrderModule {}
