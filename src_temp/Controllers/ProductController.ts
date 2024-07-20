import { Request, Response } from 'express'
import IProductUseCases from '../UseCases/Product/IProductUseCases'
import { isLeft } from '../Infrastructure/@Shared/Util/Either'
import { CategoryEnum } from '../Entities/Enums/CategoryEnum'

export default class ProductController {
    constructor(readonly productUsecase: IProductUseCases) {}

    async createProduct(req: Request, res: Response): Promise<void> {
        const { name, category, price, description } = req.body
        const result = await this.productUsecase.createProduct(
            name,
            category,
            price,
            description
        )

        if (isLeft(result)) {
            res.status(400).json(result.value.message)
        } else {
            res.setHeader('Location', `/products/${result.value}`)
            res.status(201).json({
                message: 'created successfully',
            })
        }
    }

    async updateProduct(req: Request, res: Response): Promise<void> {
        const { name, category, price, description } = req.body
        const { id } = req.params
        const result = await this.productUsecase.updateProduct(
            id,
            name,
            category,
            price,
            description
        )

        if (isLeft(result)) {
            res.status(400).json(result.value.message)
        } else {
            res.setHeader('Location', `/products/${result.value}`)
            res.status(200).json({
                message: 'updated successfully',
            })
        }
    }

    async getProductbyCategory(req: Request, res: Response): Promise<void> {
        const { category } = req.params
        const catEnum: CategoryEnum = category as CategoryEnum

        const result = await this.productUsecase.findByCategory(catEnum)

        if (isLeft(result)) {
            res.status(400).json(result.value.message)
        } else {
            res.setHeader('Location', `/products/${result.value}`)
            res.status(200).json({ products: result.value })
        }
    }

    async deleteProductById(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        const result = await this.productUsecase.deleteProduct(id)

        if (isLeft(result)) {
            res.status(400).json(result.value.message)
        } else {
            res.setHeader('Location', `/products/${result.value}`)
            res.status(200).json({
                message: 'deleted successfully',
            })
        }
    }
}
