import Product from '../../Entities/Product'
import { Either } from '../../Infrastructure/@Shared/Util/Either'
import IProductRepository from '../../Infrastructure/Repositories/Contracts/IProductRepository'
import IProductGateway from './IProductGateway'

export default class ProductGateway implements IProductGateway {
    constructor(private readonly repository: IProductRepository) {}

    async create(product: Product): Promise<Either<Error, string>> {
        return this.repository.create(product)
    }

    async update(product: Product): Promise<Either<Error, string>> {
        return this.repository.update(product)
    }

    async delete(id: string): Promise<Either<Error, string>> {
        return this.repository.delete(id)
    }

    async findById(id: Product['id']): Promise<Either<Error, Product>> {
        return this.repository.findById(id)
    }

    async findByCategory(
        category: Product['category']
    ): Promise<Either<Error, Product[]>> {
        return this.repository.findByCategory(category)
    }
}
