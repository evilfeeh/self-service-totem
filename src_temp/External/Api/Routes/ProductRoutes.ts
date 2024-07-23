import { Router } from 'express'
import ProductController from '../../../Controllers/ProductController'
import ProductRepository from '../../Database/Repositories/DatabaseRepository/ProductRepository'
import CreateProductUseCase from '../../../UseCases/Product/create/create.usecase'
import UpdateProductUseCase from '../../../UseCases/Product/update/update.usecase'
import DeleteProductUseCase from '../../../UseCases/Product/delete/delete.usecase'
import FindProductsByCategoryUseCase from '../../../UseCases/Product/findByCategory/findProductsByCategory.usecase'

export default class ProductRoutes {
    private readonly productRepository: ProductRepository
    private readonly productController: ProductController
    private readonly createUseCase: CreateProductUseCase
    private readonly updateUseCase: UpdateProductUseCase
    private readonly deleteUseCase: DeleteProductUseCase
    private readonly findByCategoryUseCase: FindProductsByCategoryUseCase

    constructor() {
        this.productRepository = new ProductRepository()
        this.createUseCase = new CreateProductUseCase(this.productRepository)
        this.updateUseCase = new UpdateProductUseCase(this.productRepository)
        this.deleteUseCase = new DeleteProductUseCase(this.productRepository)
        this.findByCategoryUseCase = new FindProductsByCategoryUseCase(
            this.productRepository
        )
        this.productController = new ProductController(
            this.createUseCase,
            this.updateUseCase,
            this.findByCategoryUseCase,
            this.deleteUseCase
        )
    }

    buildRouter(): Router {
        const router = Router()
        router.post('/', this.productController.createProduct.bind(this))
        router.put('/:id', this.productController.updateProduct.bind(this))
        router.get(
            '/:category',
            this.productController.getProductbyCategory.bind(this)
        )
        router.delete(
            '/:id',
            this.productController.deleteProductById.bind(this)
        )
        return router
    }
}
