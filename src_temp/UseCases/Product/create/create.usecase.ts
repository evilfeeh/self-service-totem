import { Either } from '../../../@Shared/Either'
import Product from '../../../Entities/Product'
import { ProductRepository } from '../../ports/ProductRepository'
import { InputCreateProductDTO } from './create.dto'

export default class CreateProductUseCase {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(
        input: InputCreateProductDTO
    ): Promise<Either<Error, string>> {
        const product = new Product(
            'TempId',
            input.name,
            input.category,
            input.price,
            input.description
        )
        return this.productRepository.create(product)
    }
}
