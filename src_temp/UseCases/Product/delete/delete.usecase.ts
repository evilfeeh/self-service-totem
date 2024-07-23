import { Either } from '../../../@Shared/Either'
import { ProductRepository } from '../../ports/ProductRepository'
import { InputDeleteProductDTO } from './delete.dto'

export default class DeleteProductUseCase {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(
        input: InputDeleteProductDTO
    ): Promise<Either<Error, string>> {
        return this.productRepository.delete(input.id)
    }
}
