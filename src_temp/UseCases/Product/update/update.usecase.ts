import { Either } from '../../../@Shared/Either'
import Product from '../../../Entities/Product'
import { IProductGatewayRepository } from '../../../Gateways/contracts/IProductGatewayRepository'
import { InputUpdateProductDTO } from './update.dto'

export default class UpdateProductUseCase {
    constructor(
        private readonly productRepository: IProductGatewayRepository
    ) {}

    async execute(
        input: InputUpdateProductDTO
    ): Promise<Either<Error, string>> {
        return this.productRepository.update(
            new Product(
                input.id,
                input.name,
                input.category,
                input.price,
                input.description
            )
        )
    }
}
