import { Either } from '../../../@Shared/Either'
import { PaymentStatus } from '../../../Entities/Enums/PaymentStatusEnum'
import IPaymentGatewayRepository from '../../../Gateways/contracts/IPaymentGatewayRepository'
import { InputUpdateStatusDTO } from './updateStatus.dto'

export default class UpdateStatusUseCase {
    constructor(
        private readonly paymentRepository: IPaymentGatewayRepository
    ) {}

    async execute(input: InputUpdateStatusDTO): Promise<Either<Error, string>> {
        const status =
            input.status === 'approved'
                ? PaymentStatus.APPROVED
                : PaymentStatus.DECLINED

        return await this.paymentRepository.updateStatus(input.id, status)
    }
}
