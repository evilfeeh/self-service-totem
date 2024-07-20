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

    @Column({
        type: 'int',
        nullable: false,
    })
    quantity: number

    @ManyToOne(() => Order, (order) => order.orderItems, {
        nullable: true,
    })
    order: Order

    @ManyToOne(() => Product, (product) => product.orderItems, {
        nullable: false,
    })
    product: Product
}
