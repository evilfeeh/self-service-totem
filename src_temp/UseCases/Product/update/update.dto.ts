import { CategoryEnum } from '../../../Entities/Enums/CategoryEnum'

export interface InputUpdateProductDTO {
    id: string
    name: string
    category: CategoryEnum
    price: number
    description: string
}
