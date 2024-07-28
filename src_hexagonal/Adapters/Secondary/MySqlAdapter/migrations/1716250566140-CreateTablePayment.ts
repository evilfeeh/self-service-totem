import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTable1716215951567 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE TABLE `payment` (`id` varchar(36) NOT NULL PRIMARY KEY `orderId` varchar(36) NOT NULL, `status` VARCHAR(255) NOT NULL, FOREIGN KEY (`orderId`) REFERENCES `order`(`id`)) ENGINE=InnoDB'
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `payment`')
    }
}
