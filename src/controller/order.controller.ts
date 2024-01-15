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
import { Flower } from '../entities/flower.entity';
import { FlowerService } from 'src/service/flower.service';
import { UserService } from 'src/service/user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('orders')
@UseGuards(AuthGuard('jwt'))
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly flowerService: FlowerService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async createOrder(
    @Request() req,
    @Body('userId') userId: number,
    @Body('flowerId') flowerId: number,
    @Body('count') count: number,
  ): Promise<any> {
    console.log(req.headers);
    const user: User = req.user;
    console.log(user);
    const flower: Flower = await this.flowerService.getFlowerById(flowerId);

    if (!flower) {
      throw new NotFoundException('Flower not found');
    }

    try {
      const order = await this.orderService.createOrder(user, flower, count);
      return { success: true, order };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
