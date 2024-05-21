import { Either, isLeft, isRight } from '../../Shared/util/either'
import ICreateOrderDTO from '../DTOs/ICreateOrderDTO'
import IOrderService from '../Ports/Primary/IOrderService'
import ICustomerRepository from '../Ports/Secondary/ICustomerRepository'
import IOrderRepository from '../Ports/Secondary/IOrderRepository'
import IProductRepository from '../Ports/Secondary/IProductRepository'
import Customer from '../domain/Entities/Customer'
import Order from '../domain/Entities/Order'
import OrderItem from '../domain/Entities/OrderItem'
import Product from '../domain/Entities/Product'

export default class OrderService implements IOrderService {
    private repository: IOrderRepository
    private customerRepository: ICustomerRepository
    private productRepository: IProductRepository

    constructor(
        repository: IOrderRepository,
        customerRepository: ICustomerRepository,
        productRepository: IProductRepository
    ) {
        this.customerRepository = customerRepository
        this.repository = repository
        this.productRepository = productRepository
    }
    async createOrder(
        orderCustomer: ICreateOrderDTO
    ): Promise<Either<Error, string>> {
        const { name, cpf, products } = orderCustomer

        let customer: string | Customer = name

        if (cpf) {
            const resultCustomer = await this.customerRepository.findByCpf(cpf)

            if (isRight(resultCustomer)) {
                customer = resultCustomer.value
            }
        }

        const order = new Order(customer)

        for (const product of products) {
            const resultProduct = await this.productRepository.findById(
                product.id
            )

            if (isLeft(resultProduct)) {
                throw new Error('Product not found')
            }

            const productFind = resultProduct.value

            order.addItem(new OrderItem(productFind, product.quantity))
        }

        return this.repository.create(order)
    }
    async getOrder(id: string): Promise<Either<Error, Order>> {
        return this.repository.get(id)
    }
    async getAllOrders(): Promise<Either<Error, Order[]>> {
        return this.repository.getAll()
    }
    async updateOrder(
        id: string,
        customer: Customer,
        products: Product[],
        closed: boolean
    ): Promise<Either<Error, string>> {
        return this.repository.update(new Order(customer, id))
    }
}
