import { Either, isLeft, Right } from '../../../@Shared/Either'
import { ProductRepository } from '../../ports/ProductRepository'
import {
    InputFindProductsByCategoryDTO,
    OutputFindProductsByCategoryDTO,
} from './findProductsByCategory.dto'

export default class FindProductsByCategoryUseCase {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(
        input: InputFindProductsByCategoryDTO
    ): Promise<Either<Error, OutputFindProductsByCategoryDTO[]>> {
        const productsFind = await this.productRepository.findByCategory(
            input.category
        )

        if (isLeft(productsFind)) {
            return productsFind
        }

        if (productsFind.value.length === 0) {
            return Right([])
        }

        const products = productsFind.value.map(
            (product: { toJSON: () => any }) => product.toJSON()
        )
        return Right(products)
    }
}
