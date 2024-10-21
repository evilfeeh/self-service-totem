import { Either, isLeft, Right } from '../../../@Shared/Either'
import CpfNotFoundException from '../../../Entities/Exceptions/CpfNotFoundException'
import Cpf from '../../../Entities/ValueObjects/Cpf'
import { ICustomerGatewayRepository } from '../../../Gateways/contracts/ICustomerGatewayRepository'
import {
    InputFindCustomerByCpfDTO,
    OutputFindCustomerByCpfDTO,
} from './findCustomerByCpf.dto'

export default class FindCustomerByCpfUseCase {
    constructor(
        private readonly customerRepository: ICustomerGatewayRepository
    ) {}

    async execute(
        input: InputFindCustomerByCpfDTO
    ): Promise<Either<Error, OutputFindCustomerByCpfDTO>> {
        const validatedCpf = new Cpf(input.cpf)
        const customerSaved = await this.customerRepository.findByCpf(
            validatedCpf.getValue()
        )

        if (isLeft(customerSaved)) {
            throw new CpfNotFoundException()
        }

        return Right({ ...customerSaved.value.toJSON() })
    }
}
