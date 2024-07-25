import { Router } from 'express'
import OrderController from '../../../Controllers/OrderController'
import OrderRepository from '../../Database/Repositories/DatabaseRepository/OrderRepository'
import CreateOrderUseCase from '../../../UseCases/Order/create/create.usecase'
import FindOrderByIdUseCase from '../../../UseCases/Order/findById/findById.usecase'
import FinishOrderUseCase from '../../../UseCases/Order/finish/finish.usecase'
import FinishPrepareOrderUseCase from '../../../UseCases/Order/finishPrepare/finishPrepare.usecase'
import ListOrdersUseCase from '../../../UseCases/Order/list/list.usecase'
import ListAllOrdersUseCase from '../../../UseCases/Order/listAll/listAll.usecase'
import PrepareOrderUseCase from '../../../UseCases/Order/prepare/prepare.usecase'

export default class OrderRoutes {
    private readonly orderRepository: OrderRepository
    private readonly customerRepository: any
    private readonly productRepository: any
    private readonly orderController: OrderController
    private createOrderUseCase: CreateOrderUseCase
    private listOrdersUseCase: ListOrdersUseCase
    private listAllOrdersUseCase: ListAllOrdersUseCase
    private findOrderByIdUseCase: FindOrderByIdUseCase
    private prepareOrderUseCase: PrepareOrderUseCase
    private finishPrepareOrderUseCase: FinishPrepareOrderUseCase
    private finishOrderUseCase: FinishOrderUseCase

    constructor() {
        this.orderRepository = new OrderRepository()
        this.createOrderUseCase = new CreateOrderUseCase(
            this.orderRepository,
            this.customerRepository,
            this.productRepository
        )
        this.listOrdersUseCase = new ListOrdersUseCase(this.orderRepository)
        this.listAllOrdersUseCase = new ListAllOrdersUseCase(
            this.orderRepository
        )
        this.findOrderByIdUseCase = new FindOrderByIdUseCase(
            this.orderRepository
        )
        this.prepareOrderUseCase = new PrepareOrderUseCase(this.orderRepository)
        this.finishPrepareOrderUseCase = new FinishPrepareOrderUseCase(
            this.orderRepository
        )
        this.finishOrderUseCase = new FinishOrderUseCase(this.orderRepository)
        this.orderController = new OrderController(
            this.createOrderUseCase,
            this.listOrdersUseCase,
            this.listAllOrdersUseCase,
            this.findOrderByIdUseCase,
            this.prepareOrderUseCase,
            this.finishPrepareOrderUseCase,
            this.finishOrderUseCase
        )
    }

    buildRouter(): Router {
        const router = Router()

        router.post('/', this.orderController.startOrder.bind(this))
        router.get('/', this.orderController.listOrders.bind(this))
        router.get('/', this.orderController.listAllOrders.bind(this))
        router.get('/:id', this.orderController.getOrder.bind(this))
        router.put('/:id', this.orderController.prepareOrder.bind(this))
        router.put('/:id', this.orderController.finishPrepareOrder.bind(this))
        router.put('/:id', this.orderController.finishOrder.bind(this))

        return router
    }
}
