import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Role } from './role.entity';

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

  @ManyToOne(() => Role, role => role.users) // Many users can have the same role
  @JoinColumn()
  role: Role;
}
