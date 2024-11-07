import { describe, it, expect, vi } from 'vitest'
import { IOrderGatewayRepository } from '../../../src/Gateways/contracts/IOrderGatewayRepository'
import { isLeft, isRight, Left, Right } from '../../../src/@Shared/Either'
import Order from '../../../src/Entities/Order'
import { StatusEnum } from '../../../src/Entities/Enums/StatusEnum'
import StatusOrderException from '../../../src/@Shared/StatusOrderException'
import FinishPrepareOrderUseCase from '../../../src/UseCases/Order/finishPrepare/finishPrepare.usecase'
import { InputFinishPrepareOrderDTO } from '../../../src/UseCases/Order/finishPrepare/finishPrepare.dto'

describe('FinishPrepareOrderUseCase', () => {
    let finishPrepareOrderUseCase: FinishPrepareOrderUseCase
    let mockOrderRepository: Partial<IOrderGatewayRepository>

    beforeEach(() => {
        mockOrderRepository = {
            get: vi.fn(),
            update: vi.fn(),
        }

        finishPrepareOrderUseCase = new FinishPrepareOrderUseCase(
            mockOrderRepository as IOrderGatewayRepository
        )
    })

    it('should return an error if the order does not exist', async () => {
        const orderId = 'nonexistent-order-id'

        mockOrderRepository.get = vi
            .fn()
            .mockResolvedValue(Left<Error>(new Error('Order not found')))

        const input: InputFinishPrepareOrderDTO = { id: orderId }
        const result = await finishPrepareOrderUseCase.execute(input)

        expect(isLeft(result)).toBe(true)
        if (isLeft(result)) {
            expect(result.value.message).toBe('Order not found')
        }
        expect(mockOrderRepository.get).toHaveBeenCalledWith(orderId)
    })

    it('should update the order status to "Ready" when the order is "Preparing"', async () => {
        const mockOrder = new Order('customer-id', '123', StatusEnum.Preparing)
        mockOrder.updateStatus = vi.fn()

        mockOrderRepository.get = vi.fn().mockResolvedValue(Right(mockOrder))
        mockOrderRepository.update = vi.fn().mockResolvedValue(Right('123'))

        const input: InputFinishPrepareOrderDTO = { id: '123' }

        const result = await finishPrepareOrderUseCase.execute(input)

        expect(isRight(result)).toBe(true)
        if (isRight(result)) {
            expect(result.value).toBe('123')
        }
        expect(mockOrder.updateStatus).toHaveBeenCalledWith(StatusEnum.Ready)
        expect(mockOrderRepository.update).toHaveBeenCalledWith(mockOrder)
    })

    it('should return an error if the current order status does not allow Ready', async () => {
        const invalidStatusOrder = new Order(
            'customer-id',
            '123',
            StatusEnum.Received
        )

        invalidStatusOrder.updateStatus = vi.fn(() => {
            throw new StatusOrderException(
                'Only orders with status Preparing can be ready'
            )
        })

        mockOrderRepository.get = vi
            .fn()
            .mockResolvedValue(Right(invalidStatusOrder))

        const input: InputFinishPrepareOrderDTO = { id: '123' }

        await expect(finishPrepareOrderUseCase.execute(input)).rejects.toThrow(
            'Only orders with status Preparing can be ready'
        )
    })
})
