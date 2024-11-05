import Cpf from '../../../src/Entities/ValueObjects/Cpf'

describe('CPF Value Object', () => {
    it('Should throw an error when trying to create a invalid CPF', () => {
        expect(() => new Cpf('123')).toThrow()
        expect(() => new Cpf('11111111111')).toThrow()
        expect(() => new Cpf('00000000000')).toThrow()
    })

    it('Should throw an error when trying to validate the verification digit ', () => {
        expect(() => new Cpf('862.837.730-11')).toThrow()
        expect(() => new Cpf('862.837.730-09')).toThrow()
        expect(() => new Cpf('621.304.060-10')).toThrow()
    })
})
