import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flower } from '../entities/flower.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { FlowerController } from '../controller/flower.controller';
import { FlowerService } from '../service/flower.service';
import { RedisService } from 'src/service/redis.service';

@Module({
  imports: [TypeOrmModule.forFeature([Flower]), EventEmitterModule.forRoot()],
  controllers: [FlowerController],
  providers: [FlowerService, RedisService],
  exports: [FlowerService],
})
export class FlowerModule {}
