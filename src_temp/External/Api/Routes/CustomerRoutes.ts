import { Router } from 'express'
import CustomerController from '../../../Controllers/CustomerController'
import FindCustomerByCpfUseCase from '../../../UseCases/Customer/findByCpf/findCustomerByCpf.usecase'
import RegisterCustomerUseCase from '../../../UseCases/Customer/register/register.usecase'
import CustomerRepository from '../../Database/Repositories/DatabaseRepository/CustomerRepository'

export default class CustomerRoutes {
    private readonly customerRepository: CustomerRepository
    private readonly customerController: CustomerController
    private readonly registerCustomerUseCase: RegisterCustomerUseCase
    private readonly findCustomerByCpf: FindCustomerByCpfUseCase

    constructor() {
        this.customerRepository = new CustomerRepository()
        this.registerCustomerUseCase = new RegisterCustomerUseCase(
            this.customerRepository
        )
        this.findCustomerByCpf = new FindCustomerByCpfUseCase(
            this.customerRepository
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
