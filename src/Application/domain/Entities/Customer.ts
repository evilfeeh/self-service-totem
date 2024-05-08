import { Either } from '../../../Shared/util/either'
import ICustomerRepository from '../../Ports/Secondary/ICustomerRepository'
import CpfNotFoundException from '../Exceptions/CpfNotFoundException'
import Cpf from '../ValueObjects/Cpf'
import Email from '../ValueObjects/Email'

export default class Customer {
    private name: string
    private email?: Email
    private cpf?: Cpf

    constructor(name: string) {
        this.name = name
    }

    setCpf(cpf: string): void {
        this.cpf = new Cpf(cpf)
    }

    setEmail(email: string): void {
        this.email = new Email(email)
    }

    setName(name: string): void {
        this.name = name
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
}
