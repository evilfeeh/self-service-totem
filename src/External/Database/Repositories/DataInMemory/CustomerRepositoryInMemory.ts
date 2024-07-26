import ICustomerRepository from '../Contracts/ICustomerRepository'
import Customer from '../../../../Entities/Customer'
import CpfAlreadyRegistered from '../../../../Entities/Exceptions/CpfAlreadyRegistered'
import CpfNotFoundException from '../../../../Entities/Exceptions/CpfNotFoundException'
import { Either, Left, Right } from '../../../../@Shared/Either'

type CustomerType = {
    name: string
    email: string
    cpf: string
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

    async delete(cpf: string): Promise<Either<Error, string>> {
        const existingCustomerIndex = this.list.findIndex(
            (customerFind) => customerFind.cpf === cpf
        )

        if (existingCustomerIndex <= -1) {
            Left<Error>(new CpfNotFoundException())
        }

        this.list.splice(existingCustomerIndex, 1)
        return Right<string>('Customer removed')
    }

    async findByCpf(cpf: string): Promise<Either<Error, Customer>> {
        let customer = undefined
        const customerSaved = this.list.find(
            (customerFind) => customerFind.cpf === cpf
        )

        if (customerSaved) {
            customer = new Customer(
                customerSaved.name,
                customerSaved.cpf,
                customerSaved.email
            )

            return Right<Customer>(customer)
        }

        return Left<Error>(new CpfNotFoundException())
    }
}
