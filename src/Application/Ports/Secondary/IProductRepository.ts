import { Either } from '@Shared/util/either'
import Product from '@Entities/Product'

export default interface IProductRepository {
    create(product: Product): Promise<Either<Error, string>>
    update(product: Product): Promise<Either<Error, string>>
    delete(id: number): Promise<Either<Error, string>>
    findByCategory(category: Product['category']): Promise<Either<Error, Product[]>>
}
