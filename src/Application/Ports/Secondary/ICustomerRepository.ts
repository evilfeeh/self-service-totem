import { Either } from '@Shared/util/either'
import Customer from '@Entities/Customer'

export default interface ICustomerRepository {
    saveOrUpdate(customer: Customer): Promise<Either<Error, string>>
    delete(cpf: string): Promise<void>
    findByCpf(cpf: string): Promise<Customer | undefined>
}
