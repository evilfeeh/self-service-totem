import { Either } from '../../@Shared/Either'
import { Payment } from '../../Entities/Payment'
import IExternalPaymentRepository from '../../External/Payment/Contracts/IExternalPaymentRepository'
import IExternalPaymentGatewayRepository from '../contracts/IExternalPaymentGatewayRepository'

export default class ExternalPaymentGatewayRepository
    implements IExternalPaymentGatewayRepository
{
    constructor(private readonly external: IExternalPaymentRepository) {}

    async generateQrCodePaymentString(
        payment: Payment
    ): Promise<Either<Error, String>> {
        return this.external.generateQrCodePaymentString(payment)
    }

    async getPaymentStatusById(
        externalPaymentId: String
    ): Promise<Either<Error, String>> {
        return this.external.getPaymentStatusById(externalPaymentId)
    }
}
