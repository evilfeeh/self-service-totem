import { Either } from '../../../Shared/util/either'
import Customer from '../../domain/Entities/Customer'
import Order from '../../domain/Entities/Order'
import Product from '../../domain/Entities/Product'

export default interface IOrderService {
    createOrder(
        customer: Customer,
        products: Product[],
        closed: boolean
    ): Promise<Either<Error, string>>
    getOrder(id: Order['id']): Promise<Either<Error, Order>>
    getAllOrders(): Promise<Either<Error, Order[]>>
    updateOrder(
        id: Order['id'],
        customer: Customer,
        products: Product[],
        closed: boolean
    ): Promise<Either<Error, string>>
}
