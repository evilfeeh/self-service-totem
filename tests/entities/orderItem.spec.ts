import { CategoryEnum } from '../../src/Entities/Enums/CategoryEnum'
import OrderItem from '../../src/Entities/OrderItem'
import Product from '../../src/Entities/Product'

describe('OrderItem entity', () => {
    let orderItem: OrderItem

    beforeEach(() => {
        const product = new Product(
            '1',
            'Hamburguer Classic',
            CategoryEnum.Sandwich,
            10,
            'Muito suculento'
        )
        orderItem = new OrderItem(product, 1)
    })

    it('should create a order item entity correctly', () => {
        expect(orderItem.getQuantity()).toBe(1)
        expect(orderItem.getProduct().getName()).toBe('Hamburguer Classic')
    })

    it('should change the quantity of the order item', () => {
        orderItem.updateQuantity(2)

        expect(orderItem.getQuantity()).toBe(2)
    })

    it('should return the total value of the order item', () => {
        expect(orderItem.getTotalValue()).toBe(10)
    })

    it('should return an object', () => {
        expect(orderItem.toJSON()).toEqual({
            id: null,
            product: {
                id: '1',
                name: 'Hamburguer Classic',
                category: CategoryEnum.Sandwich,
                price: 10,
                description: 'Muito suculento',
            },
            quantity: 1,
            total: 10,
        })
    })

    it('should return the id', () => {
        expect(orderItem.getId()).toBeNull()
    })

    it('should throw an error when quantity is zero', () => {
        expect(() => {
            orderItem.updateQuantity(0)
        }).toThrow()
    })

    it('should throw an error when quantity is negative', () => {
        expect(() => {
            orderItem.updateQuantity(-1)
        }).toThrow()
    })

    it('should throw an error when price is negative', () => {
        const product = new Product(
            '1',
            'Hamburguer Classic',
            CategoryEnum.Sandwich,
            10,
            'Muito suculento'
        )
        expect(() => {
            product.setPrice(-1)
            orderItem = new OrderItem(product, 1)
        }).toThrow()
    })
})
