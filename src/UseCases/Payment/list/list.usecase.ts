import { Either, isLeft, Left, Right } from '../../../@Shared/Either'
import { Payment } from '../../../Entities/Payment'
import IPaymentGatewayRepository from '../../../Gateways/contracts/IPaymentGatewayRepository'
import { ListOutputDto } from './list.dto'

export default class ListUseCase {
    constructor(
        private readonly paymentRepository: IPaymentGatewayRepository
    ) {}

    async execute(): Promise<Either<Error, ListOutputDto>> {
        const result = await this.paymentRepository.list()

        if (isLeft(result)) {
            return Left<Error>(result.value)
        }

        const payments = result.value.map((result) => {
            return {
                id: result.getId(),
                status: result.getStatus(),
                order: result.getOrder(),
            }
        })

        const paymentDto = { payments }

        return Right(paymentDto)
    }
}
