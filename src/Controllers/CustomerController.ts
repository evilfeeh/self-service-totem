import { Request, Response } from 'express'
import { isLeft } from '../@Shared/Either'
import RegisterCustomerUseCase from '../UseCases/Customer/register/register.usecase'
import FindCustomerByCpfUseCase from '../UseCases/Customer/findByCpf/findCustomerByCpf.usecase'

export default class CustomerController {
    private registerCustomerUseCase: RegisterCustomerUseCase
    private findCustomerByCpf: FindCustomerByCpfUseCase

    constructor(
        registerCustomerUseCase: RegisterCustomerUseCase,
        findCustomerByCpf: FindCustomerByCpfUseCase
    ) {
        this.registerCustomerUseCase = registerCustomerUseCase
        this.findCustomerByCpf = findCustomerByCpf
    }

    async identify(req: Request, res: Response): Promise<void> {
        const { cpf } = req.body
        const result = await this.findCustomerByCpf.execute(cpf)

        if (isLeft(result)) {
            res.status(400).json(result.value.message)
        } else {
            res.setHeader('Location', `/customers/${result.value.id}`)
            res.status(200).json(result.value)
        }
    }

    async registerCustomer(req: Request, res: Response): Promise<void> {
        const { name, email, cpf } = req.body
        const result = await this.registerCustomerUseCase.execute({
            name,
            email,
            cpf,
        })

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
