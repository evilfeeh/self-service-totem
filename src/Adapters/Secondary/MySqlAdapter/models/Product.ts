import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { CategoryEnum } from '../../../../Application/domain/Enums/CategoryEnum'
import { OrderItem } from './OrderItem'

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column({
        type: 'enum',
        enum: CategoryEnum,
    })
    category: CategoryEnum

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
    })
    price: number

    @Column()
    description: string

    @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
    orderItems: OrderItem[]
}
