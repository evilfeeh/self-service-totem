import { CategoryEnum } from '../../Entities/Enums/CategoryEnum'
import Product from '../../Entities/Product'
import IProductGateway from '../../Gateways/Product/IProductGateway'
import { Either, isLeft, Right } from '../../Infrastructure/@Shared/Util/Either'
import IProductUseCases from './IProductUseCases'

export default class ProductUseCases implements IProductUseCases {
    constructor(private readonly gateway: IProductGateway) {}

    async createProduct(
        name: string,
        category: CategoryEnum,
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
        return this.gateway.create(product)
    }

    async updateProduct(
        id: string,
        name: string,
        category: CategoryEnum,
        price: number,
        description: string
    ): Promise<Either<Error, string>> {
        return this.gateway.update(
            new Product(id, name, category, price, description)
        )
    }

    async deleteProduct(id: string): Promise<Either<Error, string>> {
        return this.gateway.delete(id)
    }

    async findByCategory(
        category: CategoryEnum
    ): Promise<Either<Error, Product[]>> {
        const productsFind = await this.gateway.findByCategory(category)

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
