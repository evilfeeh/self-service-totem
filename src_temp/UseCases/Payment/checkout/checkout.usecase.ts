import { Either, isLeft, Left, Right } from '../../../@Shared/Either'
import { PaymentStatus } from '../../../Entities/Enums/PaymentStatusEnum'
import Order from '../../../Entities/Order'
import OrderItem from '../../../Entities/OrderItem'
import { Payment } from '../../../Entities/Payment'
import IPaymentGatewayRepository from '../../../Gateways/contracts/IPaymentGatewayRepository'
import { InputCheckoutDTO, OutputCheckoutDTO } from './checkout.dto'

export default class CheckoutUseCase {
    constructor(
        private readonly paymentRepository: IPaymentGatewayRepository
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

        const order = paymentResult.value.getOrder()
        let items: any[] = []

        if (order instanceof Order) {
            items = order.getItems()
        }

        const outputPayment = {
            id: paymentResult.value.getId(),
            status: paymentResult.value.getStatus(),
            orderId: paymentResult.value.getOrderId(),
            items: items.map((item) => item.toJson()),
        }

        return Right(outputPayment)
    }
}
