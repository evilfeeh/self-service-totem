import { Either } from '../../../Shared/util/either'
import Product from '../../domain/Entities/Product'

export default interface IPaymentService {
    create(
        orderId: number,
        orderAmount: number,
        products: Product[]
    ): Promise<Either<Error, string>>
    get(orderId: number): Promise<Either<Error, unknown>>
    cancel(orderId: number): Promise<Either<Error, string>>
}
