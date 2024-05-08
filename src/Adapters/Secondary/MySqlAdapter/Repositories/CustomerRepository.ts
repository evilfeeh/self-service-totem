import Customer from '@Application/Entities/Customer'
import ICustomerRepository from '@Application/Ports/Secondary/ICustomerRepository'
import { Either } from '@Shared/util/either'

export default class CustomerRepository implements ICustomerRepository {
    create(customer: Customer): Promise<Either<Error, string>> {
        throw new Error('Method not implemented.')
    }
    update(customer: Customer): Promise<Either<Error, string>> {
        throw new Error('Method not implemented.')
    }
    saveOrUpdate(customer: Customer): Promise<Either<Error, string>> {
        throw new Error('Method not implemented.')
    }
    delete(cpf: string): Promise<Either<Error, number>> {
        throw new Error('Method not implemented.')
    }
    findByCpf(cpf: string): Promise<Either<Error, Customer>> {
        throw new Error('Method not implemented.')
    }
}
