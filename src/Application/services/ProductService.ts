import { Either, isLeft, Right } from '../../Shared/util/either'
import IProductService from '../Ports/Primary/IProductService'
import IProductRepository from '../Ports/Secondary/IProductRepository'
import Product from '../domain/Entities/Product'
import { CategoryEnum } from '../domain/Enums/CategoryEnum'

export default class ProductService implements IProductService {
    private repository: IProductRepository

    constructor(repository: IProductRepository) {
        this.repository = repository
    }

    async createProduct(
        name: string,
        category: keyof typeof CategoryEnum,
        price: number,
        description: string
    ): Promise<Either<Error, string>> {
        const product = new Product(
            'TempId',
            name,
            category,
            price,
            description
        )
        return this.repository.create(product)
    }

    async updateProduct(
        id: string,
        name: string,
        category: keyof typeof CategoryEnum,
        price: number,
        description: string
    ): Promise<Either<Error, string>> {
        return this.repository.update(
            new Product(id, name, category, price, description)
        )
    }

    async deleteProduct(id: string): Promise<Either<Error, string>> {
        return this.repository.delete(id)
    }

    async findByCategory(
        category: keyof typeof CategoryEnum
    ): Promise<Either<Error, Product[]>> {
        const productsFind = await this.repository.findByCategory(category)

        if (isLeft(productsFind)) {
            return productsFind
        }

        if (productsFind.value.length === 0) {
            return Right([])
        }

        const products = productsFind.value.map(
            (product: { toJSON: () => any }) => product.toJSON()
        )
        return Right(products)
    }
}
