import { Either } from '../../Shared/util/either'
import IOrderService from '../Ports/Primary/IOrderService'
import IOrderRepository from '../Ports/Secondary/IOrderRepository'
import Customer from '../domain/Entities/Customer'
import Order from '../domain/Entities/Order'
import Product from '../domain/Entities/Product'

export default class OrderService implements IOrderService {
    private repository: IOrderRepository

    constructor(repository: IOrderRepository) {
        this.repository = repository
    }
    async createOrder(
        customer: Customer,
        products: Product[],
        closed: boolean
    ): Promise<Either<Error, string>> {
        const order = new Order(customer)
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
