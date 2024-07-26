import { Request, Response, Router } from 'express'
import { isLeft } from '../../../../Shared/util/either'
import IPaymentService from '../../../../Application/Ports/Primary/IPaymentService'
import Order from '../../../../Application/domain/Entities/Order'

export default class PaymentController {
    constructor(readonly paymentService: IPaymentService) {}

    buildRouter(): Router {
        const router = Router()
        router.post('/checkout', this.checkout.bind(this))
        router.get('/:id', this.get.bind(this))
        router.post('/update-status/:id', this.updateStatus.bind(this))
        return router
    }

    async checkout(req: Request, res: Response): Promise<void> {
        const { orderId } = req.body
        const result = await this.paymentService.checkout(orderId)

        if (isLeft(result)) {
            res.status(400).json(result.value.message)
        } else {
            const payment = result.value
            const order = payment.getOrder()
            let items: any[] = []
            if (order instanceof Order) {
                items = order.getItems()
            }
            const paymentResult = {
                id: payment.getId(),
                status: payment.getStatus(),
                orderId: payment.getOrderId(),
                items: items.map((item) => item.toJson()),
            }
            res.status(200).json(paymentResult)
        }
    }

    async get(req: Request, res: Response): Promise<void> {
        const { id } = req.params
        const result = await this.paymentService.get(id)

        if (isLeft(result)) {
            res.status(400).json(result.value.message)
        } else {
            const payment = result.value
            const paymentResult = {
                id: payment.getId(),
                status: payment.getStatus(),
                orderId: payment.getOrderId(),
            }
            res.status(200).json(paymentResult)
        }
    }

    async updateStatus(req: Request, res: Response): Promise<void> {
        const { id } = req.params
        const { status } = req.body
        const result = await this.paymentService.updateStatus(id, status)

        if (isLeft(result)) {
            res.status(400).json(result.value.message)
        } else {
            res.status(200).json({
                message: result.value,
            })
        }
    }
}
