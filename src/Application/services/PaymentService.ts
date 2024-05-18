import { IQRCodeManager } from '../Ports/Secondary/IQRCodeManager'
import IPaymentService from '../Ports/Primary/IPaymentService'
import { Payment } from '../domain/Entities/Payment'
import { Either, Right, Left, isRight } from '../../Shared/util/either'
import Product from '../domain/Entities/Product'

enum paymentStatus {
    INITIALIZED = 'Pagamento Iniciado',
    APPROVED = 'Pagamento Aprovado',
    DECLINED = 'Pagamento Recusado',
}

export class PaymentService implements IPaymentService {
    private readonly qrCodeManager: IQRCodeManager
    async create(
        orderId: string,
        orderAmount: number,
        products: Product[]
    ): Promise<Either<Error, string>> {
        const payment = new Payment(orderId)
        payment.setValue(orderAmount)
        payment.setProducts(products)

        let payload = payment.toJSON()
        const waitPaymentConfirmation = await this.qrCodeManager.createPayment(
            payload
        )
        if (!waitPaymentConfirmation)
            return Left<Error>(new Error('Payment Cannot be done'))
        return Right(payment.getStatus())
    }
    async get(orderId: string): Promise<Either<Error, unknown>> {
        try {
            return this.qrCodeManager.getPayment(orderId)
        } catch (error) {
            return Left<Error>(error as Error)
        }
    }
    async cancel(orderId: string): Promise<Either<Error, string>> {
        try {
            const payment = new Payment(orderId)
            payment.setStatus(paymentStatus.DECLINED)
            const paymenDeleted = await this.qrCodeManager.deletePayment(
                orderId
            )
            if (isRight(paymenDeleted)) return Right(payment.getStatus())
            return Left<Error>(new Error('Payment Cannot be deleted'))
        } catch (error) {
            return Left<Error>(error as Error)
        }
    }

    async checkout(orderId: string): Promise<Either<Error, string>> {
        try {
            const payment = new Payment(orderId)
            payment.setStatus(paymentStatus.APPROVED)
            return Right(payment.getStatus())
        } catch (error) {
            return Left<Error>(error as Error)
        }
    }
}
