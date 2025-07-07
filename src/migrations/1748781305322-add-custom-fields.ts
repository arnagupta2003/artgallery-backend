import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCustomFields1748781305322 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_a6d89beaa777eec8ddd251ccc69"`, undefined);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "customFieldsCategoryfacetvalueid"`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product" ADD "customFieldsCategoryfacetvalueid" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_a6d89beaa777eec8ddd251ccc69" FOREIGN KEY ("customFieldsCategoryfacetvalueid") REFERENCES "facet_value"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
   }

}
