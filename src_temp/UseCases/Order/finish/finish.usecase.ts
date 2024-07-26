import { Either, isLeft, Left, Right } from '../../../@Shared/Either'
import { StatusEnum } from '../../../Entities/Enums/StatusEnum'
import { IOrderGatewayRepository } from '../../../Gateways/contracts/IOrderGatewayRepository'
import { InputFinishOrderDTO } from './finish.dto'

export default class FinishOrderUseCase {
    constructor(private readonly orderRepository: IOrderGatewayRepository) {}

    async execute({
        id,
    }: InputFinishOrderDTO): Promise<Either<Error, string>> {
        const order = await this.orderRepository.get(id)

        if (isLeft(order)) {
            return order
        }

        // validate if order payment is approved

        order.value.updateStatus(StatusEnum.Finished)
        
        return this.orderRepository.update(order.value)
    }
}
