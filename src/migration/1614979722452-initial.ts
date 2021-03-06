import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1614979722452 implements MigrationInterface {
    name = 'initial1614979722452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `type_product` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, `active` tinyint NOT NULL DEFAULT 1, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_f13d98326da9e40a0ac47ca341` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `product` (`id` int NOT NULL AUTO_INCREMENT, `number_product` varchar(100) NOT NULL, `saldo` double NOT NULL DEFAULT '0', `active` tinyint NOT NULL DEFAULT 1, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `clientId` int NULL, `typeProductId` int NULL, UNIQUE INDEX `IDX_d04cebd4ddbccc2470d6147da7` (`number_product`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `client` (`id` int NOT NULL AUTO_INCREMENT, `type_document` enum ('Identification card', 'Passport') NOT NULL DEFAULT 'Identification card', `number_document` varchar(50) NOT NULL, `name` varchar(50) NOT NULL, `last_name` varchar(80) NOT NULL, `email` varchar(100) NOT NULL, `telephone` varchar(20) NULL, `phone` varchar(20) NULL, `date_birtday` datetime NULL, `gender` enum ('Male', 'Female') NOT NULL DEFAULT 'Male', `civil_status` enum ('Married', 'Single', 'Divorced') NOT NULL DEFAULT 'Single', `active` tinyint NOT NULL DEFAULT 1, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `history_transaction` (`id` int NOT NULL AUTO_INCREMENT, `type_trasaction` enum ('Shoping', 'Consignment') NOT NULL DEFAULT 'Shoping', `detail_trasaction` varchar(100) NOT NULL, `before_saldo` double NOT NULL DEFAULT '0', `new_saldo` double NOT NULL DEFAULT '0', `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `productId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `petiton_product` (`id` int NOT NULL AUTO_INCREMENT, `state_petition` enum ('Pending', 'Accepted', 'Reject') NOT NULL DEFAULT 'Pending', `close` tinyint NOT NULL DEFAULT 0, `active` tinyint NOT NULL DEFAULT 1, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `clientId` int NULL, `typeProductId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `usermail` varchar(150) NOT NULL, `password` text NOT NULL, `active` tinyint NOT NULL DEFAULT 1, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `clientId` int NULL, UNIQUE INDEX `IDX_f45813c3bdb91a4eb636f2628f` (`usermail`), UNIQUE INDEX `REL_56f28841fe433cf13f8685f9bc` (`clientId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `product` ADD CONSTRAINT `FK_df1433de81fd2fd311c37e6c861` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `product` ADD CONSTRAINT `FK_d304079ecdc3c8f3d0389c99270` FOREIGN KEY (`typeProductId`) REFERENCES `type_product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `history_transaction` ADD CONSTRAINT `FK_f353bd3fd35c05f934738f1a71c` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `petiton_product` ADD CONSTRAINT `FK_fe97b4ba1d08308e4780fb797ed` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `petiton_product` ADD CONSTRAINT `FK_a7cf0ec6de5dfcc81a3768ce9d4` FOREIGN KEY (`typeProductId`) REFERENCES `type_product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_56f28841fe433cf13f8685f9bc1` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_56f28841fe433cf13f8685f9bc1`");
        await queryRunner.query("ALTER TABLE `petiton_product` DROP FOREIGN KEY `FK_a7cf0ec6de5dfcc81a3768ce9d4`");
        await queryRunner.query("ALTER TABLE `petiton_product` DROP FOREIGN KEY `FK_fe97b4ba1d08308e4780fb797ed`");
        await queryRunner.query("ALTER TABLE `history_transaction` DROP FOREIGN KEY `FK_f353bd3fd35c05f934738f1a71c`");
        await queryRunner.query("ALTER TABLE `product` DROP FOREIGN KEY `FK_d304079ecdc3c8f3d0389c99270`");
        await queryRunner.query("ALTER TABLE `product` DROP FOREIGN KEY `FK_df1433de81fd2fd311c37e6c861`");
        await queryRunner.query("DROP INDEX `REL_56f28841fe433cf13f8685f9bc` ON `user`");
        await queryRunner.query("DROP INDEX `IDX_f45813c3bdb91a4eb636f2628f` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `petiton_product`");
        await queryRunner.query("DROP TABLE `history_transaction`");
        await queryRunner.query("DROP TABLE `client`");
        await queryRunner.query("DROP INDEX `IDX_d04cebd4ddbccc2470d6147da7` ON `product`");
        await queryRunner.query("DROP TABLE `product`");
        await queryRunner.query("DROP INDEX `IDX_f13d98326da9e40a0ac47ca341` ON `type_product`");
        await queryRunner.query("DROP TABLE `type_product`");
    }

}
