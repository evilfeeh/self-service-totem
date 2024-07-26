import { Repository } from 'typeorm'
import { Either, Left, Right, isLeft } from '../../../../@Shared/Either'
import { Payment as model } from '../../Models/Payment'
import { AppDataSource } from '../../MySqlAdapter'
import IPaymentRepository from '../Contracts/IPaymentRepository'
import { Payment } from '../../../../Entities/Payment'
import IOrderRepository from '../Contracts/IOrderRepository'

export default class PaymentRepository implements IPaymentRepository {
    private repository: Repository<model>
    private orderRepository: IOrderRepository

    constructor(orderRepository: IOrderRepository) {
        this.repository = AppDataSource.getRepository(model)
        this.orderRepository = orderRepository
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

            const paymentOrder = await this.orderRepository.get(
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

    async getById(id: string): Promise<Either<Error, Payment>> {
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

            const paymentOrder = await this.orderRepository.get(
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
