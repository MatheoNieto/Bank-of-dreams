import {MigrationInterface, QueryRunner} from "typeorm";

export class saldoProduct1614971752138 implements MigrationInterface {
    name = 'saldoProduct1614971752138'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `product` ADD `saldo` double NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `product` DROP FOREIGN KEY `FK_df1433de81fd2fd311c37e6c861`");
        await queryRunner.query("ALTER TABLE `product` DROP FOREIGN KEY `FK_d304079ecdc3c8f3d0389c99270`");
        await queryRunner.query("ALTER TABLE `product` CHANGE `clientId` `clientId` int NULL");
        await queryRunner.query("ALTER TABLE `product` CHANGE `typeProductId` `typeProductId` int NULL");
        await queryRunner.query("ALTER TABLE `client` CHANGE `telephone` `telephone` varchar(20) NULL");
        await queryRunner.query("ALTER TABLE `client` CHANGE `phone` `phone` varchar(20) NULL");
        await queryRunner.query("ALTER TABLE `client` CHANGE `date_birtday` `date_birtday` datetime NULL");
        await queryRunner.query("ALTER TABLE `petiton_product` DROP FOREIGN KEY `FK_fe97b4ba1d08308e4780fb797ed`");
        await queryRunner.query("ALTER TABLE `petiton_product` DROP FOREIGN KEY `FK_a7cf0ec6de5dfcc81a3768ce9d4`");
        await queryRunner.query("ALTER TABLE `petiton_product` CHANGE `clientId` `clientId` int NULL");
        await queryRunner.query("ALTER TABLE `petiton_product` CHANGE `typeProductId` `typeProductId` int NULL");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_56f28841fe433cf13f8685f9bc1`");
        await queryRunner.query("ALTER TABLE `user` CHANGE `clientId` `clientId` int NULL");
        await queryRunner.query("ALTER TABLE `product` ADD CONSTRAINT `FK_df1433de81fd2fd311c37e6c861` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `product` ADD CONSTRAINT `FK_d304079ecdc3c8f3d0389c99270` FOREIGN KEY (`typeProductId`) REFERENCES `type_product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `petiton_product` ADD CONSTRAINT `FK_fe97b4ba1d08308e4780fb797ed` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `petiton_product` ADD CONSTRAINT `FK_a7cf0ec6de5dfcc81a3768ce9d4` FOREIGN KEY (`typeProductId`) REFERENCES `type_product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_56f28841fe433cf13f8685f9bc1` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_56f28841fe433cf13f8685f9bc1`");
        await queryRunner.query("ALTER TABLE `petiton_product` DROP FOREIGN KEY `FK_a7cf0ec6de5dfcc81a3768ce9d4`");
        await queryRunner.query("ALTER TABLE `petiton_product` DROP FOREIGN KEY `FK_fe97b4ba1d08308e4780fb797ed`");
        await queryRunner.query("ALTER TABLE `product` DROP FOREIGN KEY `FK_d304079ecdc3c8f3d0389c99270`");
        await queryRunner.query("ALTER TABLE `product` DROP FOREIGN KEY `FK_df1433de81fd2fd311c37e6c861`");
        await queryRunner.query("ALTER TABLE `user` CHANGE `clientId` `clientId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_56f28841fe433cf13f8685f9bc1` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `petiton_product` CHANGE `typeProductId` `typeProductId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `petiton_product` CHANGE `clientId` `clientId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `petiton_product` ADD CONSTRAINT `FK_a7cf0ec6de5dfcc81a3768ce9d4` FOREIGN KEY (`typeProductId`) REFERENCES `type_product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `petiton_product` ADD CONSTRAINT `FK_fe97b4ba1d08308e4780fb797ed` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `client` CHANGE `date_birtday` `date_birtday` datetime NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `client` CHANGE `phone` `phone` varchar(20) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `client` CHANGE `telephone` `telephone` varchar(20) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `product` CHANGE `typeProductId` `typeProductId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `product` CHANGE `clientId` `clientId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `product` ADD CONSTRAINT `FK_d304079ecdc3c8f3d0389c99270` FOREIGN KEY (`typeProductId`) REFERENCES `type_product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `product` ADD CONSTRAINT `FK_df1433de81fd2fd311c37e6c861` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `saldo`");
    }

}
