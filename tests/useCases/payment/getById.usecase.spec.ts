import GetByIdUseCase from '../../../src/UseCases/Payment/getById/getById.usecase'
import IPaymentGatewayRepository from '../../../src/Gateways/contracts/IPaymentGatewayRepository'
import { isLeft, isRight, Left, Right } from '../../../src/@Shared/Either'
import { InputGetByIdDTO } from '../../../src/UseCases/Payment/getById/getById.dto'
import { createMock } from '../../utils/mock.util'
import { randomUUID } from 'crypto'
import { createMockPayment } from '../../mocks/payment.mock'
import { PaymentStatus } from '../../../src/Entities/Enums/PaymentStatusEnum'

const PAYMENT_ID_1 = randomUUID()
const TODAY = new Date()

describe('GetByIdUseCase', () => {
    let getByIdUseCase: GetByIdUseCase
    let mockPaymentRepository: jest.Mocked<IPaymentGatewayRepository>

    beforeEach(() => {
        mockPaymentRepository = createMock<IPaymentGatewayRepository>()
        getByIdUseCase = new GetByIdUseCase(mockPaymentRepository)
    })

    it('should return payment details when payment is found', async () => {
        const input: InputGetByIdDTO = { id: PAYMENT_ID_1 }
        const mockPayment = createMockPayment(PAYMENT_ID_1, TODAY)
        mockPaymentRepository.getById.mockResolvedValue(Right(mockPayment))

        const result = await getByIdUseCase.execute(input)

        expect(mockPaymentRepository.getById).toHaveBeenCalledWith(PAYMENT_ID_1)
        expect(isRight(result)).toBe(true)
        if (isRight(result)) {
            expect(result.value).toEqual({
                id: PAYMENT_ID_1,
                status: PaymentStatus.INITIALIZED,
                orderId: 'order-id',
            })
        }
    })

    it('should return an error when payment is not found', async () => {
        const input: InputGetByIdDTO = { id: 'invalid-id' }
        mockPaymentRepository.getById.mockResolvedValue(
            Left(new Error('Payment not found'))
        )

        const result = await getByIdUseCase.execute(input)

        expect(mockPaymentRepository.getById).toHaveBeenCalledWith('invalid-id')
        expect(isLeft(result)).toBe(true)
        if (isLeft(result)) {
            expect(result.value).toEqual(new Error('Payment not found'))
        }
    })
})
