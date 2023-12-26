// user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flower } from '../entities/flower.entity';
import { FlowerController } from '../controller/flower.controller';
import { FlowerService } from '../service/flower.service';

@Module({
  imports: [TypeOrmModule.forFeature([Flower])],
  controllers: [FlowerController],
  providers: [FlowerService],
})
export class FlowerModule {}
