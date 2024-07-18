import { Either } from '../../../Shared/util/either'
import { Payment } from '../../domain/Entities/Payment'
import Product from '../../domain/Entities/Product'

export default interface IPaymentService {
    checkout(orderId: string): Promise<Either<Error, Payment>>
    get(id: string): Promise<Either<Error, Payment>>
    updateStatus(id: string, status: string): Promise<Either<Error, string>>
    create(
        orderId: string,
        orderAmount: number,
        products: Product[]
    ): Promise<Either<Error, string>>
    cancel(orderId: string): Promise<Either<Error, string>>
}
