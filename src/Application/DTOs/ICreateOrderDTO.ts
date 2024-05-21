export default interface ICreateOrderDTO {
    name: string
    email: string
    cpf: string
    products: {
        id: string
        quantity: number
    }[]
}
