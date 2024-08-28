import Customer from '../../src/Entities/Customer'

describe('Customer Entities', () => {
    it('should create a customer entity correctly', () => {
        const customer = new Customer(
            'João José',
            '883.088.080-93',
            'joao.jose@gmail.com'
        )

        expect(customer.getName()).toBe('João José')
        expect(customer.getCpf()).toBe('88308808093')
        expect(customer.getEmail()).toBe('joao.jose@gmail.com')
    })
    it('should change customer data', () => {
        const customer = new Customer(
            'João José',
            '883.088.080-93',
            'joao.jose@gmail.com'
        )

        customer.setName('João Pereira')
        customer.setEmail('joao.pereira@gmail.com')

        expect(customer.getName()).toBe('João Pereira')
        expect(customer.getEmail()).toBe('joao.pereira@gmail.com')
    })
    it('should return an object', () => {
        const customer = new Customer(
            'João José',
            '883.088.080-93',
            'joao.jose@gmail.com'
        )

        expect(typeof customer.toJson()).toBe('object')
    })
})
