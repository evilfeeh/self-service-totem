import AuthToken from '../../../src/Entities/ValueObjects/AuthToken'

describe('AuthToken Value Object', () => {
    it('should create a auth token', () => {
        const authToken = new AuthToken('John Doe', 'admin', '123456789', 1, 2)
        expect(authToken.getName()).toBe('John Doe')
        expect(authToken.getType()).toBe('admin')
        expect(authToken.getCpf()).toBe('123456789')
        expect(authToken.getIat()).toBe(1)
        expect(authToken.getExpiresAt()).toBe(2)
    })
})
