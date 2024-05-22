import Product from '../../../Application/domain/Entities/Product'
import { CategoryEnum } from '../../../Application/domain/Enums/CategoryEnum'

describe('Product entity', () => {
    it('should be able to create an product', () => {
        const product = new Product(
            '1',
            'Hamburguer',
            CategoryEnum.Sandwich,
            10,
            'Delicious hamburguer'
        )
        expect(product).toBeInstanceOf(Product)
        expect(product.getId()).toBe('1')
        expect(product.getName()).toBe('Hamburguer')
        expect(product.getCategory()).toBe('Lanche')
        expect(product.getPrice()).toBe(10)
        expect(product.getDescription()).toBe('Delicious hamburguer')
        expect(product.toJSON()).toEqual({
            id: '1',
            name: 'Hamburguer',
            category: 'Lanche',
            price: 10,
            description: 'Delicious hamburguer',
        })
    })

    it('should be able to update product', () => {
        const product = new Product(
            '1',
            'Hamburguer',
            CategoryEnum.Sandwich,
            10,
            'Delicious hamburguer'
        )
        product.setName('Cheeseburguer')
        product.setCategory(CategoryEnum.Sandwich)
        product.setPrice(12)
        product.setDescription('Delicious cheeseburguer')
        expect(product.toJSON()).toEqual({
            id: '1',
            name: 'Cheeseburguer',
            category: CategoryEnum['Sandwich'],
            price: 12,
            description: 'Delicious cheeseburguer',
        })
    })

    it('should not be able to create a product with invalid category', () => {
        expect(
            () =>
                new Product(
                    '1',
                    'Hamburguer',
                    'Invalid' as unknown as CategoryEnum,
                    10,
                    'Delicious hamburguer'
                )
        ).toThrow('Product: category is invalid')
    })

    it('should not be able to create a product with invalid price', () => {
        expect(
            () =>
                new Product(
                    '1',
                    'Hamburguer',
                    CategoryEnum.Sandwich,
                    -10,
                    'Delicious hamburguer'
                )
        ).toThrow('Product: price is invalid')
    })

    it('should not be able to create a product with invalid name', () => {
        expect(
            () =>
                new Product(
                    '1',
                    '',
                    CategoryEnum.Sandwich,
                    10,
                    'Delicious hamburguer'
                )
        ).toThrow('Product: name is invalid')
    })

    it('should not be able to create a product with invalid description', () => {
        expect(
            () => new Product('1', 'Hamburguer', CategoryEnum.Sandwich, 10, '')
        ).toThrow('Product: description is invalid')
    })
})
