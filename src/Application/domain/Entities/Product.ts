import { CategoryEnum } from '../Enums/CategoryEnum'
import InvalidFieldException from '../Exceptions/InvalidFieldException'

export interface ProductInputDTO {
    name: Product['name']
    category: Product['category']
    price: Product['price']
    description: Product['description']
}

export interface ProductOutputDTO {
    id: Product['id']
    name: Product['name']
    category: CategoryEnum
    price: Product['price']
    description: Product['description']
}

export default class Product {
    private id: string
    private name: string
    private category: keyof typeof CategoryEnum
    private price: number
    private description: string

    constructor(
        id: string,
        name: string,
        category: keyof typeof CategoryEnum,
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

    getId(): string | undefined {
        return this.id
    }

    getName(): string {
        return this.name
    }

    getCategory(): keyof typeof CategoryEnum {
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

    setCategory(category: keyof typeof CategoryEnum): void {
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
        if (this.name.length < 3 || this.name.length > 50) {
            throw new InvalidFieldException('Product: name')
        }

        if (CategoryEnum[this.category] === undefined) {
            throw new InvalidFieldException('Product: category')
        }

        if (this.price <= 0) {
            throw new InvalidFieldException('Product: price')
        }

        if (this.description.length < 3 || this.description.length > 50) {
            throw new InvalidFieldException('Product: description')
        }
    }

    toJSON(): ProductOutputDTO {
        return {
            id: this.id,
            name: this.name,
            category: CategoryEnum[this.category],
            price: this.price,
            description: this.description,
        }
    }
}
