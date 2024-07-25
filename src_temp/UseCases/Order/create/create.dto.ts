export interface InputCreateOrderDTO {
    name: string
    cpf: string
    products: [
        {
            id: string
            quantity: number
        }
    ]
}
