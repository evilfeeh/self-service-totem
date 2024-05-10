import InvalidCpfException from '../Exceptions/InvalidCpfException'

export default class Cpf {
    private readonly cpf: string

    constructor(cpf: string) {
        if (!this.isValid(cpf)) {
            throw new InvalidCpfException()
        }
        this.cpf = cpf
    }

    private isValid(cpf: string): boolean {
        // Remover caracteres não numéricos
        cpf = cpf.replace(/\D/g, '')

        // Verificar se possui 11 dígitos
        if (cpf.length !== 11) {
            return false
        }

        // Verificar se todos os dígitos são iguais
        if (/^(\d)\1+$/.test(cpf)) {
            return false
        }

        // Calcular dígitos verificadores
        let sum = 0
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cpf.charAt(i)) * (10 - i)
        }
        let remainder = (sum * 10) % 11
        if (remainder === 10 || remainder === 11) remainder = 0
        if (remainder !== parseInt(cpf.charAt(9))) {
            return false
        }

        sum = 0
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cpf.charAt(i)) * (11 - i)
        }
        remainder = (sum * 10) % 11
        if (remainder === 10 || remainder === 11) remainder = 0
        if (remainder !== parseInt(cpf.charAt(10))) {
            return false
        }

        return true
    }

    getValue(): string {
        return this.cpf
    }
}
