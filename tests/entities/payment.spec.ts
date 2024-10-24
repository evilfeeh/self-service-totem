import { PaymentStatus } from '../../src/Entities/Enums/PaymentStatusEnum'
import { StatusEnum } from '../../src/Entities/Enums/StatusEnum'
import { Payment } from '../../src/Entities/Payment'
import { CategoryEnum } from '../../src/Entities/Enums/CategoryEnum'
import Order from '../../src/Entities/Order'
import Product from '../../src/Entities/Product'
import OrderItem from '../../src/Entities/OrderItem'
import dotenv from 'dotenv'

describe('Payment entity', () => {
    beforeAll(() => {
        dotenv.config({
            path: '.env.test',
        })
    })
    let payment: Payment
    beforeEach(() => {
        const quindim = new Product(
            '1',
            'Quindim de coco',
            CategoryEnum.Dessert,
            8.0,
            'Uma sobremesa deliciosa com um toque brasileiro'
        )

        const order = new Order(
            'Jorginho',
            '1',
            StatusEnum.Received,
            new Date()
        )

        order.addItem(new OrderItem(quindim, 1))

        payment = new Payment('1', '1', PaymentStatus.INITIALIZED, order)
    })

    it('should create a payment entity correctly', () => {
        expect(payment.getOrder().getTotalOrderValue()).toBe(8.0)
        expect(payment.getStatus()).toBe(PaymentStatus.INITIALIZED)
    })

    it('should change payment status', () => {
        payment.setStatus(PaymentStatus.APPROVED)

        expect(payment.getStatus()).toBe(PaymentStatus.APPROVED)
    })

    it('should return an object', () => {
        expect(typeof payment.toJSON()).toBe('object')
    })

    it('should return total', () => {
        expect(payment.getOrder().getTotalOrderValue()).toBe(8.0)
    })

    it('should return order', () => {
        expect(payment.getOrder().getTotalOrderValue()).toBe(8.0)
    })

    it('should return status', () => {
        expect(payment.getStatus()).toBe(PaymentStatus.INITIALIZED)
    })

    it('should return id', () => {
        expect(payment.getId()).toBe('1')
    })

    it('should return order id', () => {
        expect(payment.getOrderId()).toBe('1')
    })

    it('should set value', () => {
        payment.setValue(10.0)

        expect(payment.getValue()).toBe(10.0)
    })

    it('should list products', () => {
        const bridadeiro = new Product(
            '2',
            'Brigadeiro',
            CategoryEnum.Dessert,
            8.0,
            'Uma sobremesa deliciosa com um toque brasileiro'
        )

        payment.setProducts([bridadeiro])

        expect(payment.getProducts()).toBeInstanceOf(Array)
        expect(payment.getProducts().length).toBe(1)
    })

    it('get payment url', () => {
        expect(payment.getPaymentUrl()).toBe('http://localhost:3000/payments/1')
    })

    it('get notification url', () => {
        expect(payment.getNotificationUrl()).toBe(process.env.NOTIFICATION_URL)
    })
})
