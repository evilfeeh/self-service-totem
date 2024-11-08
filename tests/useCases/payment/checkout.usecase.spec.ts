import { isLeft, isRight, Left, Right } from '../../../src/@Shared/Either'
import IPaymentGatewayRepository from '../../../src/Gateways/contracts/IPaymentGatewayRepository'
import IExternalPaymentGatewayRepository from '../../../src/Gateways/contracts/IExternalPaymentGatewayRepository'
import CheckoutUseCase from '../../../src/UseCases/Payment/checkout/checkout.usecase'
import { InputCheckoutDTO } from '../../../src/UseCases/Payment/checkout/checkout.dto'
import { createMock } from '../../utils/mock.util'
import { randomUUID } from 'crypto'
import { PaymentStatus } from '../../../src/Entities/Enums/PaymentStatusEnum'
import {
    createMockInputPayment,
    createMockPayment,
} from '../../mocks/payment.mock'

const PAYMENT_ID_1 = randomUUID()
const TODAY = new Date()

describe('CheckoutUseCase', () => {
    let usecase: CheckoutUseCase
    let mockPaymentRepository: jest.Mocked<IPaymentGatewayRepository>
    let mockExternalPaymentRepository: jest.Mocked<IExternalPaymentGatewayRepository>

    beforeEach(() => {
        mockPaymentRepository = createMock<IPaymentGatewayRepository>()
        mockExternalPaymentRepository =
            createMock<IExternalPaymentGatewayRepository>()
        usecase = new CheckoutUseCase(
            mockPaymentRepository,
            mockExternalPaymentRepository
        )
    })

    it('should return an error if payment checkout fails', async () => {
        const input = createMockInputPayment(randomUUID())
        mockPaymentRepository.checkout.mockResolvedValue(
            Left(new Error('Checkout failed'))
        )

        const result = await usecase.execute(input)

        expect(isLeft(result)).toBeTruthy()
        expect(result.value).toEqual(new Error('Checkout failed'))
    })

    it('should return an error if QR code generation fails', async () => {
        const input = createMockInputPayment(randomUUID())
        const mockPayment = createMockPayment(PAYMENT_ID_1, TODAY)
        mockPaymentRepository.checkout.mockResolvedValue(Right(mockPayment))
        mockExternalPaymentRepository.generateQrCodePaymentString.mockResolvedValue(
            Left(new Error('QR code generation failed'))
        )

        const result = await usecase.execute(input)

        expect(isLeft(result)).toBeTruthy()
        expect(result.value).toEqual(
            new Error('Erro ao gerar ordem de pagamento')
        )
        expect(mockPaymentRepository.updateStatus).toHaveBeenCalledWith(
            mockPayment.getId(),
            PaymentStatus.ERROR
        )
    })

    it('should return payment details with QR code if checkout and QR code generation succeed', async () => {
        const input = createMockInputPayment(randomUUID())
        const mockPayment = createMockPayment(PAYMENT_ID_1, TODAY)
        mockPaymentRepository.checkout.mockResolvedValue(Right(mockPayment))
        mockExternalPaymentRepository.generateQrCodePaymentString.mockResolvedValue(
            Right('qr-code-string')
        )

        const result = await usecase.execute(input)

        expect(isRight(result)).toBeTruthy()
        expect(result.value).toEqual({
            id: mockPayment.getId(),
            status: mockPayment.getStatus(),
            total: mockPayment.getOrder().getTotalOrderValue(),
            orderId: mockPayment.getOrderId(),
            items: mockPayment
                .getOrder()
                .getItems()
                .map((item) => item.toJSON()),
            qr_code_data: 'qr-code-string',
        })
    })
})
