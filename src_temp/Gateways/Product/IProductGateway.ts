import Product from '../../Entities/Product'
import { Either } from '../../Infrastructure/@Shared/Util/Either'

export default interface IProductGateway {
    create(product: Product): Promise<Either<Error, string>>
    update(product: Product): Promise<Either<Error, string>>
    delete(id: string): Promise<Either<Error, string>>
    findById(id: Product['id']): Promise<Either<Error, Product>>
    findByCategory(
        category: Product['category']
    ): Promise<Either<Error, Product[]>>
}
