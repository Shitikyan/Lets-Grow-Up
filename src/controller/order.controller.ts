import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { User } from '../entities/user.entity';
import { FlowerDetails } from 'src/entities/flower-details.entity';
import { FlowerService } from 'src/service/flower.service';
import { AuthGuard } from '@nestjs/passport';
import { FlowerDetailsService } from 'src/service/flower-details.service';

@Controller('orders')
@UseGuards(AuthGuard('jwt'))
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly flowerDetailsService: FlowerDetailsService,

  ) {}

  @Post()
  async createOrder(
    @Request() req,
    @Body('flowerDetailsId') flowerDetailsId: number,
    @Body('count') count: number,
  ): Promise<any> {
    const user: User = req.user;

    try {
      const flowerDetails: FlowerDetails = await this.flowerDetailsService.getFlowerDetailsById(flowerDetailsId);

      if (!flowerDetails) {
        throw new NotFoundException('Flower not found');
      }

      const order = await this.orderService.createOrder(user, flowerDetails, count);
      return { success: true, order };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
