import Order from '../../src/Entities/Order'
import OrderItem from '../../src/Entities/OrderItem'
import Product from '../../src/Entities/Product'
import { StatusEnum } from '../../src/Entities/Enums/StatusEnum'
import { CategoryEnum } from '../../src/Entities/Enums/CategoryEnum'

import StatusOrderException from '../../src/@Shared/StatusOrderException'
import OrderWithOutProductsException from '../../src/@Shared/OrderWithOutProductsException'

describe('Order entity', () => {
    let order: Order

    beforeEach(() => {
        order = new Order(
            'John Doe',
            '123456789',
            StatusEnum.Received,
            new Date()
        )
    })

    it('should add an item to the order', () => {
        const product = new Product(
            '1',
            'Hamburguer Classic',
            CategoryEnum.Sandwich,
            10,
            'Muito suculento'
        )
        const orderItem = new OrderItem(product, 1)

        order.addItem(orderItem)

        expect(order.getItems().length).toBe(1)
        expect(order.getItems()[0]).toEqual(orderItem)
    })

    it('should remove an item from the order', () => {
        const product = new Product(
            '1',
            'Hamburguer Classic',
            CategoryEnum.Sandwich,
            10,
            'Muito suculento'
        )
        const orderItem = new OrderItem(product, 1)
        order.addItem(orderItem)
        order.removeProduct(product)

        expect(order.getItems().length).toBe(0)
    })

    it('should set the status for the order', () => {
        order.updateStatus(StatusEnum.Preparing)

        expect(order.getStatus()).toBe(StatusEnum.Preparing)
    })

    it('should throw an error if the status is invalid', () => {
        expect(() => {
            order.updateStatus(StatusEnum.Preparing)
            order.updateStatus(StatusEnum.Preparing)
        }).toThrow(StatusOrderException)
    })
})
