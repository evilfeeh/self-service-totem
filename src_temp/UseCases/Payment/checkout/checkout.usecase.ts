import { Either } from '../../../@Shared/Either'
import { PaymentStatus } from '../../../Entities/Enums/PaymentStatusEnum'
import { Payment } from '../../../Entities/Payment'
import IPaymentGatewayRepository from '../../../Gateways/contracts/IPaymentGatewayRepository'
import { InputCheckoutDTO } from './checkout.dto'

export default class CheckoutUseCase {
    constructor(
        private readonly paymentRepository: IPaymentGatewayRepository
    ) {}

    async execute(input: InputCheckoutDTO): Promise<Either<Error, Payment>> {
        const payment = new Payment(
            'TempId',
            input.orderId,
            PaymentStatus.INITIALIZED,
            'TempOrder'
        )
        return await this.paymentRepository.checkout(payment)
    }
}
