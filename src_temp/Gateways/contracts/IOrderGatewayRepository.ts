import { Either } from '../../@Shared/Either'
import Order from '../../Entities/Order'

export interface IOrderGatewayRepository {
    create(order: Order): Promise<Either<Error, string>>
    update(order: Order): Promise<Either<Error, string>>
    delete(id: string): Promise<Either<Error, string>>
    get(id: string): Promise<Either<Error, Order>>
    getAll(): Promise<Either<Error, Order[]>>
    list(): Promise<Either<Error, Order[]>>
}
