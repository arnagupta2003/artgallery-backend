import {MigrationInterface, QueryRunner} from "typeorm";

export class Content1745076191867 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "content" DROP COLUMN "page"`, undefined);
        await queryRunner.query(`ALTER TABLE "content" DROP COLUMN "description"`, undefined);
        await queryRunner.query(`ALTER TABLE "content" ADD "homeintroduction" text`, undefined);
        await queryRunner.query(`ALTER TABLE "content" ADD "aboutintroduction" text`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "content" DROP COLUMN "aboutintroduction"`, undefined);
        await queryRunner.query(`ALTER TABLE "content" DROP COLUMN "homeintroduction"`, undefined);
        await queryRunner.query(`ALTER TABLE "content" ADD "description" text`, undefined);
        await queryRunner.query(`ALTER TABLE "content" ADD "page" character varying`, undefined);
   }

}
