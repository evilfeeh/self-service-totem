import { Either, isLeft, Left } from '../../../@Shared/Either'
import CpfNotFoundException from '../../../Entities/Exceptions/CpfNotFoundException'
import ICustomerGatewayRepository from '../../../Gateways/contracts/ICustomerGatewayRepository'
import { InputUpdateCustomerDTO } from './update.dto'

export default class UpdateCustomerUseCase {
    constructor(
        private readonly customerRepository: ICustomerGatewayRepository
    ) {}

    async execute(
        input: InputUpdateCustomerDTO
    ): Promise<Either<Error, string>> {
        try {
            const customerSaved = await this.customerRepository.findByCpf(
                input.cpf
            )

            if (isLeft(customerSaved)) {
                throw new CpfNotFoundException()
            }

            customerSaved.value.setEmail(input.email)
            customerSaved.value.setName(input.name)

            return this.customerRepository.create(customerSaved.value)
        } catch (error) {
            if (error instanceof Error) {
                return Left(error)
            } else {
                return Left(new Error('Internal Server Error'))
            }
        }
    }
}
