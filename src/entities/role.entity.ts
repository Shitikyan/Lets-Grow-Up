import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique } from 'typeorm';
import { User } from './user.entity';

@Entity()
@Unique(['name'])
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => User, user => user.role) // One role can be assigned to many users
  users: User[];
}
