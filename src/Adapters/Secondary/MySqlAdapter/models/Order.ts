import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { OrderItem } from "./OrderItem";
import { Customer } from "./Customer";

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  items: OrderItem[];

  @ManyToOne(() => Customer, (customer) => customer.id, { nullable: true })
  @JoinColumn({ name: "customerId" })
  customer: Customer;

  @Column()
  nameCustomer: string;

  @Column({
    default: false
  })
  closed: boolean;
}