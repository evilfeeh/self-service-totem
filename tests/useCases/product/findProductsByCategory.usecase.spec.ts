import { isLeft, isRight, Left, Right } from "../../../src/@Shared/Either"
import { IProductGatewayRepository } from "../../../src/Gateways/contracts/IProductGatewayRepository"
import FindProductsByCategoryProductUseCase from "../../../src/UseCases/Product/findByCategory/findProductsByCategory.usecase"
import { createMockProduct } from "../../mocks/product.mock"
import { createMock } from "../../utils/mock.util"

describe('Find Products By Category UseCase', () => {
    let usecase: FindProductsByCategoryProductUseCase
    let mockProductRepository: jest.Mocked<IProductGatewayRepository>

    beforeEach(() => {
        mockProductRepository = createMock<IProductGatewayRepository>()
        usecase = new FindProductsByCategoryProductUseCase(
            mockProductRepository
        )
    })

    it('should find products by category', async () => {
        const product = createMockProduct()
        mockProductRepository.findByCategory.mockResolvedValue(Right([product]))
        const result = await usecase.execute({ category: product.getCategory() })
        expect(isRight(result)).toBeTruthy()
        expect(result.value).toEqual([product])
    })

    it('should try find products by category, but return empty', async () => {
        const product = createMockProduct()
        mockProductRepository.findByCategory.mockResolvedValue(Right([]))
        const result = await usecase.execute({ category: product.getCategory() })
        expect(isRight(result)).toBeTruthy()
        expect(result.value).toEqual([])
    })

    it('should try find products by category, but return empty', async () => {
        const product = createMockProduct()
        mockProductRepository.findByCategory.mockResolvedValue(Left(new Error('Unable to find products')))
        const result = await usecase.execute({ category: product.getCategory() })
        expect(isLeft(result)).toBeTruthy()
        expect(result.value).toEqual(new Error('Unable to find products'))
    })
})
