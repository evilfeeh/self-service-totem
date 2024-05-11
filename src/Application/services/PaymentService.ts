import { QRCodeManager } from '../../Adapters/Secondary/MercadoPagoAPI/QRCodeManager'

enum paymentStatus {
    INITIALIZED = 'Pagamento Iniciado',
    APPROVED = 'Pagamento Aprovado',
    DECLINED = 'Pagamento Recusado',
}

export class PaymentService {
    private storeId: number
    private totemId: number
    private status: string
    private orderId: string
    constructor(private readonly qrCodeManager: QRCodeManager) {
        this.status = paymentStatus.INITIALIZED
    }
    create() {}
    get() {}
    cancel() {}
}
