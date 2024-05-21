export default class InvalidFieldException extends Error {
    constructor(name: string) {
        super(`${name} is invalid`)
        this.name = 'InvalidFieldException'
    }
}
