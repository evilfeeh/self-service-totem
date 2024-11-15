import { vi } from 'vitest'
import { Request, Response } from 'express'
import {
    createMockInputProduct,
    createMockProduct,
} from '../../tests/mocks/product.mock'
import { createMock } from '../../tests/utils/mock.util'
import { Right, Left } from '../../src/@Shared/Either'
import ProductController from '../../src/Controllers/ProductController'
import { CategoryEnum } from '../../src/Entities/Enums/CategoryEnum'
import CreateProductUseCase from '../../src/UseCases/Product/create/create.usecase'
import DeleteProductUseCase from '../../src/UseCases/Product/delete/delete.usecase'
import FindProductsByCategoryUseCase from '../../src/UseCases/Product/findByCategory/findProductsByCategory.usecase'
import UpdateProductUseCase from '../../src/UseCases/Product/update/update.usecase'

describe('ProductController', () => {
    let createUseCase: jest.Mocked<CreateProductUseCase>
    let updateUseCase: jest.Mocked<UpdateProductUseCase>
    let deleteUseCase: jest.Mocked<DeleteProductUseCase>
    let findByCategoryUseCase: jest.Mocked<FindProductsByCategoryUseCase>
    let productController: ProductController
    let req: Partial<Request>
    let res: Partial<Response>

    beforeEach(() => {
        createUseCase = createMock<CreateProductUseCase>()
        updateUseCase = createMock<UpdateProductUseCase>()
        deleteUseCase = createMock<DeleteProductUseCase>()
        findByCategoryUseCase = createMock<FindProductsByCategoryUseCase>()

        productController = new ProductController(
            createUseCase,
            updateUseCase,
            findByCategoryUseCase,
            deleteUseCase
        )

        req = {
            body: {},
            params: {},
        }
        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis(),
            setHeader: vi.fn(),
        }
    })

    it('should create a product successfully', async () => {
        req.body = createMockInputProduct()
        createUseCase.execute.mockResolvedValue(Right('1'))

        await productController.createProduct(req as Request, res as Response)

        expect(createUseCase.execute).toHaveBeenCalledWith(req.body)
        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.setHeader).toHaveBeenCalledWith('Location', '/products/1')
        expect(res.json).toHaveBeenCalledWith({
            message: 'created successfully',
        })
    })

    it('should return an error when creating a product fails', async () => {
        req.body = createMockInputProduct()
        createUseCase.execute.mockResolvedValue(Left(new Error('Error')))

        await productController.createProduct(req as Request, res as Response)

        expect(createUseCase.execute).toHaveBeenCalledWith(req.body)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith('Error')
    })

    it('should update a product successfully', async () => {
        req.body = createMockInputProduct()
        req.params = { id: '1' }
        updateUseCase.execute.mockResolvedValue(Right('1'))

        await productController.updateProduct(req as Request, res as Response)

        expect(updateUseCase.execute).toHaveBeenCalledWith({
            id: '1',
            ...req.body,
        })
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.setHeader).toHaveBeenCalledWith('Location', '/products/1')
        expect(res.json).toHaveBeenCalledWith({
            message: 'updated successfully',
        })
    })

    it('should return an error when updating a product fails', async () => {
        req.body = createMockInputProduct()
        req.params = { id: '1' }
        updateUseCase.execute.mockResolvedValue(Left(new Error('Error')))

        await productController.updateProduct(req as Request, res as Response)

        expect(updateUseCase.execute).toHaveBeenCalledWith({
            id: '1',
            ...req.body,
        })
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith('Error')
    })

    it('should get products by category successfully', async () => {
        req.params = { category: 'Bebida' }
        const products = [createMockProduct().toJSON()]
        findByCategoryUseCase.execute.mockResolvedValue(Right(products))
    
        await productController.getProductbyCategory(req as Request, res as Response)
    
        expect(findByCategoryUseCase.execute).toHaveBeenCalledWith({
            category: CategoryEnum.Drink,
        })
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ products })
    })

    it('should return an error when getting products by category fails', async () => {
        req.params = { category: 'Bebida' }
        findByCategoryUseCase.execute.mockResolvedValue(
            Left(new Error('Error'))
        )

        await productController.getProductbyCategory(
            req as Request,
            res as Response
        )

        expect(findByCategoryUseCase.execute).toHaveBeenCalledWith({
            category: CategoryEnum.Drink,
        })
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith('Error')
    })

    it('should delete a product successfully', async () => {
        req.params = { id: '1' }
        deleteUseCase.execute.mockResolvedValue(Right('1'))

        await productController.deleteProductById(
            req as Request,
            res as Response
        )

        expect(deleteUseCase.execute).toHaveBeenCalledWith({ id: '1' })
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.setHeader).toHaveBeenCalledWith('Location', '/products/1')
        expect(res.json).toHaveBeenCalledWith({
            message: 'deleted successfully',
        })
    })

    it('should return an error when deleting a product fails', async () => {
        req.params = { id: '1' }
        deleteUseCase.execute.mockResolvedValue(Left(new Error('Error')))

        await productController.deleteProductById(
            req as Request,
            res as Response
        )

        expect(deleteUseCase.execute).toHaveBeenCalledWith({ id: '1' })
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith('Error')
    })
})
