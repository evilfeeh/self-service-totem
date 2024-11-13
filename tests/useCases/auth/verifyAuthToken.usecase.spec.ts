import { describe, it, expect, vi, beforeEach } from 'vitest'
import jwt from 'jsonwebtoken'
import VerifyAuthToken from '../../../src/UseCases/Auth/verifyAuthToken.usecase'
import AuthToken from '../../../src/Entities/ValueObjects/AuthToken'

vi.mock('jsonwebtoken')

describe('VerifyAuthToken', () => {
    const jwtSecret = 'test-secret'
    let verifyAuthToken: VerifyAuthToken

    beforeEach(() => {
        verifyAuthToken = new VerifyAuthToken(jwtSecret)
    })

    it('should return an AuthToken for a valid token', () => {
        const token = 'valid-token'
        const payload = {
            name: 'John Doe',
            type: 'user',
            cpf: '123456789',
            iat: 1617181920,
            exp: 1617185520,
        }

        vi.spyOn(jwt, 'verify').mockImplementation(() => payload)
        vi.spyOn(jwt, 'decode').mockReturnValue({ payload })

        const result = verifyAuthToken.execute(token)

        expect(result).toBeInstanceOf(AuthToken)
        expect(result.getName()).toBe(payload.name)
        expect(result.getType()).toBe(payload.type)
        expect(result.getCpf()).toBe(payload.cpf)
        expect(result.getIat()).toBe(payload.iat)
        expect(result.getExpiresAt()).toBe(payload.exp)
    })

    it('should throw an error if the token is expired', () => {
        const token = 'expired-token'

        vi.spyOn(jwt, 'verify').mockImplementation(() => {
            const error = new jwt.TokenExpiredError('Token expired', new Date())
            throw error
        })

        expect(() => verifyAuthToken.execute(token)).toThrow('Token is expired')
    })

    it('should throw an error if the token is invalid', () => {
        const token = 'invalid-token'

        vi.spyOn(jwt, 'verify').mockImplementation(() => {
            throw new Error('Invalid token')
        })

        expect(() => verifyAuthToken.execute(token)).toThrow('Invalid token')
    })
})
