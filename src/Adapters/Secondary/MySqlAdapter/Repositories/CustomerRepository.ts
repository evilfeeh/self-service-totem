import Customer from '@Application/Entities/Customer'
import ICustomerRepository from '@Application/Ports/Secondary/ICustomerRepository'
import { Either } from '@Shared/util/either'

export default class CustomerRepository implements ICustomerRepository {
    saveOrUpdate(customer: Customer): Promise<Either<Error, string>> {
        throw new Error('Method not implemented.')
    }
    delete(cpf: string): Promise<void> {
        throw new Error('Method not implemented.')
    }
    findByCpf(cpf: string): Promise<Customer | undefined> {
        throw new Error('Method not implemented.')
    }
}
