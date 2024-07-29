import { Either } from '../../../@Shared/Either'
import { IProductGatewayRepository } from '../../../Gateways/contracts/IProductGatewayRepository'
import { InputDeleteProductDTO } from './delete.dto'

export default class DeleteProductUseCase {
    constructor(
        private readonly productRepository: IProductGatewayRepository
    ) {}

    async execute(
        input: InputDeleteProductDTO
    ): Promise<Either<Error, string>> {
        return this.productRepository.delete(input.id)
    }
}
