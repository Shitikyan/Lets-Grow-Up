import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
