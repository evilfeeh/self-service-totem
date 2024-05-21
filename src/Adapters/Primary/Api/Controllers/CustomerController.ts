import { Request, Response, Router } from 'express'
import { isLeft } from '../../../../Shared/util/either'
import ICustomerService from '../../../../Application/Ports/Primary/ICustomerService'

export default class CustomerController {
    constructor(readonly customerService: ICustomerService) {}

    buildRouter(): Router {
        const router = Router()
        router.post('/', this.registerCustomer.bind(this))
        router.post('/identify', this.identify.bind(this))
        return router
    }

    async identify(req: Request, res: Response): Promise<void> {
        const { cpf } = req.body
        const result = await this.customerService.findByCpf(cpf)

        if (isLeft(result)) {
            res.status(400).json(result.value.message)
        } else {
            res.setHeader('Location', `/customers/${result.value}`)
            res.status(201).json({
                id: result.value.getId(),
                name: result.value.getName(),
                email: result.value.getEmail(),
                cpf: result.value.getCpf(),
            })
        }
    }

    async registerCustomer(req: Request, res: Response): Promise<void> {
        const { name, email, cpf } = req.body
        const result = await this.customerService.registerCustomer(
            name,
            email,
            cpf
        )

        if (isLeft(result)) {
            res.status(400).json(result.value.message)
        } else {
            res.setHeader('Location', `/customers/${result.value}`)
            res.status(201).json({
                message: 'created successfully',
            })
        }
    }
}
