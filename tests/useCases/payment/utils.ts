import { UUID } from 'crypto'
import { Payment } from '../../../src/Entities/Payment'
import Customer from '../../../src/Entities/Customer'
import Order from '../../../src/Entities/Order'
import { StatusEnum } from '../../../src/Entities/Enums/StatusEnum'
import { PaymentStatus } from '../../../src/Entities/Enums/PaymentStatusEnum'

export const paymentCustomer = (): Customer => {
    return new Customer(
        'John Doe',
        '606.049.910-45',
        'email@email.com',
        'customer-id'
    )
}

export const paymentOrder = (today: Date): Order => {
    return new Order(paymentCustomer(), 'order-id', StatusEnum.Received, today)
}

export const createExpectedPayment = (id: UUID, today: Date): Payment => {
    return new Payment(
        id,
        paymentOrder(today).getId()!,
        PaymentStatus.INITIALIZED,
        paymentOrder(today)
    )
}
