import { Either } from '../../../Shared/util/either'
import Order from '../../../Application/domain/Entities/Order'

export default interface IOrderRepository {
    create(Order: Order): Promise<Either<Error, string>>
    get(id: Order['id']): Promise<Either<Error, Order>>
    getAll(): Promise<Either<Error, Order[]>>
    update(Order: Order): Promise<Either<Error, string>>
    delete(cpf: string): Promise<Either<Error, string>>
}
