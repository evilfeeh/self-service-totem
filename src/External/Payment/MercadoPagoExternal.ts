import { Payment } from '../../Entities/Payment'
import Order from '../../Entities/Order'
import { Either, Left, Right } from '../../@Shared/Either'
import IExternalPaymentGatewayRepository from '../../Gateways/contracts/IExternalPaymentGatewayRepository'
import { HttpRequest } from '../../@Shared/Request'
import { AxiosHeaders, AxiosResponse } from 'axios'

export class MercadoPagoExternal implements IExternalPaymentGatewayRepository {
    async generateQrCodePaymentString(
        payment: Payment
    ): Promise<Either<Error, String>> {
        try {
            const payload = this.qrCodePayload(payment)
            const token = process.env.ACCESS_TOKEN_MERCADO_PAGO || ''
            const url = `${process.env.MERCADO_PAGO_URL}/instore/orders/qr/seller/collectors/${process.env.MERCADO_PAGO_USER_ID}/pos/${process.env.MERCADO_PAGO_POS_ID}/qrs`

            const request = new HttpRequest()
            const headers = new AxiosHeaders()
            headers.setAuthorization(`Bearer ${token}`)

            const result: AxiosResponse = await request.post(
                url,
                headers,
                payload
            )

            return Right<string>(result.data.qr_data)
        } catch (error) {
            console.error(error)
            return Left<Error>(error as Error)
        }
    }

    async getPaymentStatusById(
        externalPaymentId: String
    ): Promise<Either<Error, String>> {
        try {
            const token = process.env.ACCESS_TOKEN_MERCADO_PAGO || ''
            const url = `${process.env.MERCADO_PAGO_URL}/v1/payments/${externalPaymentId}`

            const request = new HttpRequest()
            const headers = new AxiosHeaders()
            headers.setAuthorization(`Bearer ${token}`)

            const result: AxiosResponse = await request.get(url, headers)

            return Right<string>(result.data.status)
        } catch (error) {
            console.error(error)
            return Left<Error>(error as Error)
        }
    }

    private qrCodePayload(payment: Payment): Object {
        let total = 0
        const order = payment.getOrder()
        if (order instanceof Order) {
            total = order.getTotalOrderValue()
        }
        if (total === 0) {
            throw new Error('Payment amount cannot be 0.')
        }
        return {
            description: 'mandatory description',
            external_reference: payment.getId(),
            items: [
                {
                    sku_number: '',
                    category: 'marketplace',
                    title: `Pedido ${payment.getId()}`,
                    description: 'integration qr code order',
                    unit_price: total,
                    quantity: 1,
                    unit_measure: 'unit',
                    total_amount: total,
                },
            ],
            notification_url: payment.getNotificationUrl(),
            title: `Pedido ${payment.getId()}`,
            total_amount: total,
        }
    }
}
