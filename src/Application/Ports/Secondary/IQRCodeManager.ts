import { Either } from '../../../Shared/util/either'

export interface IQRCodeManager {
    createPayment(order: any): Promise<Either<Error, number>>
    getPayment(orderId: number): Promise<Either<Error, QRResponse>>
    deletePayment(orderId: number): Promise<Either<Error, boolean>>
}

export type QRResponse = BaseObj[]

export interface BaseObj {
    external_reference: string
    total_amount: number
    items: Item[]
    title: string
    description: string
    sponsor: Sponsor
    expiration_date: string
    notification_url: string
}

export interface Item {
    sku_number: string
    category: string
    title: string
    description: string
    unit_measure: string
    quantity: number
    unit_price: number
    total_amount: number
}

export interface Sponsor {
    id: number
}
