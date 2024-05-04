import Customer from "./Customer";
import Product, { ProductOutputDTO } from "./Product";

export interface OrderOutputDTO {
  products: ProductOutputDTO[];
  customer: Customer;
  closed: boolean;
}

export default class Order {
  private products: Product[] = [];
  private customer: Customer;
  private closed: boolean;

  constructor(products: Product[], customer: Customer, closed: boolean = false) {
    this.products = products;
    this.customer = customer;
    this.closed = closed;
    if (!this.isValid()) {
      throw new Error("Invalid order");
    }
  }

  addProduct(product: Product): void {
    this.products.push(product);
  }

  removeProduct(product: Product): void {
    this.products = this.products.filter(p => p.getId() !== product.getId());
  }

  getProducts(): Product[] {
    return this.products;
  }

  getCustomer(): Customer {
    return this.customer;
  }

  isClosed(): boolean {
    return this.closed;
  }

  closeOrder(): void {
    if(this.products.length === 0) {
      throw new Error("Order without products cannot be closed");
    }
    this.closed = true;
  }

  private isValid(): boolean {
    if (this.closed === true && this.products.length === 0) {
      return false;
    }

    if (!this.customer) {
      return false;
    }

    return true;
  }

  toJSON(): OrderOutputDTO {
    return {
      products: this.products.map(product => product.toJSON()),
      customer: this.customer,
      closed: this.closed
    }
  }

}