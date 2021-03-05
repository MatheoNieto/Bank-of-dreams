import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1614915293961 implements MigrationInterface {
    name = 'initial1614915293961'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `product` (`id` int NOT NULL AUTO_INCREMENT, `number_product` varchar(100) NOT NULL, `type_product` enum ('Agil Credit', 'Credit Card', 'Account Saving', 'Lessing House') NOT NULL DEFAULT 'Credit Card', `active` tinyint NOT NULL DEFAULT 1, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_d04cebd4ddbccc2470d6147da7` (`number_product`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `client` (`id` int NOT NULL AUTO_INCREMENT, `type_document` enum ('Identification card', 'Passport') NOT NULL DEFAULT 'Identification card', `number_document` varchar(50) NOT NULL, `name` varchar(50) NOT NULL, `last_name` varchar(80) NOT NULL, `email` varchar(100) NOT NULL, `telephone` varchar(20) NULL, `phone` varchar(20) NULL, `date_birtday` datetime NULL, `gender` enum ('Male', 'Female') NOT NULL DEFAULT 'Male', `civil_status` enum ('Married', 'Single', 'Divorced') NOT NULL DEFAULT 'Single', `active` tinyint NOT NULL DEFAULT 1, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `history_transaction` (`id` int NOT NULL AUTO_INCREMENT, `detail_trasaction` varchar(100) NOT NULL, `before_saldo` double NOT NULL DEFAULT '0', `new_saldo` double NOT NULL DEFAULT '0', `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `usermail` varchar(150) NOT NULL, `password` text NOT NULL, `active` tinyint NOT NULL DEFAULT 1, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `clientId` int NULL, UNIQUE INDEX `IDX_f45813c3bdb91a4eb636f2628f` (`usermail`), UNIQUE INDEX `REL_56f28841fe433cf13f8685f9bc` (`clientId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `history_transaction_product_product` (`historyTransactionId` int NOT NULL, `productId` int NOT NULL, INDEX `IDX_33d1b944d9a0bc9af556bcfb22` (`historyTransactionId`), INDEX `IDX_359bf217b74d75ac18c41d3820` (`productId`), PRIMARY KEY (`historyTransactionId`, `productId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_56f28841fe433cf13f8685f9bc1` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `history_transaction_product_product` ADD CONSTRAINT `FK_33d1b944d9a0bc9af556bcfb22d` FOREIGN KEY (`historyTransactionId`) REFERENCES `history_transaction`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `history_transaction_product_product` ADD CONSTRAINT `FK_359bf217b74d75ac18c41d38203` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `history_transaction_product_product` DROP FOREIGN KEY `FK_359bf217b74d75ac18c41d38203`");
        await queryRunner.query("ALTER TABLE `history_transaction_product_product` DROP FOREIGN KEY `FK_33d1b944d9a0bc9af556bcfb22d`");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_56f28841fe433cf13f8685f9bc1`");
        await queryRunner.query("DROP INDEX `IDX_359bf217b74d75ac18c41d3820` ON `history_transaction_product_product`");
        await queryRunner.query("DROP INDEX `IDX_33d1b944d9a0bc9af556bcfb22` ON `history_transaction_product_product`");
        await queryRunner.query("DROP TABLE `history_transaction_product_product`");
        await queryRunner.query("DROP INDEX `REL_56f28841fe433cf13f8685f9bc` ON `user`");
        await queryRunner.query("DROP INDEX `IDX_f45813c3bdb91a4eb636f2628f` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `history_transaction`");
        await queryRunner.query("DROP TABLE `client`");
        await queryRunner.query("DROP INDEX `IDX_d04cebd4ddbccc2470d6147da7` ON `product`");
        await queryRunner.query("DROP TABLE `product`");
    }

}
