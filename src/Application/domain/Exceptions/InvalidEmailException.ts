export default class InvalidEmailException extends Error {
    constructor(message: string = 'Invalid email') {
        super(message)
        this.name = 'InvalidEmailException'
    }
}
