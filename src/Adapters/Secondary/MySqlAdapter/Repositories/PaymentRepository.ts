import { Repository } from 'typeorm'
import { Either, Left, Right } from '../../../../Shared/util/either'
import { Payment as model } from '../models/Payment'
import { AppDataSource } from '../index'
import IPaymentRepository from '../../../../Application/Ports/Secondary/IPaymentRepository'
import { Payment } from '../../../../Application/domain/Entities/Payment'

export default class PaymentRepository implements IPaymentRepository {
    private repository: Repository<model>

    constructor() {
        this.repository = AppDataSource.getRepository(model)
    }

    async checkout(payment: Payment): Promise<Either<Error, Payment>> {
        try {
            const orderFind = await this.repository.findOne({
                where: {
                    orderId: payment.getOrderId(),
                },
            })

            if (orderFind) {
                return Left<Error>(new Error('Order is already paid'))
            }

            const paymentJSON = payment.toJSON()

            const paymentModel = new model()
            paymentModel.orderId = paymentJSON.orderId
            paymentModel.status = paymentJSON.status

            const paymentSave = await this.repository.save(paymentModel)

            const paymentSent = new Payment(
                paymentSave.id,
                paymentSave.orderId,
                paymentSave.status
            )

            return Right<Payment>(paymentSent)
        } catch (error) {
            return Left<Error>(error as Error)
        }
    }

    async get(id: string): Promise<Either<Error, Payment>> {
        try {
            const paymentFind = await this.repository.findOne({
                where: {
                    id,
                },
                relations: ['order'],
            })
            if (!paymentFind) {
                return Left<Error>(new Error('Payment not found'))
            }

            const payment = new Payment(
                paymentFind.id,
                paymentFind.orderId,
                paymentFind.status
            )

            return Right<Payment>(payment)
        } catch (error) {
            return Left<Error>(error as Error)
        }
    }
}
