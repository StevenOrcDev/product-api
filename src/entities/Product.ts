import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("decimal")
  price: number;

  constructor(name: string, price: number, id: number) {
    super();
    this.name = name;
    this.price = price;
    this.id = id;
  }
}
