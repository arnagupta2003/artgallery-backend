import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCustomFields1748532862272 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product" ADD "customFieldsPaintingcategoryid" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "product" ADD "customFieldsSize" character varying(255)`, undefined);
        await queryRunner.query(`ALTER TABLE "product" ADD "customFieldsAvailablein" character varying(255)`, undefined);
        await queryRunner.query(`ALTER TABLE "product" ADD "customFieldsCouriercostindia" double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "product" ADD "customFieldsCouriercostoutsideindia" double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_6aef40436b21e0bb48295228b5a" FOREIGN KEY ("customFieldsPaintingcategoryid") REFERENCES "facet_value"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_6aef40436b21e0bb48295228b5a"`, undefined);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "customFieldsCouriercostoutsideindia"`, undefined);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "customFieldsCouriercostindia"`, undefined);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "customFieldsAvailablein"`, undefined);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "customFieldsSize"`, undefined);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "customFieldsPaintingcategoryid"`, undefined);
   }

}
