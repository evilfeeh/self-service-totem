import { Repository } from 'typeorm'
import { Either, Left, Right, isLeft } from '../../../../@Shared/Either'
import { Payment as model } from '../../Models/Payment'
import { AppDataSource } from '../../MySqlAdapter'
import IPaymentRepository from '../Contracts/IPaymentRepository'
import { Payment } from '../../../../Entities/Payment'
import IOrderRepository from '../Contracts/IOrderRepository'
import Order from '../../../../Entities/Order'
import Customer from '../../../../Entities/Customer'
import Product from '../../../../Entities/Product'
import OrderItem from '../../../../Entities/OrderItem'

export default class PaymentRepository implements IPaymentRepository {
    private repository: Repository<model>
    private orderDbrepository: IOrderRepository

    constructor(orderDbrepository: IOrderRepository) {
        this.repository = AppDataSource.getRepository(model)
        this.orderDbrepository = orderDbrepository
    }

    async list(): Promise<Either<Error, Payment[]>> {
        try {
            const paymentsFind = await this.repository.find({
                relations: [
                    'order',
                    'order.orderItems',
                    'order.orderItems.product',
                ],
            })

            if (paymentsFind.length === 0) {
                return Right<Payment[]>([])
            }

            const payments = paymentsFind.map((payment) => {
                let customer: Customer | null = null

                if (payment.order.customer) {
                    customer = new Customer(
                        payment.order.customer.name,
                        payment.order.customer.cpf,
                        payment.order.customer.email,
                        payment.order.customer.id
                    )
                }

                const customerName = payment.order.nameCustomer

                const orderEntity = new Order(
                    customer ?? customerName,
                    payment.order.id,
                    payment.order.status,
                    payment.order.createdAt
                )

                for (const item of payment.order.orderItems) {
                    const product: Product = new Product(
                        item.product.id,
                        item.product.name,
                        item.product.category,
                        item.product.price,
                        item.product.description
                    )

                    const orderItem = new OrderItem(
                        product,
                        item.quantity,
                        item.id
                    )
                    orderEntity.addItem(orderItem)
                }

                return new Payment(
                    payment.id,
                    payment.orderId,
                    payment.status,
                    orderEntity
                )
            })
            return Right<Payment[]>(payments)
        } catch (error) {
            console.error(error)
            return Left<Error>(error as Error)
        }
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

            const paymentOrder = await this.orderDbrepository.get(
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

            return Right<Payment>(paymentSent)
        } catch (error) {
            console.error(error)
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

            const paymentOrder = await this.orderDbrepository.get(
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
            console.error(error)
            return Left<Error>(error as Error)
        }
    }
}
