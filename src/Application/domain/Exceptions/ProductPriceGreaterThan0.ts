export default class ProductPriceGT0Exception extends Error {
  constructor(message: string = 'Product price must be greater than 0') {
      super(message)
      this.name = 'ProductPriceGT0Exception'
  }
}