import { Request, Response, Router } from 'express'
import { isLeft } from '../../../../Shared/util/either'
import IPaymentService from '../../../../Application/Ports/Primary/IPaymentService'

export default class PaymentController {
    constructor(readonly paymentService: IPaymentService) {}

    buildRouter(): Router {
        const router = Router()
        router.post('/checkout', this.checkout.bind(this))
        return router
    }

    async checkout(req: Request, res: Response): Promise<void> {
        const { orderId } = req.body
        const result = await this.paymentService.checkout(orderId)

        if (isLeft(result)) {
            res.status(400).json(result.value.message)
        } else {
            res.setHeader('Location', `/payment/${result.value}`)
            res.status(200).json({
                message: 'Payment approved successfully',
            })
        }
    }
}
