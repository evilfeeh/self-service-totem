import InvalidCpfException from '../Exceptions/InvalidCpfException'

export default class Cpf {
    private cpf: string

    constructor(cpf: string) {
        if (!this.isValid(cpf)) {
            throw new InvalidCpfException()
        }
    }

    private isValid(cpf: string): boolean {
        // Verificar se possui 14 dígitos (com máscara)
        if (cpf.length !== 14) {
            return false
        }

        // Verificar se possui máscara
        if (cpf[3] !== '.' || cpf[7] !== '.' || cpf[11] !== '-') {
            return false
        }

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

        this.cpf = cpf

        return true
    }

    getValue(): string {
        return this.cpf
    }
}
