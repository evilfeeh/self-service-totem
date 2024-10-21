import ProductPriceGT0Exception from '../@Shared/ProductPriceGreaterThan0'
import ProductQuantityGT0Exception from '../@Shared/ProductQuantityGreaterThan0'
import Product from './Product'

export default class OrderItem {
    private id: string | null
    private product: Product
    private quantity: number
    private totalValue: number

    constructor(
        product: Product,
        quantity: number = 1,
        id: string | null = null
    ) {
        this.id = id
        this.product = product
        this.quantity = quantity
        this.validator()
    }

    getId(): string | null {
        return this.id
    }

    getProduct(): Product {
        return this.product
    }

    getQuantity(): number {
        return this.quantity
    }

    getTotalValue(): number {
        return this.totalValue
    }

    updateQuantity(newQuantity: number) {
        this.quantity = newQuantity
        this.validator()
    }

    private validator(): void {
        if (this.quantity === 0) {
            throw new ProductQuantityGT0Exception()
        }

        if (this.product.getPrice() === 0) {
            throw new ProductPriceGT0Exception()
        }

        this.totalValue = this.product.getPrice() * this.quantity
    }

    toJSON() {
        return {
            id: this.id,
            product: this.product.toJSON(),
            quantity: this.quantity,
            total: this.totalValue,
        }
    }
}
