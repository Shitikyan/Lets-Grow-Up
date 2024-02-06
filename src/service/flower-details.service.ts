import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Flower } from '../entities/flower.entity';
import { RedisService } from './redis.service';
import { FlowerDetails } from 'src/entities/flower-details.entity';

@Injectable()
export class FlowerDetailsService {
  constructor(
    @InjectRepository(FlowerDetails)
    private flowerDetailsRepository: Repository<FlowerDetails>,
    private readonly redisService: RedisService,
  ) {}

  async getAllFlowers(): Promise<FlowerDetails[]> {
    return this.flowerDetailsRepository.find();
  }
  async getFlowerDetailsById(id: number): Promise<FlowerDetails> {
    const flower = await this.flowerDetailsRepository.findOne({ where: { id } });
    if (!flower) {
      throw new NotFoundException(`FlowerDetails with ID ${id} not found`);
    }
    return flower;
  }
  async getFlowerById(id: number): Promise<FlowerDetails> {
    const flower = await this.flowerDetailsRepository.findOne({ where: { id } });
    if (!flower) {
      throw new NotFoundException(`FlowerDetails with ID ${id} not found`);
    }
    return flower;
  }

  async createFlowerDetails(data: Partial<FlowerDetails>): Promise<FlowerDetails> {
    const flower = this.flowerDetailsRepository.create(data);
    return this.flowerDetailsRepository.save(flower);
  }

}
