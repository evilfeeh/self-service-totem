import { CategoryEnum } from '../../../Entities/Enums/CategoryEnum'

export interface InputFindProductsByCategoryDTO {
    category: CategoryEnum
}

export interface OutputFindProductsByCategoryDTO {
    id: string
    name: string
    category: CategoryEnum
    price: number
    description: string
}
