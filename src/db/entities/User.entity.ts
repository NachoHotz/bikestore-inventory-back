import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from './IUser.interface';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    name: string;

  @Column({ unique: true })
    email: string;

  @Column()
    password: string;
}
