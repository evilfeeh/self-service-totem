import { Either } from '../../@Shared/Either'
import { Payment } from '../../Entities/Payment'
import IPaymentRepository from '../../External/Database/Repositories/Contracts/IPaymentRepository'
import IPaymentGatewayRepository from '../contracts/IPaymentGatewayRepository'

export default class PaymentGatewayRepository
    implements IPaymentGatewayRepository
{
    constructor(private readonly repository: IPaymentRepository) {}

    async checkout(payment: Payment): Promise<Either<Error, Payment>> {
        return this.repository.checkout(payment)
    }

    async getById(id: string): Promise<Either<Error, Payment>> {
        return this.repository.getById(id)
    }

    async updateStatus(
        id: string,
        status: string
    ): Promise<Either<Error, string>> {
        return this.repository.updateStatus(id, status)
    }
}
