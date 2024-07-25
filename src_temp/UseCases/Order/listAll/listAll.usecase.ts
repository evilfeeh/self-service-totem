import { Either, isLeft, Right } from '../../../@Shared/Either'
import Order from '../../../Entities/Order'
import { IOrderGatewayRepository } from '../../../Gateways/contracts/IOrderGatewayRepository'
import { OutputListAllOrdersDTO } from './listAll.dto'

export default class ListAllOrdersUseCase {
    constructor(private readonly orderRepository: IOrderGatewayRepository) {}

    async execute(): Promise<Either<Error, OutputListAllOrdersDTO[]>> {
        const orders = await this.orderRepository.getAll()

        if (isLeft(orders)) {
            return orders
        }

        const ordersDTO = orders.value.map((order) => {
            return order.toJSON()
        })

        return Right<OutputListAllOrdersDTO[]>(ordersDTO)
    }
}
