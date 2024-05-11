import {
    IQRCodeManager,
    QRResponse,
} from '@Application/Ports/Secondary/IQRCodeManager'
import { HttpRequest } from '../../../Shared/util/request'

export class QRCodeManager implements IQRCodeManager {
    private readonly bearerToken: string | undefined
    private readonly baseUrl: string | undefined
    private readonly paymentStoreSponsorId: string | undefined
    private readonly mercadoPagoUserId: string | undefined
    private readonly mercadoPagoStoreId: string | undefined
    private readonly mercadoPagoPosId: string | undefined

    constructor(private readonly httpRequest: HttpRequest) {
        this.bearerToken = process.env.MERCADO_PAGO_BEARER_TOKEN
        this.baseUrl = process.env.PAYMENT_BASE_URL
        this.paymentStoreSponsorId = process.env.PAYMENT_STORE_SPONSOR_ID
        this.mercadoPagoUserId = process.env.MERCADO_PAGO_USER_ID
        this.mercadoPagoStoreId = process.env.MERCADO_PAGO_STORE_ID
        this.mercadoPagoPosId = process.env.MERCADO_PAGO_POS_ID
    }

    async createPayment(amount: number): Promise<boolean> {
        this.httpRequest.put(
            `${this.baseUrl}/instore/qr/seller/collectors/${this.mercadoPagoUserId}/stores/${this.mercadoPagoStoreId}/pos/${this.mercadoPagoPosId}/orders`,
            {
                'Content-Type': 'application/json',
                Authorization: this.bearerToken,
            },
            {
                cash_out: {
                    amount,
                },
                description: 'Purchase description.',
                external_reference: '12345',
                items: [
                    {
                        sku_number: 'A123K9191938',
                        category: 'marketplace',
                        title: 'Point Mini',
                        description: 'This is the Point Mini',
                        unit_price: 100,
                        quantity: 1,
                        unit_measure: 'unit',
                        total_amount: 100,
                    },
                ],
                notification_url: 'http://www.yourserver.com/notification',
                sponsor: {
                    id: 662208785,
                },
                title: 'Product order',
                total_amount: 100,
            }
        )
        return true
    }
    getPayment(): Promise<QRResponse> {
        throw new Error('Method not implemented.')
    }
    deletePayment(): Promise<boolean> {
        throw new Error('Method not implemented.')
    }
}
