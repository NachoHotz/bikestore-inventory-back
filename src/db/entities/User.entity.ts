import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from './interfaces/IUser.interface';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ type: 'varchar', length: 255 })
    name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

  @Column({ type: 'varchar', length: 255 })
    password: string;
}
