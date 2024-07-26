export default class InvalidCustomerException extends Error {
  constructor(message: string = 'Invalid customer') {
      super(message)
      this.name = 'InvalidCustomerException'
  }
}