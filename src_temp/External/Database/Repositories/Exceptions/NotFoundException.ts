export default class NotFoundException extends Error {
    constructor(name: string) {
        super(`${name} not found`)
        this.name = 'NotFoundException'
    }
}
