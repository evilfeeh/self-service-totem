import { Either, isLeft, Left, Right } from '../../../@Shared/Either'
import { PaymentStatus } from '../../../Entities/Enums/PaymentStatusEnum'
import Order from '../../../Entities/Order'
import { Payment } from '../../../Entities/Payment'
import IExternalPaymentGatewayRepository from '../../../Gateways/contracts/IExternalPaymentGatewayRepository'
import IPaymentGatewayRepository from '../../../Gateways/contracts/IPaymentGatewayRepository'
import { InputCheckoutDTO, OutputCheckoutDTO } from './checkout.dto'

export default class CheckoutUseCase {
    constructor(
        private readonly paymentRepository: IPaymentGatewayRepository,
        private readonly externalPaymentRepository: IExternalPaymentGatewayRepository
    ) {}

    async execute(
        input: InputCheckoutDTO
    ): Promise<Either<Error, OutputCheckoutDTO>> {
        const payment = new Payment(
            'TempId',
            input.orderId,
            PaymentStatus.INITIALIZED,
            'TempOrder'
        )

        const paymentResult = await this.paymentRepository.checkout(payment)

        if (isLeft(paymentResult)) {
            return Left<Error>(paymentResult.value)
        }

        const qrCodeString =
            await this.externalPaymentRepository.generateQrCodePaymentString(
                paymentResult.value
            )

        if (isLeft(qrCodeString)) {
            await this.paymentRepository.updateStatus(
                paymentResult.value.getId(),
                PaymentStatus.ERROR
            )
            return Left<Error>(new Error('Erro ao gerar ordem de pagamento'))
        }

        const order = paymentResult.value.getOrder()
        let items: any[] = []
        let total = 0

        if (order instanceof Order) {
            items = order.getItems()
            total = order.getTotalOrderValue()
        }

        const outputPayment = {
            id: paymentResult.value.getId(),
            status: paymentResult.value.getStatus(),
            total: total,
            orderId: paymentResult.value.getOrderId(),
            items: items.map((item) => item.toJson()),
            qr_code_data: qrCodeString.value,
        }

        return Right(outputPayment)
    }
}
