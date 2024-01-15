import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';
import { Flower } from '../entities/flower.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createOrder(user: User, flower: Flower, count: number): Promise<Order> {
    console.log(user);
    if (!this.isShoper(user)) {
      throw new BadRequestException('Only Shoper can create orders.');
    }

    const order = this.orderRepository.create({
      user,
      flower,
      count,
      // Add other necessary properties for the order
    });

    return this.orderRepository.save(order);
  }

  private isShoper(user: User): boolean {
    // Check if the user has the role "Shoper"
    return user.role && user.role.name === 'Shoper';
  }
}
