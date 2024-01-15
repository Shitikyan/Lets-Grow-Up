import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Flower } from './flower.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Flower, (flower) => flower.orders)
  @JoinColumn({ name: 'flowerId' })
  flower: Flower;

  @Column()
  count: number;
}
