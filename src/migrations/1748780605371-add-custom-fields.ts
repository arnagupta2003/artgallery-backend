import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCustomFields1748780605371 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_6aef40436b21e0bb48295228b5a"`, undefined);
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "customFieldsPaintingcategoryid" TO "customFieldsCategoryfacetvalueid"`, undefined);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_a6d89beaa777eec8ddd251ccc69" FOREIGN KEY ("customFieldsCategoryfacetvalueid") REFERENCES "facet_value"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_a6d89beaa777eec8ddd251ccc69"`, undefined);
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "customFieldsCategoryfacetvalueid" TO "customFieldsPaintingcategoryid"`, undefined);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_6aef40436b21e0bb48295228b5a" FOREIGN KEY ("customFieldsPaintingcategoryid") REFERENCES "facet_value"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
   }

}
