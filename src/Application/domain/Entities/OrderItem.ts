import ProductPriceGT0Exception from "../Exceptions/ProductPriceGreaterThan0";
import ProductQuantityGT0Exception from "../Exceptions/ProductQuantityGreaterThan0";
import Product from "./Product";

export default class OrderItem {
  private product: Product
  private quantity: number
  private totalValue: number

  constructor(product: Product, quantity: number = 1) {
    this.product = product
    this.quantity = quantity
    this.validator();
  }

  getProduct(): Product {
    return this.product
  }

  getQuantity(): number {
    return this.quantity
  }

  getTotalValue(): number {
    return this.totalValue
  }

  updateQuantity(newQuantity: number) {
    this.quantity = newQuantity;
    this.validator();    
  }

  private validator(): void {
    if (this.quantity ===  0) {
        throw new ProductQuantityGT0Exception()
    }

    if (this.product.getPrice() === 0) {
        throw new ProductPriceGT0Exception()
    }

    this.totalValue = this.product.getPrice() * this.quantity
  }

  toJson() {
    return {
      product: this.product.toJSON(),
      quantity: this.quantity,
      total: this.totalValue
    }
  }
}