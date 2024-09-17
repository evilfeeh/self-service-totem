import { MigrationInterface, QueryRunner } from 'typeorm'

export class FirstStatement1716215951567 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE TABLE IF NOT EXISTS `customer` (`id` varchar(36) NOT NULL PRIMARY KEY, `name` varchar(60) NOT NULL, `email` varchar(100) NULL, `cpf` varchar(11) NOT NULL, orders varchar(36) NULL, UNIQUE INDEX `IDX_81398e8ce5b0b9f0d7b5fcbba7` (`cpf`)) ENGINE=InnoDB'
        )
        await queryRunner.query(
            "CREATE TABLE IF NOT EXISTS `order` ( `id` varchar(36) NOT NULL, `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `nameCustomer` varchar(60) NOT NULL, `closed` tinyint NOT NULL DEFAULT 0, `status` enum ('Recebido', 'Em preparação', 'Pronto', 'Finalizado') NOT NULL, `customerId` varchar(36) DEFAULT NULL, PRIMARY KEY (`id`)) ENGINE = InnoDB"
        )
        await queryRunner.query(
            'CREATE TABLE  IF NOT EXISTS `order_item` (`id` varchar(36) NOT NULL PRIMARY KEY, `quantity` int NOT NULL, `order` varchar(36) NOT NULL, `product` varchar(36) NULL) ENGINE=InnoDB'
        )
        await queryRunner.query(
            'CREATE TABLE  IF NOT EXISTS `product` (`id` varchar(36) NOT NULL PRIMARY KEY, `name` varchar(60), `category` varchar(60), `price` double, `description` varchar(255) NULL) ENGINE=InnoDB'
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `product`')
        await queryRunner.query('DROP TABLE `order_item`')
        await queryRunner.query('DROP TABLE `order`')
        await queryRunner.query('DROP TABLE `customer`')
    }
}
