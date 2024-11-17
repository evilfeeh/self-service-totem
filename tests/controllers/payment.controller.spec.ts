import { Request, Response } from 'express'

import { randomUUID } from 'crypto'
import PaymentController from '../../src/Controllers/PaymentController'
import CheckoutUseCase from '../../src/UseCases/Payment/checkout/checkout.usecase'
import GetByIdUseCase from '../../src/UseCases/Payment/getById/getById.usecase'
import UpdateStatusUseCase from '../../src/UseCases/Payment/updateStatus/uptateStatus.usecase'
import ListUseCase from '../../src/UseCases/Payment/list/list.usecase'
import { vi } from 'vitest'
import { Left, Right } from '../../src/@Shared/Either'

const ORDER_ID = randomUUID()

describe('PaymentController', () => {
    let paymentController: PaymentController
    let mockRequest: Partial<Request>
    let mockResponse: Partial<Response>

    let mockCheckoutUseCase: Partial<CheckoutUseCase>
    let mockGetByIdUseCase: Partial<GetByIdUseCase>
    let mockUpdateStatusUseCase: Partial<UpdateStatusUseCase>
    let mockListUseCase: Partial<ListUseCase>

    beforeEach(() => {
        mockRequest = {}
        mockResponse = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
            setHeader: vi.fn(),
        }

        mockCheckoutUseCase = {
            execute: vi.fn(),
        }
        mockGetByIdUseCase = {
            execute: vi.fn(),
        }
        mockUpdateStatusUseCase = {
            execute: vi.fn(),
        }
        mockListUseCase = {
            execute: vi.fn(),
        }
        paymentController = new PaymentController(
            mockCheckoutUseCase as CheckoutUseCase,
            mockGetByIdUseCase as GetByIdUseCase,
            mockUpdateStatusUseCase as UpdateStatusUseCase,
            mockListUseCase as ListUseCase
        )
    })

    it('should handle checkout successfully', async () => {
        const expectedResponse = {
            id: randomUUID(),
            qrCode: 'qrcode',
            status: 'approved',
        }
        mockRequest = {
            body: { orderId: ORDER_ID },
        }

        mockCheckoutUseCase.execute = vi
            .fn()
            .mockResolvedValue(Right(expectedResponse))

        await paymentController.checkout(
            mockRequest as Request,
            mockResponse as Response
        )

        expect(mockCheckoutUseCase.execute).toHaveBeenCalledWith({
            orderId: ORDER_ID,
        })
        expect(mockResponse.status).toHaveBeenCalledWith(200)
        expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse)
    })

    it('should handle checkout failure', async () => {
        mockRequest = {
            body: { orderId: ORDER_ID },
        }

        mockCheckoutUseCase.execute = vi
            .fn()
            .mockResolvedValue(Left(new Error('Checkout failed')))

        await paymentController.checkout(
            mockRequest as Request,
            mockResponse as Response
        )

        expect(mockCheckoutUseCase.execute).toHaveBeenCalledWith({
            orderId: ORDER_ID,
        })
        expect(mockResponse.status).toHaveBeenCalledWith(400)
    })

    it('should get payment by ID successfully', async () => {
        mockRequest = {
            params: { id: randomUUID() },
        }

        const mockPayment = { id: mockRequest.params!.id, status: 'approved' }
        mockGetByIdUseCase.execute = vi
            .fn()
            .mockResolvedValue(Right(mockPayment))

        await paymentController.getById(
            mockRequest as Request,
            mockResponse as Response
        )

        expect(mockGetByIdUseCase.execute).toHaveBeenCalledWith({
            id: mockRequest.params!.id,
        })
        expect(mockResponse.status).toHaveBeenCalledWith(200)
        expect(mockResponse.json).toHaveBeenCalledWith(mockPayment)
    })

    it('should handle get payment by ID failure', async () => {
        mockRequest = {
            params: { id: randomUUID() },
        }

        mockGetByIdUseCase.execute = vi
            .fn()
            .mockResolvedValue(Left(new Error('Payment not found')))

        await paymentController.getById(
            mockRequest as Request,
            mockResponse as Response
        )

        expect(mockGetByIdUseCase.execute).toHaveBeenCalledWith({
            id: mockRequest.params!.id,
        })
        expect(mockResponse.status).toHaveBeenCalledWith(400)
        expect(mockResponse.json).toHaveBeenCalledWith('Payment not found')
    })

    it('should update payment status successfully', async () => {
        const id = randomUUID()
        const externalPaymentId = randomUUID()
        mockRequest = {
            params: { id },
            body: { type: 'payment', data: { id: externalPaymentId } },
        }

        mockUpdateStatusUseCase.execute = vi
            .fn()
            .mockResolvedValue(Right('Status updated successfully'))

        await paymentController.updateStatus(
            mockRequest as Request,
            mockResponse as Response
        )

        expect(mockUpdateStatusUseCase.execute).toHaveBeenCalledWith({
            id,
            externalPaymentId,
        })
        expect(mockResponse.status).toHaveBeenCalledWith(200)
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Status updated successfully',
        })
    })

    it('should handle update payment status failure', async () => {
        const id = randomUUID()
        const externalPaymentId = randomUUID()
        mockRequest = {
            params: { id },
            body: { type: 'payment', data: { id: externalPaymentId } },
        }

        mockUpdateStatusUseCase.execute = vi
            .fn()
            .mockResolvedValue(Left(new Error('Update status failed')))

        await paymentController.updateStatus(
            mockRequest as Request,
            mockResponse as Response
        )

        expect(mockUpdateStatusUseCase.execute).toHaveBeenCalledWith({
            id,
            externalPaymentId,
        })
        expect(mockResponse.status).toHaveBeenCalledWith(400)
        expect(mockResponse.json).toHaveBeenCalledWith('Update status failed')
    })

    it('should list payments successfully', async () => {
        const mockPayments = [
            { id: randomUUID(), status: 'approved' },
            { id: randomUUID(), status: 'rejected' },
        ]
        mockListUseCase.execute = vi.fn().mockResolvedValue(Right(mockPayments))

        await paymentController.list(
            mockRequest as Request,
            mockResponse as Response
        )

        expect(mockListUseCase.execute).toHaveBeenCalled()
        expect(mockResponse.status).toHaveBeenCalledWith(200)
        expect(mockResponse.json).toHaveBeenCalledWith(mockPayments)
    })

    it('should handle list payments failure', async () => {
        mockListUseCase.execute = vi
            .fn()
            .mockResolvedValue(Left(new Error('List payments failed')))

        await paymentController.list(
            mockRequest as Request,
            mockResponse as Response
        )

        expect(mockListUseCase.execute).toHaveBeenCalled()
        expect(mockResponse.status).toHaveBeenCalledWith(400)
        expect(mockResponse.json).toHaveBeenCalledWith('List payments failed')
    })
})
