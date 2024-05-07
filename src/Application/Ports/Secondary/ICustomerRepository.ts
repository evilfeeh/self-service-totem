import { Either } from '../../../Shared/util/either'
import Customer from '../../domain/Entities/Customer'

export default interface ICustomerRepository {
    create(customer: Customer): Promise<Either<Error, string>>
    update(customer: Customer): Promise<Either<Error, string>>
    delete(cpf: string): Promise<Either<Error, number>>
    findByCpf(cpf: string): Promise<Either<Error, Customer>>
}
