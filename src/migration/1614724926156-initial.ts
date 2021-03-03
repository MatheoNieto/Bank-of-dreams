import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1614724926156 implements MigrationInterface {
    name = 'initial1614724926156'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `type_product` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(100) NOT NULL, `active` tinyint NOT NULL DEFAULT 1, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_e70ec041fed596f773f97b1eba` (`nombre`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `product` (`id` int NOT NULL AUTO_INCREMENT, `number_product` varchar(100) NOT NULL, `active` tinyint NOT NULL DEFAULT 1, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `typeProductId` int NULL, UNIQUE INDEX `IDX_d04cebd4ddbccc2470d6147da7` (`number_product`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `client` (`id` int NOT NULL AUTO_INCREMENT, `type_document` enum ('Cédula', 'Tarjeta de identidad', 'Pasaporte') NOT NULL DEFAULT 'Cédula', `number_document` varchar(50) NOT NULL, `name` varchar(50) NOT NULL, `last_name` varchar(80) NOT NULL, `email` varchar(100) NOT NULL, `telephone` varchar(20) NULL, `phone` varchar(20) NULL, `date_birtday` datetime NULL, `gender` enum ('Masculino', 'Femenino') NOT NULL DEFAULT 'Masculino', `civil_status` enum ('Soltero(a)', 'Casado(a)', 'Viudo(a)', 'Divorciado(a)', 'Unión libre') NOT NULL DEFAULT 'Soltero(a)', `active` tinyint NOT NULL DEFAULT 1, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `history_transaction` (`id` int NOT NULL AUTO_INCREMENT, `detail_trasaction` varchar(100) NOT NULL, `before_saldo` double NOT NULL DEFAULT '0', `new_saldo` double NOT NULL DEFAULT '0', `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `petiton_product` (`id` int NOT NULL AUTO_INCREMENT, `active` tinyint NOT NULL DEFAULT 1, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `clientId` int NULL, `typeProductId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, `usermail` varchar(150) NOT NULL, `password` text NOT NULL, `active` tinyint NOT NULL DEFAULT 1, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_f45813c3bdb91a4eb636f2628f` (`usermail`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `history_transaction_product_product` (`historyTransactionId` int NOT NULL, `productId` int NOT NULL, INDEX `IDX_33d1b944d9a0bc9af556bcfb22` (`historyTransactionId`), INDEX `IDX_359bf217b74d75ac18c41d3820` (`productId`), PRIMARY KEY (`historyTransactionId`, `productId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `product` ADD CONSTRAINT `FK_d304079ecdc3c8f3d0389c99270` FOREIGN KEY (`typeProductId`) REFERENCES `type_product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `petiton_product` ADD CONSTRAINT `FK_fe97b4ba1d08308e4780fb797ed` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `petiton_product` ADD CONSTRAINT `FK_a7cf0ec6de5dfcc81a3768ce9d4` FOREIGN KEY (`typeProductId`) REFERENCES `type_product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `history_transaction_product_product` ADD CONSTRAINT `FK_33d1b944d9a0bc9af556bcfb22d` FOREIGN KEY (`historyTransactionId`) REFERENCES `history_transaction`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `history_transaction_product_product` ADD CONSTRAINT `FK_359bf217b74d75ac18c41d38203` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `history_transaction_product_product` DROP FOREIGN KEY `FK_359bf217b74d75ac18c41d38203`");
        await queryRunner.query("ALTER TABLE `history_transaction_product_product` DROP FOREIGN KEY `FK_33d1b944d9a0bc9af556bcfb22d`");
        await queryRunner.query("ALTER TABLE `petiton_product` DROP FOREIGN KEY `FK_a7cf0ec6de5dfcc81a3768ce9d4`");
        await queryRunner.query("ALTER TABLE `petiton_product` DROP FOREIGN KEY `FK_fe97b4ba1d08308e4780fb797ed`");
        await queryRunner.query("ALTER TABLE `product` DROP FOREIGN KEY `FK_d304079ecdc3c8f3d0389c99270`");
        await queryRunner.query("DROP INDEX `IDX_359bf217b74d75ac18c41d3820` ON `history_transaction_product_product`");
        await queryRunner.query("DROP INDEX `IDX_33d1b944d9a0bc9af556bcfb22` ON `history_transaction_product_product`");
        await queryRunner.query("DROP TABLE `history_transaction_product_product`");
        await queryRunner.query("DROP INDEX `IDX_f45813c3bdb91a4eb636f2628f` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `petiton_product`");
        await queryRunner.query("DROP TABLE `history_transaction`");
        await queryRunner.query("DROP TABLE `client`");
        await queryRunner.query("DROP INDEX `IDX_d04cebd4ddbccc2470d6147da7` ON `product`");
        await queryRunner.query("DROP TABLE `product`");
        await queryRunner.query("DROP INDEX `IDX_e70ec041fed596f773f97b1eba` ON `type_product`");
        await queryRunner.query("DROP TABLE `type_product`");
    }

}