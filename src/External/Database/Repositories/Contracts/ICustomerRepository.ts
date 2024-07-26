import { Either } from '../../../../@Shared/Either'
import Customer from '../../../../Entities/Customer'

export default interface ICustomerRepository {
    create(customer: Customer): Promise<Either<Error, string>>
    update(customer: Customer): Promise<Either<Error, string>>
    delete(cpf: string): Promise<Either<Error, string>>
    findByCpf(cpf: string): Promise<Either<Error, Customer>>
}
