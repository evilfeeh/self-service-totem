import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
    OneToOne,
} from 'typeorm'
import { OrderItem } from './OrderItem'
import { Customer } from './Customer'
import { Payment } from './Payment'
import { StatusEnum } from '../../../Entities/Enums/StatusEnum'

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'timestamp',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date

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

    @Column({
        type: 'enum',
        enum: StatusEnum,
        name: 'status',
    })
    status: StatusEnum

    @ManyToOne(() => Customer, (customer) => customer.orders, {
        nullable: true,
    })
    customer: Customer

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
        nullable: true,
        cascade: true,
    })
    orderItems: OrderItem[]

    @OneToOne(() => Payment, (payment) => payment.order)
    payment: Payment
}
