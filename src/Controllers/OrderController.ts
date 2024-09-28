import { Request, Response, Router } from 'express'
import CreateOrderUseCase from '../UseCases/Order/create/create.usecase'
import { isLeft } from '../@Shared/Either'
import ListOrdersUseCase from '../UseCases/Order/list/list.usecase'
import ListAllOrdersUseCase from '../UseCases/Order/listAll/listAll.usecase'
import PrepareOrderUseCase from '../UseCases/Order/prepare/prepare.usecase'
import FinishPrepareOrderUseCase from '../UseCases/Order/finishPrepare/finishPrepare.usecase'
import FinishOrderUseCase from '../UseCases/Order/finish/finish.usecase'
import FindOrderByIdUseCase from '../UseCases/Order/findById/findById.usecase'

export default class OrderController {
    private createOrderUseCase: CreateOrderUseCase
    private listOrdersUseCase: ListOrdersUseCase
    private listAllOrdersUseCase: ListAllOrdersUseCase
    private findOrderByIdUseCase: FindOrderByIdUseCase
    private prepareOrderUseCase: PrepareOrderUseCase
    private finishPrepareOrderUseCase: FinishPrepareOrderUseCase
    private finishOrderUseCase: FinishOrderUseCase

    constructor(
        createOrderUseCase: CreateOrderUseCase,
        listOrdersUseCase: ListOrdersUseCase,
        listAllOrdersUseCase: ListAllOrdersUseCase,
        findOrderByIdUseCase: FindOrderByIdUseCase,
        prepareOrderUseCase: PrepareOrderUseCase,
        finishPrepareOrderUseCase: FinishPrepareOrderUseCase,
        finishOrderUseCase: FinishOrderUseCase
    ) {
        this.createOrderUseCase = createOrderUseCase
        this.listOrdersUseCase = listOrdersUseCase
        this.listAllOrdersUseCase = listAllOrdersUseCase
        this.findOrderByIdUseCase = findOrderByIdUseCase
        this.prepareOrderUseCase = prepareOrderUseCase
        this.finishPrepareOrderUseCase = finishPrepareOrderUseCase
        this.finishOrderUseCase = finishOrderUseCase
    }

    async startOrder(req: Request, res: Response): Promise<void> {
        const { user_name, cpf, products } = req.body

        if (!user_name) {
            res.status(400).json({
                message: 'user_name is required',
            })
        }

        const result = await this.createOrderUseCase.execute({
            name: user_name,
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
        const result = await this.listOrdersUseCase.execute()

        if (isLeft(result)) {
            res.status(400).json(result.value.message)
        } else {
            const orders = result.value
            res.status(200).json({ orders })
        }
    }

    async listAllOrders(req: Request, res: Response): Promise<void> {
        const result = await this.listAllOrdersUseCase.execute()

        if (isLeft(result)) {
            res.status(400).json(result.value.message)
        } else {
            const orders = result.value
            res.status(200).json({ orders })
        }
    }

    async getOrder(req: Request, res: Response): Promise<void> {
        const { id } = req.params
        const result = await this.findOrderByIdUseCase.execute({ id })

        if (isLeft(result)) {
            res.status(400).json(result.value.message)
        } else {
            const order = result.value
            res.status(200).json(order)
        }
    }

    async prepareOrder(req: Request, res: Response): Promise<void> {
        const { id } = req.params
        const result = await this.prepareOrderUseCase.execute({ id })

        if (isLeft(result)) {
            res.status(400).json(result.value.message)
        } else {
            const order = result.value
            res.status(200).json(order)
        }
    }

    async finishPrepareOrder(req: Request, res: Response): Promise<void> {
        const { id } = req.params
        const result = await this.finishPrepareOrderUseCase.execute({ id })

        if (isLeft(result)) {
            res.status(400).json(result.value.message)
        } else {
            const order = result.value
            res.status(200).json(order)
        }
    }

    async finishOrder(req: Request, res: Response): Promise<void> {
        const { id } = req.params
        const result = await this.finishOrderUseCase.execute({ id })

        if (isLeft(result)) {
            res.status(400).json(result.value.message)
        } else {
            const order = result.value
            res.status(200).json(order)
        }
    }
}
