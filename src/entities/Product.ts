import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'name',
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
    name: 'description',
  })
  description?: string;

  @Column({
    type: 'decimal',
    precision: 10,
    nullable: true,
    name: 'price',
  })
  price?: number;

  @Column({
    type: 'int',
    nullable: true,
    name: 'quantity',
  })
  quantity?: number;
}
