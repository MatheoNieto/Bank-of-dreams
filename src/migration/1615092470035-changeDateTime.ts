import {MigrationInterface, QueryRunner} from "typeorm";

export class changeDateTime1615092470035 implements MigrationInterface {
    name = 'changeDateTime1615092470035'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `type_product` DROP COLUMN `createdAt`");
        await queryRunner.query("ALTER TABLE `type_product` ADD `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `type_product` DROP COLUMN `updateAt`");
        await queryRunner.query("ALTER TABLE `type_product` ADD `updateAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `product` DROP FOREIGN KEY `FK_df1433de81fd2fd311c37e6c861`");
        await queryRunner.query("ALTER TABLE `product` DROP FOREIGN KEY `FK_d304079ecdc3c8f3d0389c99270`");
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `createdAt`");
        await queryRunner.query("ALTER TABLE `product` ADD `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `updateAt`");
        await queryRunner.query("ALTER TABLE `product` ADD `updateAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `product` CHANGE `clientId` `clientId` int NULL");
        await queryRunner.query("ALTER TABLE `product` CHANGE `typeProductId` `typeProductId` int NULL");
        await queryRunner.query("ALTER TABLE `client` CHANGE `telephone` `telephone` varchar(20) NULL");
        await queryRunner.query("ALTER TABLE `client` CHANGE `phone` `phone` varchar(20) NULL");
        await queryRunner.query("ALTER TABLE `client` DROP COLUMN `date_birtday`");
        await queryRunner.query("ALTER TABLE `client` ADD `date_birtday` date NULL");
        await queryRunner.query("ALTER TABLE `client` DROP COLUMN `createdAt`");
        await queryRunner.query("ALTER TABLE `client` ADD `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `client` DROP COLUMN `updateAt`");
        await queryRunner.query("ALTER TABLE `client` ADD `updateAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `history_transaction` DROP FOREIGN KEY `FK_f353bd3fd35c05f934738f1a71c`");
        await queryRunner.query("ALTER TABLE `history_transaction` DROP COLUMN `createdAt`");
        await queryRunner.query("ALTER TABLE `history_transaction` ADD `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `history_transaction` DROP COLUMN `updateAt`");
        await queryRunner.query("ALTER TABLE `history_transaction` ADD `updateAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `history_transaction` CHANGE `productId` `productId` int NULL");
        await queryRunner.query("ALTER TABLE `petiton_product` DROP FOREIGN KEY `FK_fe97b4ba1d08308e4780fb797ed`");
        await queryRunner.query("ALTER TABLE `petiton_product` DROP FOREIGN KEY `FK_a7cf0ec6de5dfcc81a3768ce9d4`");
        await queryRunner.query("ALTER TABLE `petiton_product` DROP COLUMN `createdAt`");
        await queryRunner.query("ALTER TABLE `petiton_product` ADD `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `petiton_product` DROP COLUMN `updateAt`");
        await queryRunner.query("ALTER TABLE `petiton_product` ADD `updateAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `petiton_product` CHANGE `clientId` `clientId` int NULL");
        await queryRunner.query("ALTER TABLE `petiton_product` CHANGE `typeProductId` `typeProductId` int NULL");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_56f28841fe433cf13f8685f9bc1`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `createdAt`");
        await queryRunner.query("ALTER TABLE `user` ADD `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `updateAt`");
        await queryRunner.query("ALTER TABLE `user` ADD `updateAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `user` CHANGE `clientId` `clientId` int NULL");
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
        await queryRunner.query("ALTER TABLE `user` CHANGE `clientId` `clientId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `updateAt`");
        await queryRunner.query("ALTER TABLE `user` ADD `updateAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `createdAt`");
        await queryRunner.query("ALTER TABLE `user` ADD `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_56f28841fe433cf13f8685f9bc1` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `petiton_product` CHANGE `typeProductId` `typeProductId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `petiton_product` CHANGE `clientId` `clientId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `petiton_product` DROP COLUMN `updateAt`");
        await queryRunner.query("ALTER TABLE `petiton_product` ADD `updateAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `petiton_product` DROP COLUMN `createdAt`");
        await queryRunner.query("ALTER TABLE `petiton_product` ADD `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `petiton_product` ADD CONSTRAINT `FK_a7cf0ec6de5dfcc81a3768ce9d4` FOREIGN KEY (`typeProductId`) REFERENCES `type_product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `petiton_product` ADD CONSTRAINT `FK_fe97b4ba1d08308e4780fb797ed` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `history_transaction` CHANGE `productId` `productId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `history_transaction` DROP COLUMN `updateAt`");
        await queryRunner.query("ALTER TABLE `history_transaction` ADD `updateAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `history_transaction` DROP COLUMN `createdAt`");
        await queryRunner.query("ALTER TABLE `history_transaction` ADD `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `history_transaction` ADD CONSTRAINT `FK_f353bd3fd35c05f934738f1a71c` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `client` DROP COLUMN `updateAt`");
        await queryRunner.query("ALTER TABLE `client` ADD `updateAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `client` DROP COLUMN `createdAt`");
        await queryRunner.query("ALTER TABLE `client` ADD `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `client` DROP COLUMN `date_birtday`");
        await queryRunner.query("ALTER TABLE `client` ADD `date_birtday` datetime NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `client` CHANGE `phone` `phone` varchar(20) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `client` CHANGE `telephone` `telephone` varchar(20) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `product` CHANGE `typeProductId` `typeProductId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `product` CHANGE `clientId` `clientId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `updateAt`");
        await queryRunner.query("ALTER TABLE `product` ADD `updateAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `createdAt`");
        await queryRunner.query("ALTER TABLE `product` ADD `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `product` ADD CONSTRAINT `FK_d304079ecdc3c8f3d0389c99270` FOREIGN KEY (`typeProductId`) REFERENCES `type_product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `product` ADD CONSTRAINT `FK_df1433de81fd2fd311c37e6c861` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `type_product` DROP COLUMN `updateAt`");
        await queryRunner.query("ALTER TABLE `type_product` ADD `updateAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `type_product` DROP COLUMN `createdAt`");
        await queryRunner.query("ALTER TABLE `type_product` ADD `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
    }

}
