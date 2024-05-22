export default interface ICreateOrderDTO {
    name: string
    cpf: string
    products: [
        {
            id: string
            quantity: number
        }
    ]
}
