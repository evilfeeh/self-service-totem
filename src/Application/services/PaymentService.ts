import { QRCodeManager } from '../../Adapters/Secondary/MercadoPagoAPI/QRCodeManager'
import { Payment } from '../domain/Entities/Payment'
import { Either, Right, Left, isRight } from '../../Shared/util/either'
import Product from '../../Application/domain/Entities/Product'

enum paymentStatus {
    INITIALIZED = 'Pagamento Iniciado',
    APPROVED = 'Pagamento Aprovado',
    DECLINED = 'Pagamento Recusado',
}

export class PaymentService {
    private status: string
    constructor(private readonly qrCodeManager: QRCodeManager) {
        this.status = paymentStatus.INITIALIZED
    }
    async create(
        orderId: number,
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
    async get(orderId: number): Promise<Either<Error, unknown>> {
        try {
            return this.qrCodeManager.getPayment(orderId)
        } catch (error) {
            return Left<Error>(error as Error)
        }
    }
    async cancel(orderId: number): Promise<Either<Error, string>> {
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
}
