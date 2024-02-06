import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Flower } from './flower.entity';
import { Order } from './order.entity';

@Entity()
export class FlowerDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column()
  description: string;

  @OneToOne(() => Flower, (flower) => flower.flowerDetails)
  @JoinColumn({ name: 'flowerId' })
  flower: Flower;

  @JoinColumn({ name: 'flowerId' })
  order: Order;
}
