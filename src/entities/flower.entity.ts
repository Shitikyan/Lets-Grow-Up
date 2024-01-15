import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class Flower {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  qrCode: string;

  @Column()
  familyName: string;

  @Column()
  age: number;

  @Column()
  history: string;

  @Column('simple-array')
  comments: string[];

  @OneToMany(() => Order, (order) => order.flower) //
  orders: Order[];
}
