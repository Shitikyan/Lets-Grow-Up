import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  OneToMany,
} from 'typeorm';
import { Role } from './role.entity';
import { Order } from './order.entity';

@Entity()
@Unique(['username', 'email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
