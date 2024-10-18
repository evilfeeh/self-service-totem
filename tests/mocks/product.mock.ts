import Product from "../../src/Entities/Product"
import { CategoryEnum } from "../../src/Entities/Enums/CategoryEnum";
import { randomUUID } from "crypto";

export const createMockProduct = (): Product => {
  return new Product(
    randomUUID(),
    'Hamburguer Classic',
    CategoryEnum.Sandwich,
    10,
    'Muito suculento'
  );
}