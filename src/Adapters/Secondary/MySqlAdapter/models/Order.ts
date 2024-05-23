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

    @Column({
        length: 60,
        nullable: false,
        unique: false,
    })
    nameCustomer: string

    @Column({
        type: 'boolean',
        nullable: false,
        default: false,
    })
    closed: boolean

    @ManyToOne(() => Customer, (customer) => customer.orders, {
        nullable: true,
    })
    customer: Customer

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
        nullable: true,
        cascade: true,
    })
    orderItems: OrderItem[]
}
