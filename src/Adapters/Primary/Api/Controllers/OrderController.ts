import { Request, Response, Router } from 'express'
import { isLeft } from '../../../../Shared/util/either'
import IOrderService from '../../../../Application/Ports/Primary/IOrderService'
import ICustomerService from '../../../../Application/Ports/Primary/ICustomerService'

export default class OrderController {
    constructor(readonly orderService: IOrderService) {}

    buildRouter(): Router {
        const router = Router()
        router.post('/', this.startOrder.bind(this))
        router.get('/', this.listOrders.bind(this))
        router.get('/:id', this.getOrder.bind(this))
        router.put('/:id', this.updateOrder.bind(this))
        return router
    }

    async startOrder(req: Request, res: Response): Promise<void> {
        const { name, cpf, products } = req.body

        if (!name) {
            res.status(400).json({
                message: 'name is required',
            })
        }

        const result = await this.orderService.createOrder({
            name,
            cpf,
            ...products,
        })

        if (isLeft(result)) {
            res.status(400).json(result.value.message)
        } else {
            res.setHeader('Location', `/orders/${result.value}`)
            res.status(201).json(result.value)
        }
    }

    async listOrders(req: Request, res: Response): Promise<void> {
        const result = await this.orderService.getAllOrders()

        if (isLeft(result)) {
            res.status(400).json(result.value.message)
        } else {
            res.status(200).json(result)
        }
    }

    async getOrder(req: Request, res: Response): Promise<void> {
        const { id } = req.params
        const result = await this.orderService.getOrder(id)

        if (isLeft(result)) {
            res.status(400).json(result.value.message)
        } else {
            res.status(200).json(result)
        }
    }

    async updateOrder(req: Request, res: Response): Promise<void> {
        const { id } = req.params
        const { cpf, products } = req.body
        const resultCustomer = await this.customerService.findByCpf(cpf)

        if (isLeft(resultCustomer)) {
            res.status(400).json(resultCustomer.value.message)
        } else {
            const customer: Customer = resultCustomer.value
            const result = await this.orderService.updateOrder(
                id,
                customer,
                products,
                false
            )

            if (isLeft(result)) {
                res.status(400).json(result.value.message)
            } else {
                res.setHeader('Location', `/orders/${result.value}`)
                res.status(201).json(result.value)
            }
        }
    }
}
