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
import ProductRepository from '../../Database/Repositories/DatabaseRepository/ProductRepository'
import OrderGatewayRepository from '../../../Gateways/Order/OrderGatewayRepository'
import CustomerRepository from '../../Database/Repositories/DatabaseRepository/CustomerRepository'

export default class OrderRoutes {
    private readonly orderRepository: OrderRepository
    private readonly customerRepository: CustomerRepository
    private readonly productRepository: ProductRepository
    private readonly orderController: OrderController
    private readonly orderGatewayRepository: OrderGatewayRepository
    private createOrderUseCase: CreateOrderUseCase
    private listOrdersUseCase: ListOrdersUseCase
    private listAllOrdersUseCase: ListAllOrdersUseCase
    private findOrderByIdUseCase: FindOrderByIdUseCase
    private prepareOrderUseCase: PrepareOrderUseCase
    private finishPrepareOrderUseCase: FinishPrepareOrderUseCase
    private finishOrderUseCase: FinishOrderUseCase

    constructor() {
        this.orderRepository = new OrderRepository()
        this.productRepository = new ProductRepository()
        this.customerRepository = new CustomerRepository()
        this.orderGatewayRepository = new OrderGatewayRepository(
            this.orderRepository
        )
        this.createOrderUseCase = new CreateOrderUseCase(
            this.orderGatewayRepository,
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
        router.get('/list-all', this.orderController.listAllOrders.bind(this))
        router.get('/:id', this.orderController.getOrder.bind(this))
        router.put('/prepare-order/:id', this.orderController.prepareOrder.bind(this))
        router.put('/finish-prepare/:id', this.orderController.finishPrepareOrder.bind(this))
        router.put('/finish-order/:id', this.orderController.finishOrder.bind(this))

        return router
    }
}
