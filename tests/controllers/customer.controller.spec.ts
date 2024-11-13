import { vi } from 'vitest'
import { Request, Response } from 'express'
import CustomerController from '../../src/Controllers/CustomerController'
import RegisterCustomerUseCase from '../../src/UseCases/Customer/register/register.usecase'
import FindCustomerByCpfUseCase from '../../src/UseCases/Customer/findByCpf/findCustomerByCpf.usecase'
import { Left, Right } from '../../src/@Shared/Either'

describe('customerController', () => {
    let controller: CustomerController
    let mockRequest: Partial<Request>
    let mockResponse: Partial<Response>

    let registerCustomerUseCase: Partial<RegisterCustomerUseCase>
    let findCustomerByCpfUseCase: Partial<FindCustomerByCpfUseCase>

    beforeEach(() => {
        mockRequest = {}
        mockResponse = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
            setHeader: vi.fn(),
        }

        registerCustomerUseCase = {
            execute: vi.fn(),
        }

        findCustomerByCpfUseCase = {
            execute: vi.fn(),
        }

        controller = new CustomerController(
            registerCustomerUseCase as RegisterCustomerUseCase,
            findCustomerByCpfUseCase as FindCustomerByCpfUseCase
        )
    })

    it('should identify a customer', async () => {
        const mockCustomer = { id: '123' }
        mockRequest = {
            body: { user_name: 'John', cpf: '123456789' },
        }
        findCustomerByCpfUseCase.execute = vi
            .fn()
            .mockResolvedValue(Right(mockCustomer))

        await controller.identify(
            mockRequest as Request,
            mockResponse as Response
        )

        expect(mockResponse.json).toHaveBeenCalledWith(mockCustomer)
    })

    it('should register a customer', async () => {
        const mockCustomer = { message: 'created successfully' }
        mockRequest = {
            body: { user_name: 'John', cpf: '123456789' },
        }
        registerCustomerUseCase.execute = vi
            .fn()
            .mockResolvedValue(Right(mockCustomer))

        await controller.registerCustomer(
            mockRequest as Request,
            mockResponse as Response
        )

        expect(mockResponse.json).toHaveBeenCalledWith(mockCustomer)
    })

    it('shouldnt identify a customer', async () => {
        const error = new Error('Customer not found')
        mockRequest = {
            body: { user_name: 'John', cpf: '123456789' },
        }
        findCustomerByCpfUseCase.execute = vi
            .fn()
            .mockResolvedValue(Left(error))

        await controller.identify(
            mockRequest as Request,
            mockResponse as Response
        )

        expect(mockResponse.status).toHaveBeenCalledWith(400)
        expect(mockResponse.json).toHaveBeenCalledWith(error.message)
    })

    it('shouldnt register a customer', async () => {
        const error = new Error('Customer not found')
        mockRequest = {
            body: { user_name: 'John', cpf: '123456789' },
        }
        registerCustomerUseCase.execute = vi.fn().mockResolvedValue(Left(error))

        await controller.registerCustomer(
            mockRequest as Request,
            mockResponse as Response
        )

        expect(mockResponse.status).toHaveBeenCalledWith(400)
        expect(mockResponse.json).toHaveBeenCalledWith(error.message)
    })
})
