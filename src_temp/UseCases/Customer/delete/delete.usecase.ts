import { Either } from '../../../@Shared/Either'
import ICustomerGatewayRepository from '../../../Gateways/contracts/ICustomerGatewayRepository'
import { InputDeleteCustomerDTO } from './delete.dto'

export default class DeleteCustomerUseCase {
    constructor(
        private readonly customerRepository: ICustomerGatewayRepository
    ) {}

    async execute(
        input: InputDeleteCustomerDTO
    ): Promise<Either<Error, string>> {
        return this.customerRepository.delete(input.cpf)
    }
}
