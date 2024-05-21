import { Request, Response, Router } from 'express'
import { isLeft } from '../../../../Shared/util/either'
import IProductService from '../../../../Application/Ports/Primary/IProductService'
import { CategoryEnum } from '../../../../Application/domain/Enums/CategoryEnum'

export default class ProductController {
    constructor(readonly productService: IProductService) {}

    buildRouter(): Router {
        const router = Router()
        router.post('/', this.createProduct.bind(this))
        router.put('/:id', this.updateProduct.bind(this))
        router.get('/:category', this.getProductbyCategory.bind(this))
        router.delete('/:id', this.deleteProductById.bind(this))
        return router
    }

    async createProduct(req: Request, res: Response): Promise<void> {
        const { name, category, price, description } = req.body
        const result = await this.productService.createProduct(
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
        const result = await this.productService.updateProduct(
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
            res.status(201).json({
                message: 'updated successfully',
            })
        }
    }

    async getProductbyCategory(req: Request, res: Response): Promise<void> {
        const { category } = req.params
        const catEnum: CategoryEnum = category as CategoryEnum

        const result = await this.productService.findByCategory(catEnum)

        if (isLeft(result)) {
            res.status(400).json(result.value.message)
        } else {
            res.setHeader('Location', `/products/${result.value}`)
            res.status(201).json({ products: result.value })
        }
    }

    async deleteProductById(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        const result = await this.productService.deleteProduct(id)

        if (isLeft(result)) {
            res.status(400).json(result.value.message)
        } else {
            res.setHeader('Location', `/products/${result.value}`)
            res.status(201).json({
                message: 'deleted successfully',
            })
        }
    }
}
