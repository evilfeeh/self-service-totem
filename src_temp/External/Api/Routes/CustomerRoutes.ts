import { Router } from 'express'
import CustomerController from '../../../Controllers/CustomerController'
import FindCustomerByCpfUseCase from '../../../UseCases/Customer/findByCpf/findCustomerByCpf.usecase'
import RegisterCustomerUseCase from '../../../UseCases/Customer/register/register.usecase'
import CustomerRepository from '../../Database/Repositories/DatabaseRepository/CustomerRepository'
import CustomerGatewayRepository from '../../../Gateways/Customer/CustomerGatewayRepository'

export default class CustomerRoutes {
    private readonly customerRepository: CustomerRepository
    private readonly customerController: CustomerController
    private readonly registerCustomerUseCase: RegisterCustomerUseCase
    private readonly findCustomerByCpf: FindCustomerByCpfUseCase
    private readonly customerGatewayRepository: CustomerGatewayRepository

    constructor() {
        this.customerRepository = new CustomerRepository()
        this.customerGatewayRepository = new CustomerGatewayRepository(
            this.customerRepository
        )
        this.registerCustomerUseCase = new RegisterCustomerUseCase(
            this.customerGatewayRepository
        )
        this.findCustomerByCpf = new FindCustomerByCpfUseCase(
            this.customerGatewayRepository
        )

        this.customerController = new CustomerController(
            this.registerCustomerUseCase,
            this.findCustomerByCpf
        )
    }

    buildRouter(): Router {
        const router = Router()
        router.post('/', this.customerController.registerCustomer.bind(this))
        router.post('/identify', this.customerController.identify.bind(this))
        return router
    }
}
