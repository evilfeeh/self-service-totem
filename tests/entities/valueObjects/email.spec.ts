import Email from '../../../src/Entities/ValueObjects/Email'

describe('Email Value Object', () => {
    it('Should throw an error when trying to create a invalid email', () => {
        expect(() => new Email('invalid-email')).toThrow()
    })
})
