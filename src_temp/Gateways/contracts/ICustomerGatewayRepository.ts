import { Either } from '../../@Shared/Either'
import Customer from '../../Entities/Customer'

export interface ICustomerGatewayRepository {
    create(customer: Customer): Promise<Either<Error, string>>
    update(customer: Customer): Promise<Either<Error, string>>
    delete(cpf: string): Promise<Either<Error, string>>
    findByCpf(cpf: string): Promise<Either<Error, Customer>>
}
