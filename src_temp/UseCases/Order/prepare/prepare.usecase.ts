import { Either, isLeft, Left, Right } from '../../../@Shared/Either'
import { StatusEnum } from '../../../Entities/Enums/StatusEnum'
import { IOrderGatewayRepository } from '../../../Gateways/contracts/IOrderGatewayRepository'
import { InputPrepareOrderDTO } from './prepare.dto'

export default class PrepareOrderUseCase {
    constructor(private readonly orderRepository: IOrderGatewayRepository) {}

    async execute({
        id,
    }: InputPrepareOrderDTO): Promise<Either<Error, string>> {
        const order = await this.orderRepository.get(id)

        if (isLeft(order)) {
            return order
        }

        // validate if order payment is approved

        order.value.updateStatus(StatusEnum.Preparing)
        
        return this.orderRepository.update(order.value)
    }
}
