import {
    IQRCodeManager,
    QRResponse,
} from '../../../Application/Ports/Secondary/IQRCodeManager'
import { Either, Right, Left } from '../../../Shared/util/either'

export class QRCodeManager implements IQRCodeManager {
    private externalApiDatabase: Map<number, any>
    private readonly baseIdQuantity: number = 50000
    constructor() {
        this.externalApiDatabase = new Map()
    }

    async createPayment(payload: any): Promise<Either<Error, number>> {
        try {
            const orderId = Math.floor(Math.random() * this.baseIdQuantity)
            this.externalApiDatabase.set(orderId, payload)
            return Right(orderId)
        } catch (error) {
            return Left<Error>(error as Error)
        }
    }
    async getPayment(orderId: number): Promise<Either<Error, QRResponse>> {
        try {
            const paymentOrder = this.externalApiDatabase.get(orderId)
            return Right(paymentOrder)
        } catch (error) {
            return Left<Error>(error as Error)
        }
    }
    async deletePayment(orderId: number): Promise<Either<Error, boolean>> {
        try {
            this.externalApiDatabase.delete(orderId)
            return Right(true)
        } catch (error) {
            return Left<Error>(error as Error)
        }
    }
}
