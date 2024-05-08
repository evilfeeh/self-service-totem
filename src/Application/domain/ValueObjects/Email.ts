import InvalidEmailException from '../Exceptions/InvalidEmailException'

export default class Email {
    private readonly email: string

    constructor(email: string) {
        if (!this.isValid(email)) {
            throw new InvalidEmailException()
        }
        this.email = email
    }

    private isValid(email: string): boolean {
        // Expressão regular para validação de email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        // Verificar se o email corresponde à expressão regular
        return emailRegex.test(email)
    }

    getValue(): string {
        return this.email
    }
}
