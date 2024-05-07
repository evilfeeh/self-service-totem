import { Request, Response, Router } from 'express'
import ICustomerRepository from '@Application/Ports/Secondary/ICustomerRepository'
import Customer from '@Application/Entities/Customer'
import { isLeft } from '@Shared/util/either'

export default class CustomerController {
    constructor(readonly customerRepository: ICustomerRepository) {}

    buildRouter(): Router {
        const router = Router()
        router.post('/', this.registerCustomer.bind(this))
        return router
    }

    async registerCustomer(req: Request, res: Response): Promise<void> {
        const { name, email, cpf } = req.body
        const customer = new Customer(name, this.customerRepository)
        customer.setEmail(email)
        customer.setCpf(cpf)
        const result = await customer.saveOrUpdate()

        if (isLeft(result)) {
            res.status(400).json(result.value.message)
        } else {
            res.setHeader('Location', `/customers/${result.value}`)
            res.sendStatus(200)
        }
    }
}
