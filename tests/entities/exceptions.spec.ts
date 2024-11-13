import InvalidCpfException from '../../src/Entities/Exceptions/InvalidCpfException'
import InvalidCustomerException from '../../src/Entities/Exceptions/InvalidCustomerException'
import InvalidFieldException from '../../src/Entities/Exceptions/InvalidFieldException'
import OrderWithOutProductsException from '../../src/Entities/Exceptions/OrderWithOutProductsException'
import ProductPriceGT0Exception from '../../src/Entities/Exceptions/ProductPriceGreaterThan0'
import ProductQuantityGT0Exception from '../../src/Entities/Exceptions/ProductQuantityGreaterThan0'
import CpfAlreadyRegistered from '../../src/Entities/Exceptions/CpfAlreadyRegistered'
import CpfNotFoundException from '../../src/Entities/Exceptions/CpfNotFoundException'
import NotFoundException from '../../src/Entities/Exceptions/NotFoundException'

describe('Testing Exceptions', () => {
    it('InvalidCpfException', () => {
        const exception = new InvalidCpfException()
        expect(exception.message).toBe('Invalid Cpf')
        expect(exception.name).toBe('InvalidCpfException')
    })
    it('cpfAlreadyRegistered', () => {
        const exception = new CpfAlreadyRegistered()
        expect(exception.message).toBe('CPF already registered')
        expect(exception.name).toBe('CpfAlreadyRegistered')
    })
    it('CpfNotFoundException', () => {
        const exception = new CpfNotFoundException()
        expect(exception.message).toBe('CPF Not Found')
        expect(exception.name).toBe('CpfNotFoundException')
    })
    it('InvalidCustomerException', () => {
        const exception = new InvalidCustomerException()
        expect(exception.message).toBe('Invalid customer')
        expect(exception.name).toBe('InvalidCustomerException')
    })
    it('InvalidFieldException', () => {
        const exception = new InvalidFieldException('cpf')
        expect(exception.message).toBe('cpf is invalid')
        expect(exception.name).toBe('InvalidFieldException')
    })
    it('NotFoundException', () => {
        const exception = new NotFoundException('cpf')
        expect(exception.message).toBe('cpf not found')
        expect(exception.name).toBe('NotFoundException')
    })
    it('OrderWithOutProductsException', () => {
        const exception = new OrderWithOutProductsException()
        expect(exception.message).toBe('Order without products')
        expect(exception.name).toBe('OrderWithOutProductsException')
    })
    it('ProductPriceGreaterThan0', () => {
        const exception = new ProductPriceGT0Exception()
        expect(exception.message).toBe('Product price must be greater than 0')
        expect(exception.name).toBe('ProductPriceGT0Exception')
    })
    it('ProductQuantityGreaterThan0', () => {
        const exception = new ProductQuantityGT0Exception()
        expect(exception.message).toBe(
            'Product quantity must be greater than 0'
        )
        expect(exception.name).toBe('ProductQuantityGT0Exception')
    })
})
