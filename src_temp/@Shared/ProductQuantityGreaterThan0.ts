export default class ProductQuantityGT0Exception extends Error {
  constructor(message: string = 'Product quantity must be greater than 0') {
      super(message)
      this.name = 'ProductQuantityGT0Exception'
  }
}