"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Initial1748408498031 = void 0;
class Initial1748408498031 {
    name = 'Initial1748408498031';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "files" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "filename" character varying NOT NULL, "mimetype" character varying NOT NULL, "imgUrl" character varying NOT NULL, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" character varying(100) NOT NULL, "price" numeric(10,2) NOT NULL, "stock" numeric(10,2) NOT NULL, "imgUrl" character varying(255), "categoriesId" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orderDetails" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2) NOT NULL DEFAULT '0.00', "ordersId" uuid, CONSTRAINT "REL_7ef8520fb8b12fae11ac93b7e0" UNIQUE ("ordersId"), CONSTRAINT "PK_11d407f307ebf19af9702464e22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "orderDetailsId" uuid, "userId" uuid, CONSTRAINT "REL_cb8486eaad7a292ff78b37d761" UNIQUE ("orderDetailsId"), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(255) NOT NULL, "phone" character varying(20) NOT NULL, "country" character varying(50) NOT NULL, "address" character varying(70) NOT NULL, "city" character varying(50) NOT NULL, "role" character varying(10) NOT NULL DEFAULT 'user', "fecnac" date, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_files" ("product_id" uuid NOT NULL, "file_id" uuid NOT NULL, CONSTRAINT "PK_0a30fa26e62ccb29009c363e556" PRIMARY KEY ("product_id", "file_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d8a99936d05e5cc4688b828059" ON "product_files" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_59de9a6d2f3839532b438fffc9" ON "product_files" ("file_id") `);
        await queryRunner.query(`CREATE TABLE "product_order_details" ("product_id" uuid NOT NULL, "order_detail_id" uuid NOT NULL, CONSTRAINT "PK_714a3cdb992ede0168cc2d44c77" PRIMARY KEY ("product_id", "order_detail_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6aea2779e61db247eaeec91f3b" ON "product_order_details" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_cb73174ea485aac3aac71ffde1" ON "product_order_details" ("order_detail_id") `);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_3a9ea78a0f8110a3618098dc39b" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orderDetails" ADD CONSTRAINT "FK_7ef8520fb8b12fae11ac93b7e08" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_cb8486eaad7a292ff78b37d7610" FOREIGN KEY ("orderDetailsId") REFERENCES "orderDetails"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_files" ADD CONSTRAINT "FK_d8a99936d05e5cc4688b828059d" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_files" ADD CONSTRAINT "FK_59de9a6d2f3839532b438fffc9b" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_order_details" ADD CONSTRAINT "FK_6aea2779e61db247eaeec91f3b1" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_order_details" ADD CONSTRAINT "FK_cb73174ea485aac3aac71ffde15" FOREIGN KEY ("order_detail_id") REFERENCES "orderDetails"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product_order_details" DROP CONSTRAINT "FK_cb73174ea485aac3aac71ffde15"`);
        await queryRunner.query(`ALTER TABLE "product_order_details" DROP CONSTRAINT "FK_6aea2779e61db247eaeec91f3b1"`);
        await queryRunner.query(`ALTER TABLE "product_files" DROP CONSTRAINT "FK_59de9a6d2f3839532b438fffc9b"`);
        await queryRunner.query(`ALTER TABLE "product_files" DROP CONSTRAINT "FK_d8a99936d05e5cc4688b828059d"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_cb8486eaad7a292ff78b37d7610"`);
        await queryRunner.query(`ALTER TABLE "orderDetails" DROP CONSTRAINT "FK_7ef8520fb8b12fae11ac93b7e08"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_3a9ea78a0f8110a3618098dc39b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cb73174ea485aac3aac71ffde1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6aea2779e61db247eaeec91f3b"`);
        await queryRunner.query(`DROP TABLE "product_order_details"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_59de9a6d2f3839532b438fffc9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d8a99936d05e5cc4688b828059"`);
        await queryRunner.query(`DROP TABLE "product_files"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "orderDetails"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "files"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }
}
exports.Initial1748408498031 = Initial1748408498031;
//# sourceMappingURL=1748408498031-Initial.js.map