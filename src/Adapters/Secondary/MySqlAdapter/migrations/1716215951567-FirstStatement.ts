import { MigrationInterface, QueryRunner } from 'typeorm'

export class FirstStatement1716215951567 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE TABLE `customer` (`id` varchar(36) NOT NULL PRIMARY KEY, `name` varchar(60) NOT NULL, `email` varchar(100) NULL, `cpf` varchar(11) NOT NULL, orders varchar(36) NULL, UNIQUE INDEX `IDX_81398e8ce5b0b9f0d7b5fcbba7` (`cpf`)) ENGINE=InnoDB'
        )
        await queryRunner.query(
            'CREATE TABLE `order` (`id` varchar(36) NOT NULL PRIMARY KEY, `nameCustomer` varchar(60) NOT NULL, `closed` tinyint NOT NULL DEFAULT 0, `customer` varchar(36) NULL, `orderItems` varchar(36) NULL) ENGINE=InnoDB'
        )
        await queryRunner.query(
            'CREATE TABLE `order_item` (`id` varchar(36) NOT NULL PRIMARY KEY, `quantity` int NOT NULL, `order` varchar(36) NOT NULL, `product` varchar(36) NULL) ENGINE=InnoDB'
        )
        await queryRunner.query(
            'CREATE TABLE `product` (`id` varchar(36) NOT NULL PRIMARY KEY, `name` varchar(60) NOT NULL, `category` varchar(60) NOT NULL, `price` double NOT NULL, `description` varchar(255) NULL, orderItems varchar(36) NULL) ENGINE=InnoDB'
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `product`')
        await queryRunner.query('DROP TABLE `order_item`')
        await queryRunner.query('DROP TABLE `order`')
        await queryRunner.query('DROP TABLE `customer`')
    }
}
