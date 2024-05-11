export interface IQRCodeManager {
    bearerToken: string
    baseUrl: string
    paymentStoreSponsorId: string
    mercadoPagoUserId: string
    mercadoPagoStoreId: string
    mercadoPagoPosId: string
    createPayment(): boolean
    getPayment(): QRResponse
    deletePayment(): void
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
