import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';
import { FlowerDetails } from 'src/entities/flower-details.entity';
import { FlowerService } from './flower.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly flowerService: FlowerService,
  ) {}

  async createOrder(
    user: User,
    flowerDetails: FlowerDetails,
    count: number,
  ): Promise<Order> {
    console.log(user);
    if (!this.isShoper(user)) {
      throw new BadRequestException('Only Shoper can create orders.');
    }

    const order = this.orderRepository.create({
      user,
      flowerDetails,
      count,
    });

    const savedOrder = await this.orderRepository.save(order);

    const flowersToUpdate =
      await this.flowerService.getAllFlowersByFlowerDetailsId(flowerDetails.id);
    const selectedFlowers = flowersToUpdate.slice(0, count);

    for (const flower of selectedFlowers) {
      flower.order = savedOrder;
      await this.flowerService.updateFlower(flower);
    }

    return savedOrder;
  }

  private isShoper(user: User): boolean {
    return user.role && user.role.name === 'Shoper';
  }
}
