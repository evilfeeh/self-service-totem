import { Either } from '../../../Shared/util/either'
import Order, { OrderOutputDTO } from '../../domain/Entities/Order'

export default interface IOrderService {
    createOrder(
        customer: OrderOutputDTO['customer'],
        products: OrderOutputDTO['products'],
        closed: OrderOutputDTO['closed']
    ): Promise<Either<Error, string>>
    getOrder(id: Order['id']): Promise<Either<Error, OrderOutputDTO>>
    getAllOrders(): Promise<Either<Error, OrderOutputDTO[]>>
    updateOrder(
        id: Order['id'],
        products: Order['products'],
        closed: Order['closed']
    ): Promise<Either<Error, string>>
}
