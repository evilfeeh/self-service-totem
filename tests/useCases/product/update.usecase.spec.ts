import { isRight, Right } from "../../../src/@Shared/Either"
import { IProductGatewayRepository } from "../../../src/Gateways/contracts/IProductGatewayRepository"
import UpdateProductUseCase from "../../../src/UseCases/Product/update/update.usecase"
import { createMockProduct } from "../../mocks/product.mock"
import { createMock } from "../../utils/mock.util"

describe('Update Product UseCase', () => {
    let usecase: UpdateProductUseCase
    let mockProductRepository: jest.Mocked<IProductGatewayRepository>

    beforeEach(() => {
        mockProductRepository = createMock<IProductGatewayRepository>()
        usecase = new UpdateProductUseCase(
            mockProductRepository
        )
    })

    it('should update a product with valid fields', async () => {
        const product = createMockProduct()
        mockProductRepository.update.mockResolvedValue(Right('Product has been updated'))
        const result = await usecase.execute(product.toJSON())
        expect(isRight(result)).toBeTruthy()
        expect(result.value).toBe('Product has been updated')
    })
})
