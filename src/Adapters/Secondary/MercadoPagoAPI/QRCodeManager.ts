import {
    IQRCodeManager,
    QRResponse,
} from '../../../Application/Ports/Secondary/IQRCodeManager'
import { Either, Right, Left } from '../../../Shared/util/either'

export class QRCodeManager implements IQRCodeManager {
    constructor() {}

    async createPayment(amount: number): Promise<Either<Error, boolean>> {
        try {
            return Right(true)
        } catch (error) {
            return Left<Error>(error as Error)
        }
    }
    async getPayment(): Promise<Either<Error, QRResponse>> {
        return Right([
            {
                external_reference: '1',
                total_amount: 10,
                items: [
                    {
                        sku_number: '1',
                        category: '1',
                        title: 'Point',
                        description: 'Point Mini',
                        unit_measure: '1',
                        quantity: 1,
                        unit_price: 1,
                        total_amount: 1,
                    },
                ],
                title: '1',
                description: '1',
                sponsor: {
                    id: 1,
                },
                expiration_date: '1',
                notification_url: '1',
            },
        ])
    }
    async deletePayment(): Promise<Either<Error, boolean>> {
        try {
            return Right(true)
        } catch (error) {
            return Left<Error>(error as Error)
        }
    }
}
