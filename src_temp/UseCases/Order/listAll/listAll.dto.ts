import Customer from '../../../Entities/Customer'
import { CategoryEnum } from '../../../Entities/Enums/CategoryEnum'
import { StatusEnum } from '../../../Entities/Enums/StatusEnum'

export interface OutputListAllOrdersDTO {
    id: string | null
    items: {
        id: string | null
        product: {
            id: string
            name: string
            category: CategoryEnum
            price: number
            description: string
        }
        quantity: number
        total: number
    }[]
    customer: string | Customer
    total: number
    closed: boolean
    status: StatusEnum
    createdAt: Date
}
