import { Router } from 'express'
import PaymentController from '../../../Controllers/PaymentController'
import PaymentRepository from '../../Database/Repositories/DatabaseRepository/PaymentRepository'
import CheckoutUseCase from '../../../UseCases/Payment/checkout/checkout.usecase'
import GetByIdUseCase from '../../../UseCases/Payment/getById/getById.usecase'
import UpdateStatusUseCase from '../../../UseCases/Payment/updateStatus/uptateStatus.usecase'
import OrderRepository from '../../Database/Repositories/DatabaseRepository/OrderRepository'
import PaymentGatewayRepository from '../../../Gateways/Payment/PaymentGatewayRepository'

export default class PaymentRoutes {
    private readonly paymentRepository: PaymentRepository
    private readonly orderRepository: OrderRepository
    private readonly paymentController: PaymentController
    private readonly checkoutUseCase: CheckoutUseCase
    private readonly getByIdUseCase: GetByIdUseCase
    private readonly updateStatusUseCase: UpdateStatusUseCase
    private readonly paymentGatewayRepository: PaymentGatewayRepository

    constructor() {
        this.orderRepository = new OrderRepository()
        this.paymentRepository = new PaymentRepository(this.orderRepository)
        this.paymentGatewayRepository = new PaymentGatewayRepository(
            this.paymentRepository
        )
        this.checkoutUseCase = new CheckoutUseCase(
            this.paymentGatewayRepository
        )
        this.getByIdUseCase = new GetByIdUseCase(this.paymentGatewayRepository)
        this.updateStatusUseCase = new UpdateStatusUseCase(
            this.paymentGatewayRepository
        )

        this.paymentController = new PaymentController(
            this.checkoutUseCase,
            this.getByIdUseCase,
            this.updateStatusUseCase
        )
    }

    buildRouter(): Router {
        const router = Router()
        router.post('/checkout', this.paymentController.checkout.bind(this))
        router.get('/:id', this.paymentController.getById.bind(this))
        router.post(
            '/update-status/:id',
            this.paymentController.updateStatus.bind(this)
        )
        return router
    }
}
