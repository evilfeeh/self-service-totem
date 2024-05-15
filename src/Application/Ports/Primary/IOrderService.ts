import { Either } from '../../../Shared/util/either'
import Order, { OrderOutputDTO } from '../../domain/Entities/Order'
import Product from '../../domain/Entities/Product'

export default interface IOrderService {
    createOrder(
        customer: OrderOutputDTO['customer'],
        products: Product[],
        closed: OrderOutputDTO['closed']
    ): Promise<Either<Error, string>>
    getOrder(id: Order['id']): Promise<Either<Error, Order>>
    getAllOrders(): Promise<Either<Error, Order[]>>
    updateOrder(
        id: Order['id'],
        customer: OrderOutputDTO['customer'],
        products: Product[],
        closed: OrderOutputDTO['closed']
    ): Promise<Either<Error, string>>
}
