import { Either } from '../../@Shared/Either'
import { Payment } from '../../Entities/Payment'

export default interface IPaymentGatewayRepository {
    checkout(payment: Payment): Promise<Either<Error, Payment>>
    getById(id: string): Promise<Either<Error, Payment>>
    updateStatus(id: string, status: string): Promise<Either<Error, string>>
}
