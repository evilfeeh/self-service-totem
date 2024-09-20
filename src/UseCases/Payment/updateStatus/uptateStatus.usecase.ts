import { Either, isLeft, Left } from '../../../@Shared/Either'
import { PaymentStatus } from '../../../Entities/Enums/PaymentStatusEnum'
import IExternalPaymentGatewayRepository from '../../../Gateways/contracts/IExternalPaymentGatewayRepository'
import IPaymentGatewayRepository from '../../../Gateways/contracts/IPaymentGatewayRepository'
import { InputUpdateStatusDTO } from './updateStatus.dto'

export default class UpdateStatusUseCase {
    constructor(
        private readonly paymentRepository: IPaymentGatewayRepository,
        private readonly externalPaymentRepository: IExternalPaymentGatewayRepository
    ) {}

    async execute(input: InputUpdateStatusDTO): Promise<Either<Error, string>> {
        const paymentStatus =
            await this.externalPaymentRepository.getPaymentStatusById(
                input.externalPaymentId
            )

        if (isLeft(paymentStatus)) {
            return Left<Error>(
                new Error('Erro ao recuperar status do pagamento')
            )
        }

        const status =
            paymentStatus.value === 'approved'
                ? PaymentStatus.APPROVED
                : PaymentStatus.DECLINED

        return await this.paymentRepository.updateStatus(input.id, status)
    }
}
