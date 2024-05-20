import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import { Product } from './Product'
import { Order } from './Order'

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    quantity: number

    @ManyToOne(() => Order, (order) => order.orderItems)
    order: Order

    @ManyToOne(() => Product, (product) => product.orderItems)
    product: Product
}
