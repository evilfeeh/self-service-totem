import { MigrationInterface, QueryRunner } from 'typeorm'

export class FirstStatement1716215951567 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE TABLE `customer` (`id` varchar(36) NOT NULL, `name` varchar(60) NOT NULL, `email` varchar(100) NULL, `cpf` varchar(11) NOT NULL, orders varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB'
        )
        await queryRunner.query(
            'CREATE TABLE `order` (`id` varchar(36) NOT NULL, `nameCustomer` varchar(60) NOT NULL, `closed` tinyint NOT NULL DEFAULT 0, `customer` varchar(36) NULL, `orderItems` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB'
        )
        await queryRunner.query(
            'CREATE TABLE `order_item` (`id` varchar(36) NOT NULL, `quantity` int NOT NULL, `order`varchar(36) NOT NULL, `product` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB'
        )
        await queryRunner.query(
            'CREATE TABLE `product` (`id` varchar(36) NOT NULL, `name` varchar(60) NOT NULL, `category` varchar(60) NOT NULL, `price` double NOT NULL, `description` varchar(255) NULL, orderItems varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB'
        )
        await queryRunner.query(
            'ALTER TABLE `order` ADD CONSTRAINT `FK_9f6f6d5f6c9b5b2e6c9b5b2e6c9` FOREIGN KEY (`customer`) REFERENCES `customer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION'
        )
        await queryRunner.query(
            'ALTER TABLE `order_item` ADD CONSTRAINT `FK_9f6f6d5f6c9b5b2e6c9b5b2e6c9` FOREIGN KEY (`order`) REFERENCES `order`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION'
        )
        await queryRunner.query(
            'ALTER TABLE `order_item` ADD CONSTRAINT `FK_9f6f6d5f6c9b5b2e6c9b5b2e6c9` FOREIGN KEY (`product`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION'
        )
        await queryRunner.query(
            'INSERT INTO products (id, name, category, price, description) VALUES ("1", "Product 1", "Category 1", 10, "Product 1 description")'
        )
        await queryRunner.query(
            "INSERT INTO products (name, category, price, description) VALUES ('Hambúrguer Clássico', 'Lanche', 15.00, 'Pão, carne bovina, alface, tomate, queijo e maionese.'), ('Cheeseburger', 'Lanche', 17.00, 'Pão, carne bovina, queijo cheddar, picles, cebola e ketchup.'), ('X-Bacon', 'Lanche', 20.00, 'Pão, carne bovina, bacon, queijo, alface, tomate e maionese especial.'), ('Veggie Burger', 'Lanche', 18.00, 'Pão integral, hambúrguer de grão-de-bico, alface, tomate, cenoura ralada e molho especial.'), ('Refrigerante Lata', 'Bebida', 5.00, 'Diversos sabores de refrigerante em lata de 350ml.'), ('Suco Natural', 'Bebida', 7.00, 'Suco natural de laranja, limão ou maracujá.'), ('Água Mineral', 'Bebida', 3.00, 'Água mineral sem gás 500ml.'), ('Chá Gelado', 'Bebida', 6.00, 'Chá gelado de limão ou pêssego 400ml.'), ('Batata Frita', 'Acompanhamento', 8.00, 'Porção de batata frita crocante.'), ('Onion Rings', 'Acompanhamento', 10.00, 'Anéis de cebola empanados e fritos.'), ('Salada Verde', 'Acompanhamento', 12.00, 'Mix de folhas verdes com tomate cereja e molho vinagrete.'), ('Nuggets de Frango', 'Acompanhamento', 9.00, 'Porção de nuggets de frango crocantes.'), ('Sorvete', 'Sobremesa', 10.00, 'Bola de sorvete com cobertura à escolha.'), ('Brownie', 'Sobremesa', 12.00, 'Brownie de chocolate com nozes.'), ('Torta de Maçã', 'Sobremesa', 14.00, 'Fatia de torta de maçã com canela.'), ('Pudim de Leite', 'Sobremesa', 11.00, 'Pudim de leite condensado com calda de caramelo.')"
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE `order_item` DROP FOREIGN KEY `FK_9f6f6d5f6c9b5b2e6c9b5b2e6c9`'
        )
        await queryRunner.query(
            'ALTER TABLE `order` DROP FOREIGN KEY `FK_9f6f6d5f6c9b5b2e6c9b5b2e6c9`'
        )
        await queryRunner.query('DROP TABLE `product`')
        await queryRunner.query('DROP TABLE `order_item`')
        await queryRunner.query('DROP TABLE `order`')
        await queryRunner.query('DROP TABLE `customer`')
    }
}
