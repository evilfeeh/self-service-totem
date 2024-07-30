import Order from '../../../Entities/Order'

export interface ListOutputDto {
    payments: {
        id: string
        status: string
        order: Order | string
    }[]
}
