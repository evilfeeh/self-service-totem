import { Either } from '../../@Shared/Either'
import Customer from '../../Entities/Customer'
import ICustomerRepository from '../../External/Database/Repositories/Contracts/ICustomerRepository'
import { ICustomerGatewayRepository } from '../contracts/ICustomerGatewayRepository'

export default class CustomerGatewayRepository
    implements ICustomerGatewayRepository
{
    constructor(private readonly repository: ICustomerRepository) {}

    create(customer: Customer): Promise<Either<Error, string>> {
        return this.repository.create(customer)
    }

    update(customer: Customer): Promise<Either<Error, string>> {
        return this.repository.update(customer)
    }

    delete(cpf: string): Promise<Either<Error, string>> {
        return this.repository.delete(cpf)
    }

    findByCpf(cpf: string): Promise<Either<Error, Customer>> {
        return this.repository.findByCpf(cpf)
    }
}
