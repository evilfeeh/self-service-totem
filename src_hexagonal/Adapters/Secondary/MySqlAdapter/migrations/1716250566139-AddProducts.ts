import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddProducts1716250566139 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "INSERT INTO product (id, name, category, price, description) VALUES ('3e6c7a4e-6c78-4a5e-8d37-bf5f1c79ed10','Hambúrguer Clássico', 'Lanche', 15.00, 'Pão, carne bovina, alface, tomate, queijo e maionese.'), ('127c5b29-5981-4bcd-9291-3d1fc60b2e6b','Cheeseburger', 'Lanche', 17.00, 'Pão, carne bovina, queijo cheddar, picles, cebola e ketchup.'), ('9abcead0-09e8-4e3b-b9cb-3033c6cda9b7','X-Bacon', 'Lanche', 20.00, 'Pão, carne bovina, bacon, queijo, alface, tomate e maionese especial.'), ('f83a2f40-cc8d-4b6e-8b7a-1e8d4f1f9c1b','Veggie Burger', 'Lanche', 18.00, 'Pão integral, hambúrguer de grão-de-bico, alface, tomate, cenoura ralada e molho especial.'), ('2bc5a4b2-1d3a-4b29-9e4c-70b69d8a4b6a','Refrigerante Lata', 'Bebida', 5.00, 'Diversos sabores de refrigerante em lata de 350ml.'), ('d5b8e4f2-4b68-4f58-9a38-27f7d2f9b7a1','Suco Natural', 'Bebida', 7.00, 'Suco natural de laranja, limão ou maracujá.'), ('b1d4f2e9-9c27-4b2a-8f89-1a6f7c3d8b1e','Água Mineral', 'Bebida', 3.00, 'Água mineral sem gás 500ml.'), ('3b2f5a6e-7a1d-4c4e-9e3a-2b8d7c4f9b1d','Chá Gelado', 'Bebida', 6.00, 'Chá gelado de limão ou pêssego 400ml.'), ('5a7e3b6f-1d4a-4b7e-9c5f-8d3b7e2c9a1f','Batata Frita', 'Acompanhamento', 8.00, 'Porção de batata frita crocante.'), ('8d1c2e4b-5a7e-4f9c-8b2d-7c3a5b6e1d9f','Onion Rings', 'Acompanhamento', 10.00, 'Anéis de cebola empanados e fritos.'), ('9e4b1d2c-7a5f-4c8d-9b3e-6f2a7c5e1d3b','Salada Verde', 'Acompanhamento', 12.00, 'Mix de folhas verdes com tomate cereja e molho vinagrete.'), ('1a3b5e6d-4c7e-8b9f-2d1a-3c5b7e9f8d4b','Nuggets de Frango', 'Acompanhamento', 9.00, 'Porção de nuggets de frango crocantes.'), ('7e1d3b4a-2c5f-9b8d-6e4b-1a7c3e5f2d9b','Sorvete', 'Sobremesa', 10.00, 'Bola de sorvete com cobertura à escolha.'), ('4c9b8d2e-7a1f-3b6e-5d9a-2f7c1d4b3e8f','Brownie', 'Sobremesa', 12.00, 'Brownie de chocolate com nozes.'), ('6b5d3a7c-9e2f-4b8d-1c7e-5a2d9f3b1e4c','Torta de Maçã', 'Sobremesa', 14.00, 'Fatia de torta de maçã com canela.'), ('2e8b7c1d-4f9a-5e6d-3b2a-1c7e9f5b4d6a','Pudim de Leite', 'Sobremesa', 11.00, 'Pudim de leite condensado com calda de caramelo.')"
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "DELETE * FROM product WHERE id > '00000000-0000-0000-0000-000000000000'"
        )
    }
}
