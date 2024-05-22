import { Either } from '../../../Shared/util/either'
import ICreateOrderDTO from '../../DTOs/ICreateOrderDTO'
import Customer from '../../domain/Entities/Customer'
import Order from '../../domain/Entities/Order'
import Product from '../../domain/Entities/Product'

export default interface IOrderService {
    createOrder(orderCustomer: ICreateOrderDTO): Promise<Either<Error, string>>
    getOrder(id: Order['id']): Promise<Either<Error, Order>>
    getAllOrders(): Promise<Either<Error, Order[]>>
    updateOrder(
        id: string,
        orderCustomer: ICreateOrderDTO
    ): Promise<Either<Error, string>>
}
