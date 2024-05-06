import CustomerRepositoryInMemory from '../../../Adapters/Secondary/DataInMemory/Repositories/CustomerRepositoryInMemory'
import Customer from '../../../Application/Entities/Customer'
import CpfNotFoundException from '../../../Application/Exceptions/CpfNotFoundException'
import InvalidCpfException from '../../../Application/Exceptions/InvalidCpfException'
import InvalidEmailException from '../../../Application/Exceptions/InvalidEmailException'
import ICustomerRepository from '../../../Application/Ports/Secondary/ICustomerRepository'
import Cpf from '../../../Application/ValueObjects/Cpf'
import Email from '../../../Application/ValueObjects/Email'

describe('Customer Entity', () => {
    let customer: Customer
    let repositoryMock: ICustomerRepository

    beforeEach(() => {
        repositoryMock = new CustomerRepositoryInMemory()
        customer = new Customer('John Doe', repositoryMock)
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

    it('should check if consumer is final', () => {
        // When cpf is not set
        expect(customer.isConsumerFinal()).toBe(true)

        // When cpf is set
        customer.setCpf('123.456.789-09')
        expect(customer.isConsumerFinal()).toBe(false)
    })

    it('should save customer', async () => {
        customer.setCpf('123.456.789-09')
        await customer.saveOrUpdate()
        await expect(
            customer.findByCpf('123.456.789-09')
        ).resolves.not.toThrow()
    })

    it('should throw CpfNotFoundException when cpf is not found', async () => {
        await expect(customer.findByCpf('123.456.789-09')).rejects.toThrow(
            CpfNotFoundException
        )
    })

    it('should delete customer', async () => {
        customer.setCpf('123.456.789-09')
        await customer.saveOrUpdate()

        await customer.delete()

        await expect(customer.findByCpf('123.456.789-09')).rejects.toThrow(
            CpfNotFoundException
        )
    })
})
