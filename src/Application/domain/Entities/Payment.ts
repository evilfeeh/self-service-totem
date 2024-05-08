interface PaymentOutputDTO {
    id: string
    status: string
    orderId: string
    value: number
}

export default class Payment {
    private id: string
    private status: string
    private orderId: string
    private value: number
    constructor(id: string, orderId: string, value: number) {
        this.id = id
        this.status = 'pending'
        this.orderId = orderId
        this.value = value
    }
    getId(): string {
        return this.id
    }
    getStatus(): string {
        return this.status
    }
    getOrderId(): string {
        return this.orderId
    }
    getValue(): number {
        return this.value
    }
    setStatus(status: string): void {
        this.status = status
    }
    setOrderId(orderId: string): void {
        this.orderId = orderId
    }
    setValue(value: number): void {
        this.value = value
    }
    toJSON(): PaymentOutputDTO {
        return {
            id: this.id,
            status: this.status,
            orderId: this.orderId,
            value: this.value,
        }
    }
}
