import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { CategoryEnum } from "../../../../Application/domain/Enums/CategoryEnum";

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string

  @Column({
    type: 'enum',
    enum: CategoryEnum
  })
  category: keyof typeof CategoryEnum

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2
  })
  price: number

  @Column()
  description: string
}