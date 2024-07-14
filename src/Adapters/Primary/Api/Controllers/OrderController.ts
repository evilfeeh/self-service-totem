import { Request, Response, Router } from 'express'
import { isLeft } from '../../../../Shared/util/either'
import IOrderService from '../../../../Application/Ports/Primary/IOrderService'

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
            products,
        })

        if (isLeft(result)) {
            res.status(400).json(result.value.message)
        } else {
            res.setHeader('Location', `/orders/${result.value}`)
            res.status(201).json({
                message: `created successfully`,
                id: result.value,
            })
        }
    }

    async listOrders(req: Request, res: Response): Promise<void> {
        const result = await this.orderService.listOrders()

        if (isLeft(result)) {
            res.status(400).json(result.value.message)
        } else {
            const orders = result.value.map((order) => ({
                id: order.getId(),
                items: order.getItems(),
                customer: order.getCustomer(),
                total: order.getTotalOrderValue(),
                closed: order.isClosed(),
                status: order.getStatus(),
                createdAt: order.getCreatedAt(),
            }))
            res.status(200).json({ orders })
        }
    }

    async getOrder(req: Request, res: Response): Promise<void> {
        const { id } = req.params
        const result = await this.orderService.getOrder(id)

        if (isLeft(result)) {
            res.status(400).json(result.value.message)
        } else {
            const order = result.value
            const orderResult = {
                id: order.getId(),
                items: order.getItems(),
                customer: order.getCustomer(),
                total: order.getTotalOrderValue(),
                closed: order.isClosed(),
                status: order.getStatus(),
                createdAt: order.getCreatedAt(),
            }
            res.status(200).json(orderResult)
        }
    }

    async updateOrder(req: Request, res: Response): Promise<void> {
        const { id } = req.params
        const { name, cpf, products } = req.body

        if (!name) {
            res.status(400).json({
                message: 'name is required',
            })
        }

        const result = await this.orderService.updateOrder(id, {
            name,
            cpf,
            products,
        })

        if (isLeft(result)) {
            res.status(400).json(result.value.message)
        } else {
            res.setHeader('Location', `/orders/${result.value}`)
            res.status(200).json({
                message: `updated successfully`,
                id: result.value,
            })
        }
    }
}
