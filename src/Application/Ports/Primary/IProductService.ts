import { Either } from '../../../Shared/util/either'
import Product from '../../domain/Entities/Product'
import { CategoryEnum } from '../../domain/Enums/CategoryEnum'

export default interface IProductService {
    createProduct(
        name: string,
        category: CategoryEnum,
        price: number,
        description: string
    ): Promise<Either<Error, string>>
    updateProduct(
        id: string,
        name: string,
        category: CategoryEnum,
        price: number,
        description: string
    ): Promise<Either<Error, string>>
    deleteProduct(id: string): Promise<Either<Error, string>>
    findByCategory(category: CategoryEnum): Promise<Either<Error, Product[]>>
}
