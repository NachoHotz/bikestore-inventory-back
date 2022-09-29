import { Entity, Column } from 'typeorm';
import { IProduct } from './interfaces/IProduct.interface';

@Entity()
export class Product implements IProduct {
  @Column({ type: 'varchar', length: 255 })
    id: string;

  @Column({ type: 'varchar', length: 255 })
    name: string;

  @Column({ type: 'text' })
    description?: string;

  @Column({ type: 'integer' })
    quantity: number;
}
