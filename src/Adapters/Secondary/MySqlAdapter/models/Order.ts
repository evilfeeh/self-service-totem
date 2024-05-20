import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import { OrderItem } from './OrderItem'
import { Customer } from './Customer'

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    nameCustomer: string

    @Column({
        default: false,
    })
    closed: boolean

    @ManyToOne(() => Customer, (customer) => customer.orders, {
        nullable: true,
    })
    customer: Customer

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
        cascade: true,
    })
    orderItems: OrderItem[]
}
