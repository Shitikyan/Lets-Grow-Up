import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, Unique } from 'typeorm';
import { User } from './user.entity';

@Entity()
@Unique(['name'])
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => User, user => user.roles)
  @JoinTable()
  users: User[];
}
