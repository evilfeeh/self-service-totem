import { Either } from '../../@Shared/Either'
import Product from '../../Entities/Product'
import IProductRepository from '../../External/Database/Repositories/Contracts/IProductRepository'
import { ProductRepository } from '../../UseCases/ports/ProductRepository'

export default class ProductGateway implements ProductRepository {
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
