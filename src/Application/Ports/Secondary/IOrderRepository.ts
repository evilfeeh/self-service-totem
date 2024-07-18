import { Either } from '../../../Shared/util/either'
import Order from '../../../Application/domain/Entities/Order'

export default interface IOrderRepository {
    create(order: Order): Promise<Either<Error, string>>
    update(order: Order): Promise<Either<Error, string>>
    delete(id: string): Promise<Either<Error, string>>
    get(id: string): Promise<Either<Error, Order>>
    getAll(): Promise<Either<Error, Order[]>>
    list(): Promise<Either<Error, Order[]>>
}
