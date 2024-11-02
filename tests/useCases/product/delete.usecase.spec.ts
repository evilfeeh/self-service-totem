import { isRight, Right } from "../../../src/@Shared/Either"
import { IProductGatewayRepository } from "../../../src/Gateways/contracts/IProductGatewayRepository"
import DeleteProductUseCase from "../../../src/UseCases/Product/delete/delete.usecase"
import { createMockProduct } from "../../mocks/product.mock"
import { createMock } from "../../utils/mock.util"

describe('Delete Product UseCase', () => {
    let usecase: DeleteProductUseCase
    let mockProductRepository: jest.Mocked<IProductGatewayRepository>

    beforeEach(() => {
        mockProductRepository = createMock<IProductGatewayRepository>()
        usecase = new DeleteProductUseCase(
            mockProductRepository
        )
    })

    it('should delete a product with valid fields', async () => {
        const {id} = createMockProduct().toJSON()
        mockProductRepository.delete.mockResolvedValue(Right('Product has been removed'))
        const result = await usecase.execute({id})
        expect(isRight(result)).toBeTruthy()
        expect(result.value).toBe('Product has been removed')
    })
})
