export default class OrderWithOutProductsException extends Error {
  constructor(message: string = 'Order without products') {
      super(message)
      this.name = 'OrderWithOutProductsException'
  }
}