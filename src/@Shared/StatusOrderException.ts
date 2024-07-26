export default class StatusOrderException extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'StatusOrderException'
    }
}