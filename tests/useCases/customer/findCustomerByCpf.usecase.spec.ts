import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ICustomerGatewayRepository } from '../../../src/Gateways/contracts/ICustomerGatewayRepository'
import { Left, Right, isRight, isLeft } from '../../../src/@Shared/Either'
import CpfNotFoundException from '../../../src/Entities/Exceptions/CpfNotFoundException'
import Cpf from '../../../src/Entities/ValueObjects/Cpf'
import FindCustomerByCpfUseCase from '../../../src/UseCases/Customer/findByCpf/findCustomerByCpf.usecase'
import {
    InputFindCustomerByCpfDTO,
    OutputFindCustomerByCpfDTO,
} from '../../../src/UseCases/Customer/findByCpf/findCustomerByCpf.dto'

describe('FindCustomerByCpfUseCase', () => {
    let findCustomerByCpfUseCase: FindCustomerByCpfUseCase
    let mockCustomerRepository: Partial<ICustomerGatewayRepository>

    beforeEach(() => {
        mockCustomerRepository = {
            findByCpf: vi.fn(),
        }
        findCustomerByCpfUseCase = new FindCustomerByCpfUseCase(
            mockCustomerRepository as ICustomerGatewayRepository
        )
    })

    it('should return customer data when CPF is found', async () => {
        const cpf = '49315582080'
        const input: InputFindCustomerByCpfDTO = { cpf }
        const customerData: OutputFindCustomerByCpfDTO = {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            cpf: cpf,
        }

        mockCustomerRepository.findByCpf = vi.fn().mockResolvedValue(
            Right({
                toJSON: () => customerData,
            })
        )

        const result = await findCustomerByCpfUseCase.execute(input)

        expect(isRight(result)).toBe(true)
        if (isRight(result)) {
            expect(result.value).toEqual(customerData)
        }
        expect(mockCustomerRepository.findByCpf).toHaveBeenCalledWith(
            new Cpf(cpf).getValue()
        )
    })

    it('should throw CpfNotFoundException if CPF is not found', async () => {
        const cpf = '49315582080'
        const input: InputFindCustomerByCpfDTO = { cpf }

        mockCustomerRepository.findByCpf = vi
            .fn()
            .mockResolvedValue(Left(new Error('CPF not found')))

        await expect(findCustomerByCpfUseCase.execute(input)).rejects.toThrow(
            CpfNotFoundException
        )
        expect(mockCustomerRepository.findByCpf).toHaveBeenCalledWith(
            new Cpf(cpf).getValue()
        )
    })
})
