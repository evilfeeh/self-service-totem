interface PaymentOutputDTO {}

export class Payment {
    private readonly externalReference: string
    private readonly notificationUrl: string
    private readonly sponsor_id: number
    private products: any[]
    private id: string
    private status: string
    private orderId: number
    private value: number
    private expirationDate: string

    constructor(orderId: number) {
        this.status = 'pending'
        this.orderId = orderId
        this.externalReference = '12345'
        this.notificationUrl = 'http://www.yourserver.com/notification'
        this.sponsor_id = 662208785
        this.expirationDate = this.setExpirationDate()
    }
    private setExpirationDate(): string {
        let now = new Date()
        let fiveMinutesToExpiration = 5 * 60 * 1000
        now.setTime(now.getTime() + fiveMinutesToExpiration)
        return now.toISOString()
    }

    getId(): string {
        return this.id
    }
    getStatus(): string {
        return this.status
    }
    getOrderId(): number {
        return this.orderId
    }
    getProducts(): any[] {
        return this.products
    }
    setValue(value: number): void {
        this.value = value
    }
    setProducts(products: any[]): void {
        this.products = products
    }
    getValue(): number {
        return this.value
    }
    setStatus(status: string): void {
        this.status = status
    }
    toJSON(): PaymentOutputDTO {
        return {
            cash_out: {
                amount: this.value,
            },
            description: 'Loja de auto atendimento',
            expirationDate: this.expirationDate,
            external_reference: this.externalReference,
            items: this.products,
            notification_url: this.notificationUrl,
            sponsor: {
                id: this.sponsor_id,
            },
            title: 'Pedido de lanche',
            total_amount: this.value,
        }
    }
}
