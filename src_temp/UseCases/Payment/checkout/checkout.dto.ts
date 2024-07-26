import OrderItem from '../../../Entities/OrderItem'

export interface InputCheckoutDTO {
    orderId: string
}

export interface OutputCheckoutDTO {
    id: string
    status: string
    orderId: string
    items: any[]
}
