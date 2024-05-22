import { CategoryEnum } from '../Enums/CategoryEnum'
import InvalidFieldException from '../Exceptions/InvalidFieldException'

export default class Product {
    private id: string
    private name: string
    private category: CategoryEnum
    private price: number
    private description: string

    constructor(
        id: string,
        name: string,
        category: CategoryEnum,
        price: number,
        description: string
    ) {
        this.id = id
        this.name = name
        this.category = category
        this.price = price
        this.description = description
        this.validator()
    }

    getId(): string {
        return this.id
    }

    getName(): string {
        return this.name
    }

    getCategory(): CategoryEnum {
        return this.category
    }

    getPrice(): number {
        return this.price
    }

    getDescription(): string {
        return this.description
    }

    setName(name: string): void {
        this.name = name
        this.validator()
    }

    setCategory(category: CategoryEnum): void {
        this.category = category
        this.validator()
    }

    setPrice(price: number): void {
        this.price = price
        this.validator()
    }

    setDescription(description: string): void {
        this.description = description
        this.validator()
    }

    private validator(): void {
        const invalidFields: string[] = []

        if (this.name.length < 3 || this.name.length > 250) {
            invalidFields.push('name')
        }

        if (!Object.values(CategoryEnum).includes(this.category)) {
            invalidFields.push('category')
        }

        if (this.price <= 0) {
            invalidFields.push('price')
        }

        if (this.description.length < 3 || this.description.length > 50) {
            invalidFields.push('description')
        }

        if (invalidFields.length > 0) {
            throw new InvalidFieldException(
                `Product: ${invalidFields.join(', ')}`
            )
        }
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            category: this.category,
            price: this.price,
            description: this.description,
        }
    }
}
