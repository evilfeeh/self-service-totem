import { Router } from 'express'
import ProductUseCases from '../../UseCases/Product/ProductUseCases'
import ProductController from '../../Controllers/ProductController'
import ProductRepository from '../Repositories/DatabaseRepository/ProductRepository'

export default class ProductRoutes {
    private readonly productRepository: ProductRepository
    private readonly productUsecases: ProductUseCases
    private readonly productController: ProductController

    constructor() {
        this.productRepository = new ProductRepository()
        this.productUsecases = new ProductUseCases(this.productRepository)
        this.productController = new ProductController(this.productUsecases)
    }

    buildRouter(): Router {
        const router = Router()
        router.post('/', this.productController.createProduct.bind(this))
        router.put('/:id', this.productController.updateProduct.bind(this))
        router.get('/:category', this.productController.getProductbyCategory.bind(this))
        router.delete('/:id', this.productController.deleteProductById.bind(this))
        return router
    }
}
