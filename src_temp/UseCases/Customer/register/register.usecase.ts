import { Either, Left } from '../../../@Shared/Either'
import Customer from '../../../Entities/Customer'
import { ICustomerGatewayRepository } from '../../../Gateways/contracts/ICustomerGatewayRepository'
import { InputRegisterCustomerDTO } from './register.dto'

export default class RegisterCustomerUseCase {
    constructor(
        private readonly customerRepository: ICustomerGatewayRepository
    ) {}

    async execute(
        input: InputRegisterCustomerDTO
    ): Promise<Either<Error, string>> {
        try {
            const customer = new Customer(input.name, input.cpf, input.email)
            return this.customerRepository.create(customer)
        } catch (error: unknown) {
            if (error instanceof Error) {
                return Left(error)
            } else {
                return Left(new Error('Internal Server Error'))
            }
        }
    }
}
