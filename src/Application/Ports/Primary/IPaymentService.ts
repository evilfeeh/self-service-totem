import { Either } from '../../../Shared/util/either'
import { Payment } from '../../domain/Entities/Payment'
import Product from '../../domain/Entities/Product'

export default interface IPaymentService {
    create(
        orderId: string,
        orderAmount: number,
        products: Product[]
    ): Promise<Either<Error, string>>
    get(orderId: string): Promise<Either<Error, unknown>>
    cancel(orderId: string): Promise<Either<Error, string>>
    checkout(orderId: string): Promise<Either<Error, Payment>>
}
