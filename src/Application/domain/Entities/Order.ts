import { StatusEnum } from '../Enums/StatusEnum'
import InvalidCustomerException from '../Exceptions/InvalidCustomerException'
import OrderWithOutProductsException from '../Exceptions/OrderWithOutProductsException'
import Customer from './Customer'
import OrderItem from './OrderItem'
import Product from './Product'

export default class Order {
    private id: string | null
    private items: OrderItem[]
    private customer: Customer | string
    private status: StatusEnum
    private closed: boolean
    private createdAt: Date

    constructor(customer: Customer | string, id: string | null = null, status: StatusEnum = StatusEnum.Received, createdAt: Date = new Date()) {
        this.id = id
        this.items = []
        this.customer = customer
        this.closed = false
        this.status = status
        this.createdAt = createdAt
        this.validator()
    }

    addItem(item: OrderItem): void {
        this.items.push(item)
    }

    clearItems(): void {
        this.items = []
    }

    addProduct(product: Product, quantity: number): void {
        if (this.items.length) {
            const productFind = this.items.find(
                (prod) => prod.getProduct().getId() === product.getId()
            )

            if (productFind) {
                productFind.updateQuantity(quantity)
            } else {
                const item = new OrderItem(product, quantity)
                this.items.push(item)
            }
        } else {
            const item = new OrderItem(product, quantity)
            this.items.push(item)
        }
    }

    updateProduct(product: Product, quantity: number): void {
        if (this.items.length) {
            const productFind = this.items.find(
                (prod) => prod.getProduct().getId() === product.getId()
            )

            if (productFind) {
                productFind.updateQuantity(quantity)
            }
        }
    }

    removeProduct(product: Product): void {
        if (this.items.length) {
            const index = this.items.findIndex(
                (prod) => prod.getProduct().getId() === product.getId()
            )

            this.items.splice(index, 1)
        }
    }

    getId(): string | null {
        return this.id
    }

    getItems(): OrderItem[] {
        return this.items
    }

    getCustomer(): Customer | string {
        return this.customer
    }

    getStatus(): StatusEnum {
        return this.status
    }

    getCreatedAt(): Date {
        return this.createdAt
    }

    getTotalOrderValue(): number {
        return this.items.reduce(
            (total, currentItem) => total + currentItem.getTotalValue(),
            0
        )
    }

    isClosed(): boolean {
        return this.closed
    }

    closeOrder(): void {
        this.closed = true
        this.validator()
    }

    updateCustomer(customer: Customer | string): void {
        this.customer = customer
        this.validator()
    }

    updateStatus(status: StatusEnum): void {
        this.status = status
    }

    private validator(): void {
        if (this.closed === true && this.items.length === 0) {
            throw new OrderWithOutProductsException()
        }

        if (!this.customer) {
            throw new InvalidCustomerException()
        }
    }

    toJSON() {
        return {
            id: this.id,
            items: this.items.map((item) => item.toJson()),
            customer: this.customer,
            total: this.getTotalOrderValue(),
            closed: this.closed,
            status: this.status,
            createdAt: this.createdAt
        }
    }
}
