import { Either, isLeft, Left, Right } from '../../../@Shared/Either'
import IPaymentGatewayRepository from '../../../Gateways/contracts/IPaymentGatewayRepository'
import { InputGetByIdDTO, OutputGetByIdDTO } from './getById.dto'

export default class GetByIdUseCase {
    constructor(
        private readonly paymentRepository: IPaymentGatewayRepository
    ) {}

    async execute(
        input: InputGetByIdDTO
    ): Promise<Either<Error, OutputGetByIdDTO>> {
        const paymentResult = await this.paymentRepository.getById(input.id)

        if (isLeft(paymentResult)) {
            return Left<Error>(paymentResult.value)
        }

        const outputPayment = {
            id: paymentResult.value.getId(),
            status: paymentResult.value.getStatus(),
            orderId: paymentResult.value.getOrderId(),
        }

        return Right(outputPayment)
    }
}
