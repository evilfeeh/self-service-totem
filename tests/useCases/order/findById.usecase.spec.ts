import { describe, it, beforeEach, expect, vi } from 'vitest'
import FindOrderByIdUseCase from '../../../src/UseCases/Order/findById/findById.usecase'
import { IOrderGatewayRepository } from '../../../src/Gateways/contracts/IOrderGatewayRepository'
import Order from '../../../src/Entities/Order'
import { InputFindOrderByIdDTO } from '../../../src/UseCases/Order/findById/findById.dto'
import { isLeft, isRight, Left, Right } from '../../../src/@Shared/Either'

describe('FindOrderByIdUseCase', () => {
    let findOrderByIdUseCase: FindOrderByIdUseCase
    let mockOrderRepository: Partial<IOrderGatewayRepository>

    beforeEach(() => {
        mockOrderRepository = {
            get: vi.fn(),
        }

        findOrderByIdUseCase = new FindOrderByIdUseCase(
            mockOrderRepository as IOrderGatewayRepository
        )
    })

    it('should return order details when order is found', async () => {
        const orderId = 'order-id'
        const mockOrder = new Order(orderId)

        mockOrderRepository.get = vi.fn().mockResolvedValue(Right(mockOrder))

        const input: InputFindOrderByIdDTO = { id: orderId }
        const result = await findOrderByIdUseCase.execute(input)

        expect(isRight(result)).toBe(true)
        expect(mockOrderRepository.get).toHaveBeenCalledWith(orderId)
    })

    it('should return an error if order is not found', async () => {
        const orderId = 'nonexistent-order-id'

        mockOrderRepository.get = vi
            .fn()
            .mockResolvedValue(Left<Error>(new Error('Order not found')))

        const input: InputFindOrderByIdDTO = { id: orderId }
        const result = await findOrderByIdUseCase.execute(input)

        expect(isLeft(result)).toBe(true)
        if (isLeft(result)) {
            expect(result.value.message).toBe('Order not found')
        }
        expect(mockOrderRepository.get).toHaveBeenCalledWith(orderId)
    })
})
