import { CategoryEnum } from "../Enums/CategoryEnum";

export interface ProductOutputDTO {
  id: string;
  name: string;
  category: CategoryEnum;
  price: number;
  description: string;
}

export default class Product {
  private id: string;
  private name: string;
  private category: keyof typeof CategoryEnum;
  private price: number;
  private description: string;

  constructor(id: string, name: string, category: keyof typeof CategoryEnum, price: number, description: string) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.price = price;
    this.description = description;
    this.validator()
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getCategory(): keyof typeof CategoryEnum {
    return this.category;
  }

  getPrice(): number {
    return this.price;
  }

  getDescription(): string {
    return this.description;
  }

  setName(name: string): void {
    this.name = name;
    this.validator()
  }

  setCategory(category: keyof typeof CategoryEnum): void {
    this.category = category;
    this.validator()
  }

  setPrice(price: number): void {
    this.price = price;
    this.validator()
  }

  setDescription(description: string): void {
    this.description = description;
    this.validator()
  }

  private validator(): void {
    if (this.name.length < 3 || this.name.length > 50) {
      throw new Error("Invalid name");
    }

    if (CategoryEnum[this.category] === undefined) {
      throw new Error("Invalid category");
    }

    if (this.price <= 0) {
      throw new Error("Invalid price");
    }

    if (this.description.length < 3 || this.description.length > 50) {
      throw new Error("Invalid description");
    }
  }

  toJSON(): ProductOutputDTO {
    return {
      id: this.id,
      name: this.name,
      category: CategoryEnum[this.category],
      price: this.price,
      description: this.description
    }
  }

}