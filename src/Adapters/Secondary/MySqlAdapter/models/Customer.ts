import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Order } from './Order'

@Entity()
export class Customer {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column({
        length: 11,
    })
    cpf: string

    @OneToMany(() => Order, (order) => order.customer)
    orders: Order[]
}
