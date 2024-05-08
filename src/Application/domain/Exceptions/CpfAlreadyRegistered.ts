export default class CpfAlreadyRegistered extends Error {
    constructor(message: string = 'CPF already registered') {
        super(message)
        this.name = 'CpfAlreadyRegistered'
    }
}
