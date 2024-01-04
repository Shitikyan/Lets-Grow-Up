import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Flower } from '../entities/flower.entity';

@Injectable()
export class FlowerService {
  constructor(
    @InjectRepository(Flower)
    private flowerRepository: Repository<Flower>,
    private readonly eventEmitter: EventEmitter2, // Inject the event emitter

  ) {}

  async getAllFlowers(): Promise<Flower[]> {
    return this.flowerRepository.find();
  }

  async getFlowerById(id: number): Promise<Flower> {
    const flower = await this.flowerRepository.findOne({ where: { id } });
    if (!flower) {
      throw new NotFoundException(`Flower with ID ${id} not found`);
    }
    return flower;
  }


  async createFlower(data: Partial<Flower>): Promise<Flower> {
    const flower = this.flowerRepository.create(data);
    return this.flowerRepository.save(flower);
  }

  async addComment(id: number, comment: string): Promise<Flower> {
    const flower = await this.getFlowerById(id);
    flower.comments.push(comment);
    const updatedFlower = await this.flowerRepository.save(flower);

    // Trigger 'flower.commentAdded' event after adding the comment
    this.eventEmitter.emit('flower.commentAdded', {
      comment,
      flowerId: id,
      flower: updatedFlower, // Optionally send the updated flower data
    });

    return updatedFlower;
  }
}
