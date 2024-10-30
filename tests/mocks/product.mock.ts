import Product from "../../src/Entities/Product"
import { CategoryEnum } from "../../src/Entities/Enums/CategoryEnum";
import { randomUUID } from "crypto";
import { InputCreateProductDTO } from "../../src/UseCases/Product/create/create.dto";

export const createMockInputProduct = (): InputCreateProductDTO => {
  return {
    name: 'Hamburguer Classic',
    category: CategoryEnum.Sandwich,
    price: 10,
    description: 'Muito suculento'
  }
}

export const createMockProduct = (): Product => {
  return new Product(
    randomUUID(),
    'Hamburguer Classic',
    CategoryEnum.Sandwich,
    10,
    'Muito suculento'
  );
}