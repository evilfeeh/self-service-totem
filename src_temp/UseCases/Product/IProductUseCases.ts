import { CategoryEnum } from '../../Entities/Enums/CategoryEnum'
import Product from '../../Entities/Product'
import { Either } from '../../Infrastructure/@Shared/Util/Either'

export default interface IProductUseCases {
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
