import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, Unique } from 'typeorm';
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

  @ManyToMany(() => Role, role => role.users)
  @JoinTable()
  roles: Role[];
}
