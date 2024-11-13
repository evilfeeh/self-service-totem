import { describe, it, expect, vi, beforeEach } from 'vitest'
import DeleteCustomerUseCase from '../../../src/UseCases/Customer/delete/delete.usecase'
import { ICustomerGatewayRepository } from '../../../src/Gateways/contracts/ICustomerGatewayRepository'
import { Right, Left, isRight, isLeft } from '../../../src/@Shared/Either'
import { InputDeleteCustomerDTO } from '../../../src/UseCases/Customer/delete/delete.dto'
import CpfNotFoundException from '../../../src/Entities/Exceptions/CpfNotFoundException'

describe('DeleteCustomerUseCase', () => {
    let deleteCustomerUseCase: DeleteCustomerUseCase
    let mockCustomerRepository: Partial<ICustomerGatewayRepository>

    beforeEach(() => {
        mockCustomerRepository = {
            delete: vi.fn(),
        }
        deleteCustomerUseCase = new DeleteCustomerUseCase(
            mockCustomerRepository as ICustomerGatewayRepository
        )
    })

    it('should return success when customer is successfully deleted', async () => {
        const cpf = '12345678901'
        mockCustomerRepository.delete = vi
            .fn()
            .mockResolvedValue(Right<string>('Customer has been removed'))

        const input: InputDeleteCustomerDTO = { cpf }
        const result = await deleteCustomerUseCase.execute(input)

        expect(isRight(result)).toBe(true)
        if (isRight(result)) {
            expect(result.value).toBe('Customer has been removed')
        }
        expect(mockCustomerRepository.delete).toHaveBeenCalledWith(cpf)
    })

    it('should return an error if customer deletion fails', async () => {
        const cpf = '12345678901'
        const errorMessage = 'CPF Not Found'
        mockCustomerRepository.delete = vi
            .fn()
            .mockResolvedValue(Left<Error>(new CpfNotFoundException()))

        const input: InputDeleteCustomerDTO = { cpf }
        const result = await deleteCustomerUseCase.execute(input)

        expect(isLeft(result)).toBe(true)
        if (isLeft(result)) {
            expect(result.value.message).toBe(errorMessage)
        }
        expect(mockCustomerRepository.delete).toHaveBeenCalledWith(cpf)
    })
})
