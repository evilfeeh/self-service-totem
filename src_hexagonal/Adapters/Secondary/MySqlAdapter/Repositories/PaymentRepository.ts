import { Repository } from 'typeorm'
import { Either, isLeft, Left, Right } from '../../../../Shared/util/either'
import { Payment as model } from '../models/Payment'
import { AppDataSource } from '../index'
import IPaymentRepository from '../../../../Application/Ports/Secondary/IPaymentRepository'
import { Payment } from '../../../../Application/domain/Entities/Payment'
import IOrderService from '../../../../Application/Ports/Primary/IOrderService'

export default class PaymentRepository implements IPaymentRepository {
    private repository: Repository<model>
    private orderService: IOrderService

    constructor(orderService: IOrderService) {
        this.repository = AppDataSource.getRepository(model)
        this.orderService = orderService
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

            const paymentOrder = await this.orderService.getOrder(
                paymentSave.orderId
            )

            if (isLeft(paymentOrder)) {
                console.error()
                return Left<Error>(new Error(paymentOrder.value.message))
            }
            const order = paymentOrder.value

            const paymentSent = new Payment(
                paymentSave.id,
                paymentSave.orderId,
                paymentSave.status,
                order
            )

            // TODO: implementar chamada para o servidor webhook mock de pagamento

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

            const paymentOrder = await this.orderService.getOrder(
                paymentFind.orderId
            )

            if (isLeft(paymentOrder)) {
                console.error()
                return Left<Error>(new Error(paymentOrder.value.message))
            }

            const order = paymentOrder.value

            const payment = new Payment(
                paymentFind.id,
                paymentFind.orderId,
                paymentFind.status,
                order
            )

            return Right<Payment>(payment)
        } catch (error) {
            return Left<Error>(error as Error)
        }
    }

    async updateStatus(
        id: string,
        status: string
    ): Promise<Either<Error, string>> {
        try {
            const paymentFind = await this.repository.findOne({
                where: {
                    id,
                },
            })

            if (!paymentFind) {
                return Left<Error>(new Error('Payment not found'))
            }

            paymentFind.status = status

            await this.repository.save(paymentFind)

            return Right(`Status de pagamento atualizado para: ${status}`)
        } catch (error) {
            return Left<Error>(error as Error)
        }
    }
}
