import Customer from '../../../Application/domain/Entities/Customer'
import Order from '../../../Application/domain/Entities/Order'
import Product from '../../../Application/domain/Entities/Product'

describe('Order entity', () => {
    let customer: Customer
    let product: Product

    beforeEach(() => {
        customer = { name: 'John Doe' } as unknown as Customer
        product = new Product(
            '1',
            'Hamburguer',
            'Sandwich',
            10,
            'Delicious hamburguer'
        )
    })

    it('should be able to create an order', () => {
        const order = new Order([product], customer)
        expect(order).toBeInstanceOf(Order)
        expect(order.getProducts()).toEqual([product])
        expect(order.getCustomer()).toEqual(customer)
        expect(order.isClosed()).toBe(false)
        expect(order.toJSON()).toEqual({
            products: [product.toJSON()],
            customer: { name: 'John Doe' },
            closed: false,
        })
    })

    it('should be able to add a product to an order', () => {
        const order = new Order([product], customer)
        const newProduct = new Product('2', 'Coke', 'Drink', 5, 'Cold coke')
        order.addProduct(newProduct)
        expect(order.getProducts()).toEqual([product, newProduct])
    })

    it('should be able to remove a product from an order', () => {
        const order = new Order([product], customer)
        const newProduct = new Product('2', 'Coke', 'Drink', 5, 'Cold coke')
        order.addProduct(newProduct)
        order.removeProduct(product)
        expect(order.getProducts()).toEqual([newProduct])
    })

    it('should be able to close an order', () => {
        const order = new Order([product], customer)
        order.closeOrder()
        expect(order.isClosed()).toBe(true)
    })

    it('should not be able to close an order without products', () => {
        const order = new Order([], customer)
        expect(() => order.closeOrder()).toThrow(
            'Order without products cannot be closed'
        )
    })

    it('should not be able to validate an order', () => {
        expect(
            () => new Order([product], undefined as unknown as Customer)
        ).toThrow('Invalid customer')
        expect(() => new Order([], customer, true)).toThrow(
            'Order without products cannot be closed'
        )
    })
})
