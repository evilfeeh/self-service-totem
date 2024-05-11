import Customer from '@Entities/Customer'
import InvalidCpfException from '@Exceptions/InvalidCpfException'
import InvalidEmailException from '@Exceptions/InvalidEmailException'
import Cpf from '@Application/domain/ValueObjects/Cpf'
import Email from '@Application/domain/ValueObjects/Email'

describe('Customer Entity', () => {
    let customer: Customer

    beforeEach(() => {
        customer = new Customer('John Doe', '123.456.789-09', 'validemail@example.com')
    })

    it('Should be able to validate CPF', () => {
        expect(() => new Cpf('123.456.789-00')).toThrow(InvalidCpfException)
        expect(() => new Cpf('111.111.111-11')).toThrow(InvalidCpfException)
        expect(() => new Cpf('000.000.000-00')).toThrow(InvalidCpfException)
        expect(() => new Cpf('12345678900')).toThrow(InvalidCpfException)
        expect(() => new Cpf('123.456.789-09')).not.toThrow()
    })

    it('Should be able to validate email', () => {
        expect(() => new Email('invalidemail.com')).toThrow(
            InvalidEmailException
        )
        expect(() => new Email('invalidemail@')).toThrow(InvalidEmailException)
        expect(() => new Email('invalidemail@example')).toThrow(
            InvalidEmailException
        )
        expect(() => new Email('validemail@example.com')).not.toThrow()
    })

    it('should set CPF correctly', () => {
        const cpf = '123.456.789-09'
        customer.setCpf(cpf)
        expect(customer.getCpf()).toBe(cpf)
    })

    it('should set email correctly', () => {
        const email = 'test@example.com'
        customer.setEmail(email)
        expect(customer.getEmail()).toBe(email)
    })

    it('should get name correctly', () => {
        expect(customer.getName()).toBe('John Doe')
    })
})
