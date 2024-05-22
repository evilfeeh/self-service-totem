import { isLeft } from '../../../Shared/util/either'
import ProductRepositoryInMemory from '../../../Adapters/Secondary/DataInMemory/Repositories/ProductRepositoryInMemory'
import ProductService from '../../../Application/services/ProductService'
import { CategoryEnum } from '../../../Application/domain/Enums/CategoryEnum'

describe('ProductService', () => {
    it('should create a product', async () => {
        const productRepository = new ProductRepositoryInMemory()
        const productService = new ProductService(productRepository)

        const result = await productService.createProduct(
            'Coca',
            CategoryEnum.Drink,
            10,
            'Refreshing drink'
        )

        expect(result.tag).toBe('right')
        expect(result.value).toContain('Product has been created')
    })

    // it('should update a product', async () => {
    //     const productRepository = new ProductRepositoryInMemory()
    //     const productService = new ProductService(productRepository)

    //     await productService.createProduct(
    //         'Hambuger',
    //         'Sandwich',
    //         10,
    //         'Delicious food'
    //     )

    //     const product = await productService.findByCategory('Sandwich')

    //     if (isLeft(product)) {
    //         throw new Error('Product not found')
    //     }

    //     const result = await productService.updateProduct(
    //         product.value[0].getId(),
    //         'Hambuger',
    //         'Sandwich',
    //         15,
    //         'Delicious food'
    //     )

    //     expect(result.tag).toBe('right')
    //     expect(result.value).toBe('Product has been updated, Hambuger')
    // })

    it('should not update a product', async () => {
        const productRepository = new ProductRepositoryInMemory()
        const productService = new ProductService(productRepository)

        await productService.createProduct(
            'Hambuger',
            CategoryEnum.Sandwich,
            10,
            'Delicious food'
        )

        const result = await productService.updateProduct(
            '1',
            'Hambuger',
            CategoryEnum.Sandwich,
            15,
            'Delicious food'
        )

        expect(result.tag).toBe('left')
    })

    it('should delete a product', async () => {
        const productRepository = new ProductRepositoryInMemory()
        const productService = new ProductService(productRepository)
        await productService.createProduct(
            'Fries',
            CategoryEnum.Side,
            5,
            'Delicious food'
        )

        const result = await productService.deleteProduct('Fries')

        expect(result.tag).toBe('right')
        expect(result.value).toBe('Product removed, Fries')
    })

    it('should find a product by category', async () => {
        const productRepository = new ProductRepositoryInMemory()
        const productService = new ProductService(productRepository)

        expect(
            (await productService.findByCategory(CategoryEnum.Drink)).value
        ).toStrictEqual([])

        await productService.createProduct(
            'Coca',
            CategoryEnum.Drink,
            10,
            'Refreshing drink'
        )
        await productService.createProduct(
            'Fanta',
            CategoryEnum.Drink,
            10,
            'Refreshing drink'
        )

        const result = await productService.findByCategory(CategoryEnum.Drink)

        if (isLeft(result)) {
            throw new Error('Product not found')
        }

        expect(result.tag).toBe('right')
        expect(result.value.length).toBe(2)
    })
})
