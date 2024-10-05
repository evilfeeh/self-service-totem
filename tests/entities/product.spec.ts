import Product from '../../src/Entities/Product'
import InvalidFieldException from '../../src/@Shared/InvalidFieldException'
import { CategoryEnum } from '../../src/Entities/Enums/CategoryEnum'

describe('Product Entity', () => {
    let product: Product

    beforeEach(() => {
        product = new Product(
            '1',
            'Quindim de coco',
            CategoryEnum.Dessert,
            8.0,
            'Uma sobremesa deliciosa com um toque brasileiro'
        )
    })

    describe('constructor', () => {
        it('should create a new product with valid fields', () => {
            expect(product.getName()).toBe('Quindim de coco')
            expect(product.getPrice()).toBe(8.0)
            expect(product.getCategory()).toBe(CategoryEnum.Dessert)
            expect(product.getDescription()).toBe(
                'Uma sobremesa deliciosa com um toque brasileiro'
            )
        })

        it('should throw an error if the name is empty', () => {
            expect(() => {
                new Product('1', '', CategoryEnum.Dessert, 10, 'Description 1')
            }).toThrow(InvalidFieldException)
        })

        it('should throw an error if category is invalid', () => {
            expect(() => {
                new Product(
                    '1',
                    'Quindim de coco',
                    'invalid' as CategoryEnum,
                    10,
                    'Description 1'
                )
            }).toThrow(InvalidFieldException)
        })

        it('should throw an error if the price is negative', () => {
            expect(() => {
                new Product(
                    '1',
                    'Quindim de coco',
                    CategoryEnum.Dessert,
                    -1,
                    'Description 1'
                )
            }).toThrow(InvalidFieldException)
        })

        it('should throw an error if the description is empty', () => {
            expect(() => {
                new Product(
                    '1',
                    'Quindim de coco',
                    CategoryEnum.Dessert,
                    10,
                    ''
                )
            }).toThrow(InvalidFieldException)
        })
    })

    describe('Getting prorperties of product', () => {
        it('should return the product id', () => {
            expect(product.getId()).toBe('1')
        })

        it('should return the product name', () => {
            expect(product.getName()).toBe('Quindim de coco')
        })

        it('should return the product price', () => {
            expect(product.getPrice()).toBe(8.0)
        })

        it('should return the product category', () => {
            expect(product.getCategory()).toBe('Sobremesa')
        })

        it('should return the product description', () => {
            expect(product.getDescription()).toBe(
                'Uma sobremesa deliciosa com um toque brasileiro'
            )
        })
    })

    describe('Setting prorperties of product', () => {
        it('should set the product name', () => {
            product.setName('Suco de maracuja')
            expect(product.getName()).toBe('Suco de maracuja')
        })

        it('should set the product price', () => {
            product.setPrice(10.0)
            expect(product.getPrice()).toBe(10.0)
        })

        it('should set the product category', () => {
            product.setCategory(CategoryEnum.Drink)
            expect(product.getCategory()).toBe('Bebida')
        })

        it('should set the product description', () => {
            product.setDescription('Uma bebida deliciosa e refrescante')
            expect(product.getDescription()).toBe(
                'Uma bebida deliciosa e refrescante'
            )
        })
    })

    describe('toJSON', () => {
        it('should return an object with the product properties', () => {
            expect(product.toJSON()).toEqual({
                id: '1',
                name: 'Quindim de coco',
                category: 'Sobremesa',
                price: 8.0,
                description: 'Uma sobremesa deliciosa com um toque brasileiro',
            })
        })
    })
})
