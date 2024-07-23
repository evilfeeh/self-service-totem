import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm'
import { Order } from './Order'

@Entity()
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    orderId: string

    @Column({ length: 255 })
    status: string

    @OneToOne(() => Order)
    @JoinColumn({ name: 'orderId' })
    order: Order
}
