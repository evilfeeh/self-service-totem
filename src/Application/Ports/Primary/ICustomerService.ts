import { Either } from '@Shared/util/either'
import Customer from '@Entities/Customer'

export default interface ICustomerService {
    registerCustomer(
        name: string,
        email: string,
        cpf: string
    ): Promise<Either<Error, string>>
    updateCustomer(
        name: string,
        email: string,
        cpf: string
    ): Promise<Either<Error, string>>
    deleteCustomer(cpf: string): Promise<Either<Error, number>>
    findByCpf(cpf: string): Promise<Either<Error, Customer>>
}
