import { CategoryEnum } from '../../../Entities/Enums/CategoryEnum'

export interface InputCreateProductDTO {
    name: string
    category: CategoryEnum
    price: number
    description: string
}
