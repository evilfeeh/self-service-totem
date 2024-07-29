import { Either, isLeft, Left, Right } from '../../../@Shared/Either'
import { StatusEnum } from '../../../Entities/Enums/StatusEnum'
import { IOrderGatewayRepository } from '../../../Gateways/contracts/IOrderGatewayRepository'
import { InputFinishPrepareOrderDTO } from './finishPrepare.dto'

export default class FinishPrepareOrderUseCase {
    constructor(private readonly orderRepository: IOrderGatewayRepository) {}

    async execute({
        id,
    }: InputFinishPrepareOrderDTO): Promise<Either<Error, string>> {
        const order = await this.orderRepository.get(id)

        if (isLeft(order)) {
            return order
        }

        // validate if order payment is approved

        order.value.updateStatus(StatusEnum.Ready)
        
        return this.orderRepository.update(order.value)
    }
}
