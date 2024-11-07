import { UUID } from 'crypto'
import { InputCheckoutDTO } from '../../src/UseCases/Payment/checkout/checkout.dto'
import { Payment } from '../../src/Entities/Payment'
import { PaymentStatus } from '../../src/Entities/Enums/PaymentStatusEnum'
import { paymentOrder } from '../useCases/payment/utils'

export const createMockInputPayment = (orderId: string): InputCheckoutDTO => {
    return {
        orderId,
    }
}

export const createMockPayment = (id: UUID, today: Date): Payment => {
    return new Payment(
        id,
        paymentOrder(today).getId()!,
        PaymentStatus.INITIALIZED,
        paymentOrder(today)
    )
}
