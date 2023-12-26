// flower.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FlowerService } from '../service/flower.service';
import { Flower } from '../entities/flower.entity';

@Controller('flowers')
export class FlowerController {
  constructor(private flowerService: FlowerService) {}

  @Get()
  async getAllFlowers(): Promise<Flower[]> {
    return this.flowerService.getAllFlowers();
  }

  @Get(':id')
  async getFlowerById(@Param('id') id: number): Promise<Flower> {
    return this.flowerService.getFlowerById(id);
  }

  @Post()
  async createFlower(@Body() data: Partial<Flower>): Promise<Flower> {
    return this.flowerService.createFlower(data);
  }

  @Post(':id/comment')
  async addComment(@Param('id') id: number, @Body() comment: string): Promise<Flower> {
    return this.flowerService.addComment(id, comment);
  }
}
