import { Either } from '../../../Shared/util/either'
import { Payment } from '../../domain/Entities/Payment'

export default interface IPaymentRepository {
    checkout(payment: Payment): Promise<Either<Error, Payment>>
    get(id: string): Promise<Either<Error, Payment>>
    updateStatus(id: string, status: string): Promise<Either<Error, string>>
}
