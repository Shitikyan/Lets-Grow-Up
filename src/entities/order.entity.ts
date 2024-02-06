import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Flower } from './flower.entity';
import { FlowerDetails } from './flower-details.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.order)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Flower, (flower) => flower.order)
  flower: Flower[];

  @ManyToOne(() => FlowerDetails, (flowerDetails) => flowerDetails.order)
  @JoinColumn({ name: 'flowerDetailsId' })
  flowerDetails: FlowerDetails;

  @Column()
  count: number;
}
