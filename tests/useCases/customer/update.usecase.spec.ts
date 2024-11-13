import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ICustomerGatewayRepository } from '../../../src/Gateways/contracts/ICustomerGatewayRepository'
import { Left, Right, isLeft, isRight } from '../../../src/@Shared/Either'
import CpfNotFoundException from '../../../src/Entities/Exceptions/CpfNotFoundException'
import Customer from '../../../src/Entities/Customer'
import { InputUpdateCustomerDTO } from '../../../src/UseCases/Customer/update/update.dto'
import UpdateCustomerUseCase from '../../../src/UseCases/Customer/update/update.usecase'

describe('UpdateCustomerUseCase', () => {
    let updateCustomerUseCase: UpdateCustomerUseCase
    let mockCustomerRepository: Partial<ICustomerGatewayRepository>
    let existingCustomer: Customer

    beforeEach(() => {
        existingCustomer = new Customer(
            'John Doe',
            '49315582080',
            'john@example.com'
        )

        mockCustomerRepository = {
            findByCpf: vi.fn(),
            create: vi.fn(),
        }
        updateCustomerUseCase = new UpdateCustomerUseCase(
            mockCustomerRepository as ICustomerGatewayRepository
        )
    })

    it('should update an existing customer successfully', async () => {
        const input: InputUpdateCustomerDTO = {
            name: 'Jane Doe',
            email: 'jane@example.com',
            cpf: '49315582080',
        }

        mockCustomerRepository.findByCpf = vi
            .fn()
            .mockResolvedValue(Right(existingCustomer))
        mockCustomerRepository.create = vi
            .fn()
            .mockResolvedValue(Right('updated-customer-id'))

        const result = await updateCustomerUseCase.execute(input)

        expect(isRight(result)).toBe(true)
        if (isRight(result)) {
            expect(result.value).toBe('updated-customer-id')
        }
        expect(existingCustomer.getName()).toBe(input.name)
        expect(existingCustomer.getEmail()).toBe(input.email)
        expect(mockCustomerRepository.findByCpf).toHaveBeenCalledWith(input.cpf)
        expect(mockCustomerRepository.create).toHaveBeenCalledWith(
            existingCustomer
        )
    })

    it('should return an error if CPF is not found', async () => {
        const input: InputUpdateCustomerDTO = {
            name: 'Jane Doe',
            email: 'jane@example.com',
            cpf: '49315582080',
        }

        mockCustomerRepository.findByCpf = vi
            .fn()
            .mockResolvedValue(Left(new CpfNotFoundException()))

        const result = await updateCustomerUseCase.execute(input)

        expect(isLeft(result)).toBe(true)
        if (isLeft(result)) {
            expect(result.value).toBeInstanceOf(CpfNotFoundException)
        }
        expect(mockCustomerRepository.findByCpf).toHaveBeenCalledWith(input.cpf)
        expect(mockCustomerRepository.create).not.toHaveBeenCalled()
    })

    it('should return generic error if unexpected exception occurs', async () => {
        const input: InputUpdateCustomerDTO = {
            name: 'Jane Doe',
            email: 'jane@example.com',
            cpf: '49315582080',
        }

        mockCustomerRepository.findByCpf = vi.fn().mockImplementation(() => {
            throw 'Unexpected Error'
        })

        const result = await updateCustomerUseCase.execute(input)

        expect(isLeft(result)).toBe(true)
        if (isLeft(result)) {
            expect(result.value).toEqual(new Error('Internal Server Error'))
        }
    })
})
