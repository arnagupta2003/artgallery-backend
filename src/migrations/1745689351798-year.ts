import {MigrationInterface, QueryRunner} from "typeorm";

export class Year1745689351798 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "customFieldsYear"`, undefined);
        await queryRunner.query(`ALTER TABLE "product" ADD "customFieldsYear" character varying(255)`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "customFieldsYear"`, undefined);
        await queryRunner.query(`ALTER TABLE "product" ADD "customFieldsYear" integer`, undefined);
   }

}
