import { Either } from '../../../@Shared/Either'
import { Payment } from '../../../Entities/Payment'
import IPaymentGatewayRepository from '../../../Gateways/contracts/IPaymentGatewayRepository'
import { InputGetByIdDTO } from './getById.dto'

export default class GetByIdUseCase {
    constructor(
        private readonly paymentRepository: IPaymentGatewayRepository
    ) {}

    async execute(input: InputGetByIdDTO): Promise<Either<Error, Payment>> {
        return await this.paymentRepository.getById(input.id)
    }
}
