import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ICustomerGatewayRepository } from '../../../src/Gateways/contracts/ICustomerGatewayRepository'
import { Left, Right, isRight, isLeft } from '../../../src/@Shared/Either'
import Customer from '../../../src/Entities/Customer'
import { InputRegisterCustomerDTO } from '../../../src/UseCases/Customer/register/register.dto'
import RegisterCustomerUseCase from '../../../src/UseCases/Customer/register/register.usecase'

describe('RegisterCustomerUseCase', () => {
    let registerCustomerUseCase: RegisterCustomerUseCase
    let mockCustomerRepository: Partial<ICustomerGatewayRepository>

    beforeEach(() => {
        mockCustomerRepository = {
            create: vi.fn(),
        }
        registerCustomerUseCase = new RegisterCustomerUseCase(
            mockCustomerRepository as ICustomerGatewayRepository
        )
    })

    it('should register a new customer successfully', async () => {
        const input: InputRegisterCustomerDTO = {
            name: 'John Doe',
            email: 'john@example.com',
            cpf: '49315582080',
        }

        mockCustomerRepository.create = vi
            .fn()
            .mockResolvedValue(Right('customer-id'))

        const result = await registerCustomerUseCase.execute(input)

        expect(isRight(result)).toBe(true)
        if (isRight(result)) {
            expect(result.value).toBe('customer-id')
        }
        expect(mockCustomerRepository.create).toHaveBeenCalledWith(
            expect.any(Customer)
        )
    })

    it('should return error if customer registration fails', async () => {
        const input: InputRegisterCustomerDTO = {
            name: 'John Doe',
            email: 'john@example.com',
            cpf: '49315582080',
        }
        const error = new Error('Database error')

        mockCustomerRepository.create = vi.fn().mockResolvedValue(Left(error))

        const result = await registerCustomerUseCase.execute(input)

        expect(isLeft(result)).toBe(true)
        if (isLeft(result)) {
            expect(result.value).toBe(error)
        }
        expect(mockCustomerRepository.create).toHaveBeenCalledWith(
            expect.any(Customer)
        )
    })

    it('should return generic error if unexpected exception occurs', async () => {
        const input: InputRegisterCustomerDTO = {
            name: 'John Doe',
            email: 'john@example.com',
            cpf: '49315582080',
        }

        mockCustomerRepository.create = vi.fn().mockImplementation(() => {
            throw 'Unexpected Error'
        })

        const result = await registerCustomerUseCase.execute(input)

        expect(isLeft(result)).toBe(true)
        if (isLeft(result)) {
            expect(result.value).toEqual(new Error('Internal Server Error'))
        }
    })
})
