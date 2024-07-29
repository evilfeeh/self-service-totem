import { IQRCodeManager } from '../Ports/Secondary/IQRCodeManager'
import IPaymentService from '../Ports/Primary/IPaymentService'
import { Payment } from '../domain/Entities/Payment'
import { Either, Right, Left, isRight, isLeft } from '../../Shared/util/either'
import Product from '../domain/Entities/Product'
import IPaymentRepository from '../Ports/Secondary/IPaymentRepository'

enum paymentStatus {
    INITIALIZED = 'Pagamento Iniciado',
    APPROVED = 'Pagamento Aprovado',
    DECLINED = 'Pagamento Recusado',
}

export class PaymentService implements IPaymentService {
    private repository: IPaymentRepository
    private readonly qrCodeManager: IQRCodeManager

    constructor(repository: IPaymentRepository) {
        this.repository = repository
    }

    async checkout(orderId: string): Promise<Either<Error, Payment>> {
        try {
            const payment = new Payment(
                'TempId',
                orderId,
                paymentStatus.INITIALIZED,
                'TempOrder'
            )
            return await this.repository.checkout(payment)
        } catch (error) {
            return Left<Error>(error as Error)
        }
    }

    async updateStatus(
        id: string,
        status: string
    ): Promise<Either<Error, string>> {
        try {
            return this.repository.updateStatus(id, status)
        } catch (error) {
            return Left<Error>(error as Error)
        }
    }

    async get(id: string): Promise<Either<Error, Payment>> {
        try {
            return this.repository.get(id)
        } catch (error) {
            return Left<Error>(error as Error)
        }
    }

    async create(
        orderId: string,
        orderAmount: number,
        products: Product[]
    ): Promise<Either<Error, string>> {
        const payment = new Payment(
            'TempId',
            orderId,
            paymentStatus.INITIALIZED,
            'TempOrder'
        )
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

    async cancel(orderId: string): Promise<Either<Error, string>> {
        try {
            const payment = new Payment(
                'TempId',
                orderId,
                paymentStatus.DECLINED,
                'TempOrder'
            )
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
