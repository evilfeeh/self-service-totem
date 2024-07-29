import { Request, Response } from 'express'
import { isLeft } from '../@Shared/Either'
import { CategoryEnum } from '../Entities/Enums/CategoryEnum'
import CreateProductUseCase from '../UseCases/Product/create/create.usecase'
import UpdateProductUseCase from '../UseCases/Product/update/update.usecase'
import DeleteProductUseCase from '../UseCases/Product/delete/delete.usecase'
import FindProductsByCategoryUseCase from '../UseCases/Product/findByCategory/findProductsByCategory.usecase'

export default class ProductController {
    private createUseCase: CreateProductUseCase
    private updateUseCase: UpdateProductUseCase
    private deleteUseCase: DeleteProductUseCase
    private findByCategoryUseCase: FindProductsByCategoryUseCase

    constructor(
        createUseCase: CreateProductUseCase,
        updateUseCase: UpdateProductUseCase,
        findByCategoryUseCase: FindProductsByCategoryUseCase,
        deleteUseCase: DeleteProductUseCase
    ) {
        this.createUseCase = createUseCase
        this.updateUseCase = updateUseCase
        this.findByCategoryUseCase = findByCategoryUseCase
        this.deleteUseCase = deleteUseCase
    }

    async createProduct(req: Request, res: Response): Promise<void> {
        const { name, category, price, description } = req.body
        const result = await this.createUseCase.execute({
            name,
            category,
            price,
            description,
        })

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
        const result = await this.updateUseCase.execute({
            id,
            name,
            category,
            price,
            description,
        })

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

        const result = await this.findByCategoryUseCase.execute({
            category: catEnum,
        })

        if (isLeft(result)) {
            res.status(400).json(result.value.message)
        } else {
            res.setHeader('Location', `/products/${result.value}`)
            res.status(200).json({ products: result.value })
        }
    }

    async deleteProductById(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        const result = await this.deleteUseCase.execute({
            id,
        })

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
