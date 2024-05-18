import Customer from './Customer'
import Product, { ProductOutputDTO } from './Product'

export interface OrderOutputDTO {
    products: ProductOutputDTO[]
    customer: Customer
    closed: boolean
}

export default class Order {
    private id: string
    private products: Product[] = []
    private customer: Customer
    private closed: boolean

    constructor(
        id: string,
        products: Product[],
        customer: Customer,
        closed: boolean = false
    ) {
        this.id = id
        this.products = products
        this.customer = customer
        this.closed = closed
        this.validator()
    }

    addProduct(product: Product): void {
        this.products.push(product)
    }

    removeProduct(product: Product): void {
        this.products = this.products.filter(
            (p) => p.getId() !== product.getId()
        )
    }

    getId(): string | undefined {
        return this.id
    }
    getProducts(): Product[] {
        return this.products
    }

    getCustomer(): Customer {
        return this.customer
    }

    isClosed(): boolean {
        return this.closed
    }

    closeOrder(): void {
        this.closed = true
        this.validator()
    }

    private validator(): void {
        if (this.closed === true && this.products.length === 0) {
            throw new Error('Order without products cannot be closed')
        }

        if (!this.customer) {
            throw new Error('Invalid customer')
        }
    }

    toJSON(): OrderOutputDTO {
        return {
            products: this.products.map((product) => product.toJSON()),
            customer: this.customer,
            closed: this.closed,
        }
    }
}
