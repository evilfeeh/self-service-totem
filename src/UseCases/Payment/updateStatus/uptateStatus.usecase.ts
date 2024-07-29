import { Either } from '../../../@Shared/Either'
import IPaymentGatewayRepository from '../../../Gateways/contracts/IPaymentGatewayRepository'
import { InputUpdateStatusDTO } from './updateStatus.dto'

export default class UpdateStatusUseCase {
    constructor(
        private readonly paymentRepository: IPaymentGatewayRepository
    ) {}

    async execute(input: InputUpdateStatusDTO): Promise<Either<Error, string>> {
        return await this.paymentRepository.updateStatus(input.id, input.status)
    }
}
