import Cpf from './ValueObjects/Cpf'
import Email from './ValueObjects/Email'

export default class Customer {
    private id: string | null
    private name: string
    private cpf: Cpf
    private email: Email

    constructor(
        name: string,
        cpf: string,
        email: string,
        id: string | null = null
    ) {
        this.id = id
        this.name = name
        this.cpf = new Cpf(cpf)
        this.email = new Email(email)
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

    getId(): string | null {
        return this.id
    }

    getName(): string {
        return this.name
    }

    getCpf(): string {
        return this.cpf.getValue()
    }

    getEmail(): string {
        return this.email.getValue()
    }

    toJSON() {
        return {
            id: this.id || '',
            name: this.name,
            cpf: this.cpf.getValue(),
            email: this.email.getValue(),
        }
    }
}
