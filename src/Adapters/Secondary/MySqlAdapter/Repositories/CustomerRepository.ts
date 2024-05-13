import { Repository } from 'typeorm'
import Customer from '../../../../Application/domain/Entities/Customer'
import ICustomerRepository from '../../../../Application/Ports/Secondary/ICustomerRepository'
import { Either, Left, Right } from '../../../../Shared/util/either'
import { AppDataSource } from '../index'
import { Customer as model } from '../models/Customer'
import CpfNotFoundException from '../../../../Application/domain/Exceptions/CpfNotFoundException'

export default class CustomerRepository implements ICustomerRepository {
    private repository: Repository<model>

    constructor() {
        this.repository = AppDataSource.getRepository(model)
    }

    async create(customer: Customer): Promise<Either<Error, string>> {
        try {
            const customerModel = new model()
            customerModel.name = customer.getName()
            customerModel.email = customer.getEmail()
            customerModel.cpf = customer.getCpf()

            await this.repository.save(customerModel)

            return Right<string>(customer.getCpf())
        } catch (error) {
            return Left<Error>(error as Error)
        }
    }

    async update(customer: Customer): Promise<Either<Error, string>> {
        try {
            const customerToUpdate = await this.repository.findOneBy({
                cpf: customer.getCpf(),
            })

            if (!customerToUpdate) {
                return Left<Error>(new CpfNotFoundException())
            }

            customerToUpdate.name = customer.getName()
            customerToUpdate.email = customer.getEmail() ?? ''

            await this.repository.save(customerToUpdate)

            return Right<string>(customer.getCpf())
        } catch (error) {
            return Left<Error>(error as Error)
        }
    }

    async delete(cpf: string): Promise<Either<Error, string>> {
        const customerToRemove = await this.repository.findOneBy({
            cpf,
        })

        if (!customerToRemove) {
            return Left<Error>(new CpfNotFoundException())
        }

        await this.repository.remove(customerToRemove)

        return Right<string>('Customer has been removed')
    }

    async findByCpf(cpf: string): Promise<Either<Error, Customer>> {
        const customerFind = await this.repository.findOneBy({
            cpf,
        })

        if (!customerFind) {
            return Left<Error>(new CpfNotFoundException())
        }

        const customer = new Customer(
            customerFind.name,
            customerFind.cpf,
            customerFind.email
        )
        return Right<Customer>(customer)
    }
}
