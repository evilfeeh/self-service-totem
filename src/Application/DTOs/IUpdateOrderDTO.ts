import { StatusEnum } from "../domain/Enums/StatusEnum"

export default interface IUpdateOrderDTO {
    status: StatusEnum
    products: [
        {
            id: string
            quantity: number
        }
    ]
}
