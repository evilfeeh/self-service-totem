import { Either } from '../../@Shared/Either'
import Order from '../../Entities/Order'
import IOrderRepository from '../../External/Database/Repositories/Contracts/IOrderRepository'
import { IOrderGatewayRepository } from '../contracts/IOrderGatewayRepository'

export default class OrderGatewayRepository implements IOrderGatewayRepository {
    constructor(private readonly repository: IOrderRepository) {}

    create(order: Order): Promise<Either<Error, string>> {
        return this.repository.create(order)
    }

    update(order: Order): Promise<Either<Error, string>> {
        return this.repository.update(order)
    }

    delete(id: string): Promise<Either<Error, string>> {
        return this.repository.delete(id)
    }

    get(id: string): Promise<Either<Error, Order>> {
        return this.repository.get(id)
    }

    getAll(): Promise<Either<Error, Order[]>> {
        return this.repository.getAll()
    }

    list(): Promise<Either<Error, Order[]>> {
        return this.repository.list()
    }
}
