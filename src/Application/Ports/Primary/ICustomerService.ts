import { Either } from '../../../Shared/util/either'
import Customer from '../../Entities/Customer'

export default interface ICustomerService {
    saveOrUpdate(): Promise<Either<Error, string>>
    delete(): Promise<void>
    findByCpf(cpf: string): Promise<void>
}
