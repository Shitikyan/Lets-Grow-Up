import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { FlowerDetails } from './flower-details.entity';
import { Order } from './order.entity';
@Entity()
export class Flower {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  qrCode: string;

  @Column()
  age: number;

  @Column()
  history: string;

  @Column('simple-array')
  comments: string[];

  @Column({ default: false })
  readyToPick: boolean;

  @ManyToOne(() => Order, (order) => order.flower)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @JoinColumn({ name: 'flowerDetailsId' })
  flowerDetails: FlowerDetails;
}
