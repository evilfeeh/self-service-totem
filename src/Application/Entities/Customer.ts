import { Either } from '../../Shared/util/either'
import CpfNotFoundException from '../Exceptions/CpfNotFoundException'
import ICustomerService from '../Ports/Primary/ICustomerService'
import ICustomerRepository from '../Ports/Secondary/ICustomerRepository'
import Cpf from '../ValueObjects/Cpf'
import Email from '../ValueObjects/Email'

export default class Customer implements ICustomerService {
    private name: string
    private email?: Email
    private cpf?: Cpf
    private repository: ICustomerRepository

    constructor(name: string, repository: ICustomerRepository) {
        this.name = name
        this.repository = repository
    }

    setCpf(cpf: string): void {
        this.cpf = new Cpf(cpf)
    }

    setEmail(email: string): void {
        this.email = new Email(email)
    }

    getName(): string {
        return this.name
    }

    getCpf(): string | undefined {
        return this.cpf?.getValue()
    }

    getEmail(): string | undefined {
        return this.email?.getValue()
    }

    isConsumerFinal(): boolean {
        return !this.cpf
    }

    async saveOrUpdate(): Promise<Either<Error, string>> {
        return this.repository.saveOrUpdate(this)
    }

    async findByCpf(cpf: string): Promise<void> {
        const CustomerSaved = await this.repository.findByCpf(cpf)

        if (CustomerSaved) {
            this.cpf = CustomerSaved.cpf
            this.email = CustomerSaved.email
            this.name = CustomerSaved.name
        } else {
            throw new CpfNotFoundException()
        }
    }

    async delete(): Promise<void> {
        if (this.cpf) {
            await this.repository.delete(this.cpf.getValue())

            this.name = ''
            this.cpf = undefined
            this.email = undefined
        }
    }
}
