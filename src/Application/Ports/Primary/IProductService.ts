import { Either } from '@Shared/util/either'
import Product, { ProductInputDTO, ProductOutputDTO } from '@Entities/Product'

export default interface IProductService {
    createProduct(
        name: ProductInputDTO['name'],
        category: ProductInputDTO['category'],
        price: ProductInputDTO['price'],
        description: ProductInputDTO['description'],
    ): Promise<Either<Error, string>>
    updateProduct(
        id: Product['id'],
        name: Product['name'],
        category: Product['category'],
        price: Product['price'],
        description: Product['description'],
    ): Promise<Either<Error, string>>
    deleteProduct(id: string): Promise<Either<Error, string>>
    findByCategory(category: Product['category']): Promise<Either<Error, ProductOutputDTO[]>>
}
