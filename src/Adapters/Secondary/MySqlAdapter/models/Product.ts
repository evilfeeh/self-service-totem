import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { CategoryEnum } from '../../../../Application/domain/Enums/CategoryEnum'
import { OrderItem } from './OrderItem'

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        length: 60,
        name: 'name',
    })
    name: string

    @Column({
        type: 'enum',
        enum: CategoryEnum,
        name: 'category',
    })
    category: CategoryEnum

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        name: 'price',
    })
    price: number

    @Column({
        length: 255,
        nullable: true,
        name: 'description',
    })
    description: string

    @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
    orderItems: OrderItem[]
}
