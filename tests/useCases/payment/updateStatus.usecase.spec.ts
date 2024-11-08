import { isLeft, isRight, Left, Right } from '../../../src/@Shared/Either'
import IPaymentGatewayRepository from '../../../src/Gateways/contracts/IPaymentGatewayRepository'
import { createMock } from '../../utils/mock.util'
import { PaymentStatus } from '../../../src/Entities/Enums/PaymentStatusEnum'
import UpdateStatusUseCase from '../../../src/UseCases/Payment/updateStatus/uptateStatus.usecase'
import IExternalPaymentGatewayRepository from '../../../src/Gateways/contracts/IExternalPaymentGatewayRepository'
import { InputUpdateStatusDTO } from '../../../src/UseCases/Payment/updateStatus/updateStatus.dto'
import { randomUUID } from 'crypto'

describe('UpdateStatusUseCase', () => {
    let usecase: UpdateStatusUseCase
    let mockPaymentRepository: jest.Mocked<IPaymentGatewayRepository>
    let mockExternalPaymentRepository: jest.Mocked<IExternalPaymentGatewayRepository>

    beforeEach(() => {
        mockPaymentRepository = createMock<IPaymentGatewayRepository>()
        mockExternalPaymentRepository =
            createMock<IExternalPaymentGatewayRepository>()
        usecase = new UpdateStatusUseCase(
            mockPaymentRepository,
            mockExternalPaymentRepository
        )
    })

    it('should return an error if external payment status retrieval fails', async () => {
        const input: InputUpdateStatusDTO = {
            id: randomUUID(),
            externalPaymentId: randomUUID(),
        }
        mockExternalPaymentRepository.getPaymentStatusById.mockResolvedValue(
            Left(new Error('Error retrieving payment status'))
        )

        const result = await usecase.execute(input)

        expect(isLeft(result)).toBeTruthy()
        expect(result.value).toEqual(
            new Error('Erro ao recuperar status do pagamento')
        )
    })

    it('should update status to APPROVED if external payment status is approved', async () => {
        const input: InputUpdateStatusDTO = {
            id: randomUUID(),
            externalPaymentId: randomUUID(),
        }
        mockExternalPaymentRepository.getPaymentStatusById.mockResolvedValue(
            Right('approved')
        )
        mockPaymentRepository.updateStatus.mockResolvedValue(
            Right('Status updated successfully')
        )

        const result = await usecase.execute(input)

        expect(isRight(result)).toBeTruthy()
        expect(result.value).toEqual('Status updated successfully')
        expect(mockPaymentRepository.updateStatus).toHaveBeenCalledWith(
            input.id,
            PaymentStatus.APPROVED
        )
    })

    it('should update status to DECLINED if external payment status is not approved', async () => {
        const input: InputUpdateStatusDTO = {
            id: randomUUID(),
            externalPaymentId: randomUUID(),
        }
        mockExternalPaymentRepository.getPaymentStatusById.mockResolvedValue(
            Right('declined')
        )
        mockPaymentRepository.updateStatus.mockResolvedValue(
            Right('Status updated successfully')
        )

        const result = await usecase.execute(input)

        expect(isRight(result)).toBeTruthy()
        expect(result.value).toEqual('Status updated successfully')
        expect(mockPaymentRepository.updateStatus).toHaveBeenCalledWith(
            input.id,
            PaymentStatus.DECLINED
        )
    })
})
