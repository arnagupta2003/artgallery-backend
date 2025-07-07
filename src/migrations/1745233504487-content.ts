import {MigrationInterface, QueryRunner} from "typeorm";

export class Content1745233504487 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "content" DROP COLUMN "aboutintroduction"`, undefined);
        await queryRunner.query(`ALTER TABLE "content" ADD "aboutintroductionpara1" text`, undefined);
        await queryRunner.query(`ALTER TABLE "content" ADD "aboutintroductionpara2" text`, undefined);
        await queryRunner.query(`ALTER TABLE "content" ADD "mediamentions" json`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "content" DROP COLUMN "mediamentions"`, undefined);
        await queryRunner.query(`ALTER TABLE "content" DROP COLUMN "aboutintroductionpara2"`, undefined);
        await queryRunner.query(`ALTER TABLE "content" DROP COLUMN "aboutintroductionpara1"`, undefined);
        await queryRunner.query(`ALTER TABLE "content" ADD "aboutintroduction" text`, undefined);
   }

}
