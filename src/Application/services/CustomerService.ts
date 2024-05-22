import { Either, isLeft, isRight } from '../../Shared/util/either'
import ICustomerService from '../Ports/Primary/ICustomerService'
import ICustomerRepository from '../Ports/Secondary/ICustomerRepository'
import Customer from '../domain/Entities/Customer'
import CpfNotFoundException from '../domain/Exceptions/CpfNotFoundException'
import Cpf from '../domain/ValueObjects/Cpf'

export default class CustomerService implements ICustomerService {
    private repository: ICustomerRepository

    constructor(repository: ICustomerRepository) {
        this.repository = repository
    }

    async registerCustomer(
        name: string,
        email: string,
        cpf: string
    ): Promise<Either<Error, string>> {
        const customer = new Customer(name, cpf, email)
        return this.repository.create(customer)
    }

    async updateCustomer(
        name: string,
        email: string,
        cpf: string
    ): Promise<Either<Error, string>> {
        const customerSaved = await this.repository.findByCpf(cpf)

        if (isLeft(customerSaved)) {
            throw new CpfNotFoundException()
        }

        customerSaved.value.setEmail(email)
        customerSaved.value.setName(name)

        return this.repository.create(customerSaved.value)
    }

    async deleteCustomer(cpf: string): Promise<Either<Error, string>> {
        return this.repository.delete(cpf)
    }

    async findByCpf(cpf: string): Promise<Either<Error, Customer>> {
        const validatedCpf = new Cpf(cpf)
        const customerSaved = await this.repository.findByCpf(
            validatedCpf.getValue()
        )

        if (isLeft(customerSaved)) {
            throw new CpfNotFoundException()
        }

        return customerSaved
    }
}
