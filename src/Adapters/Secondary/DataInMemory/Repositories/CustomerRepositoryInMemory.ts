import ICustomerRepository from '@Application/Ports/Secondary/ICustomerRepository'
import Customer from '@Application/domain/Entities/Customer'
import CpfAlreadyRegistered from '@Application/domain/Exceptions/CpfAlreadyRegistered'
import CpfNotFoundException from '@Application/domain/Exceptions/CpfNotFoundException'
import { Either, Left, Right } from '@Shared/util/either'

type CustomerType = {
    name: string
    email: string | undefined
    cpf: string | undefined
}

export default class CustomerRepositoryInMemory implements ICustomerRepository {
    private list: CustomerType[]

    constructor() {
        this.list = []
    }

    async create(customer: Customer): Promise<Either<Error, string>> {
        const existingCustomerIndex = this.list.findIndex(
            (customerFind) => customerFind.cpf === customer.getCpf()
        )

        if (existingCustomerIndex !== -1) {
            return Left<Error>(new CpfAlreadyRegistered())
        }

        this.list.push({
            name: customer.getName(),
            cpf: customer.getCpf(),
            email: customer.getEmail(),
        })

        return Right(customer.getCpf()!)
    }

    async update(customer: Customer): Promise<Either<Error, string>> {
        const existingCustomerIndex = this.list.findIndex(
            (customerFind) => customerFind.cpf === customer.getCpf()
        )

        if (existingCustomerIndex <= -1) {
            return Left<Error>(new CpfNotFoundException())
        }

        this.list[existingCustomerIndex] = {
            name: customer.getName(),
            cpf: customer.getCpf(),
            email: customer.getEmail(),
        }

        return Right(customer.getCpf()!)
    }

    async delete(cpf: string): Promise<Either<Error, number>> {
        const existingCustomerIndex = this.list.findIndex(
            (customerFind) => customerFind.cpf === cpf
        )

        if (existingCustomerIndex <= -1) {
            Left<Error>(new CpfNotFoundException())
        }

        this.list.splice(existingCustomerIndex, 1)
        return Right<number>(existingCustomerIndex)
    }

    async findByCpf(cpf: string): Promise<Either<Error, Customer>> {
        let customer = undefined
        const customerSaved = this.list.find(
            (customerFind) => customerFind.cpf === cpf
        )

        if (customerSaved) {
            customer = new Customer(customerSaved.name)

            if (customerSaved.cpf) customer.setCpf(customerSaved.cpf)
            if (customerSaved.email) customer.setEmail(customerSaved.email)

            return Right<Customer>(customer)
        }

        return Left<Error>(new CpfNotFoundException())
    }
}
