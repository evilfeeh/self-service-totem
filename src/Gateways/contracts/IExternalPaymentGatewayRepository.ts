import { Either } from '../../@Shared/Either'
import { Payment } from '../../Entities/Payment'

export default interface IExternalPaymentGatewayRepository {
    generateQrCodePaymentString(
        payment: Payment
    ): Promise<Either<Error, String>>
    getPaymentStatusById(
        externalPaymentId: String
    ): Promise<Either<Error, String>>
}
