import { randomUUID } from 'crypto'
import NotFoundException from '../../../../Application/domain/Exceptions/NotFoundException'
import IProductRepository from '../../../../Application/Ports/Secondary/IProductRepository'
import { Either, Left, Right } from '../../../../Shared/util/either'
import Product from '../../../../Application/domain/Entities/Product'

type ProductType = {
    id: Product['id']
    name: Product['name']
    category: Product['category']
    price: Product['price']
    description: Product['description']
}

export default class ProductRepositoryInMemory implements IProductRepository {
    private list: ProductType[]

    constructor() {
        this.list = []
    }

    async create(product: Product): Promise<Either<Error, string>> {
        const id = randomUUID()

        this.list.push({
            id,
            name: product.getName(),
            category: product.getCategory(),
            price: product.getPrice(),
            description: product.getDescription(),
        })

        return Right<string>(`Product has been created, id: ${id}`)
    }

    async update(product: Product): Promise<Either<Error, string>> {
        const existingProductIndex = this.list.findIndex(
            (productFind) => productFind.id === product.getId()
        )

        if (existingProductIndex <= -1) {
            return Left<Error>(
                new NotFoundException('Product: ' + product.getId())
            )
        }

        this.list[existingProductIndex] = {
            id: this.list[existingProductIndex].id,
            name: product.getName(),
            category: product.getCategory(),
            price: product.getPrice(),
            description: product.getDescription(),
        }

        return Right(
            `Product has been updated, ${this.list[existingProductIndex].name}`
        )
    }

    async delete(id: string): Promise<Either<Error, string>> {
        const existingProductIndex = this.list.findIndex(
            (productFind) => productFind.id === id
        )

        if (existingProductIndex <= -1) {
            Left<Error>(new NotFoundException('Product: ' + id))
        }

        this.list.splice(existingProductIndex, 1)
        return Right<string>(`Product removed, ${id}`)
    }

    async findByCategory(category: string): Promise<Either<Error, Product[]>> {
        let products = undefined
        const productSaved = this.list.filter(
            (productFind) => productFind.category === category
        )

        if (productSaved) {
            products = productSaved.map(
                (product) =>
                    new Product(
                        product.id,
                        product.name,
                        product.category,
                        product.price,
                        product.description
                    )
            )

            return Right<Product[]>(products)
        } else {
            return Right<Product[]>([])
        }
    }

    findById(id: string): Promise<Either<Error, Product>> {
        let product = undefined
        const productSaved = this.list.find(
            (productFind) => productFind.id === id
        )

        if (productSaved) {
            product = new Product(
                productSaved.id,
                productSaved.name,
                productSaved.category,
                productSaved.price,
                productSaved.description
            )

            return Promise.resolve(Right<Product>(product))
        } else {
            return Promise.resolve(
                Left<Error>(new NotFoundException('Product: ' + id))
            )
        }
    }
}
