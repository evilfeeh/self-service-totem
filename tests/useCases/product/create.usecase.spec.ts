import { isRight, Right } from "../../../src/@Shared/Either"
import { IProductGatewayRepository } from "../../../src/Gateways/contracts/IProductGatewayRepository"
import CreateProductUseCase from "../../../src/UseCases/Product/create/create.usecase"
import { createMockInputProduct, createMockProduct } from "../../mocks/product.mock"
import { createMock } from "../../utils/mock.util"

describe('Create Product UseCase', () => {
    let usecase: CreateProductUseCase
    let mockProductRepository: jest.Mocked<IProductGatewayRepository>

    beforeEach(() => {
        mockProductRepository = createMock<IProductGatewayRepository>()
        usecase = new CreateProductUseCase(
            mockProductRepository
        )
    })

    it('should create a new product with valid fields', async () => {
        mockProductRepository.create.mockResolvedValue(Right<string>('Product has been created'))
        const result = await usecase.execute(createMockInputProduct())
        expect(isRight(result)).toBeTruthy()
        expect(result.value).toBe('Product has been created')
    })
})
