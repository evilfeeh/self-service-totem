import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Order } from './Order'

@Entity()
export class Customer {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        length: 60,
        nullable: true,
    })
    name: string

    @Column({
        length: 100,
        nullable: true,
    })
    email: string

    @Column({
        length: 11,
        nullable: true,
        unique: true,
    })
    cpf: string

    @OneToMany(() => Order, (order) => order.customer)
    orders: Order[]
}
