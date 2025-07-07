import { MigrationInterface, QueryRunner } from "typeorm";

export class Content1745074855162 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Add column as nullable first
        await queryRunner.query(`
            ALTER TABLE "content" ADD "code" character varying
        `);

        // 2. Backfill with default values for existing rows
        await queryRunner.query(`
            UPDATE "content" SET "code" = concat('auto_', id) WHERE "code" IS NULL
        `);

        // 3. Alter column to NOT NULL
        await queryRunner.query(`
            ALTER TABLE "content" ALTER COLUMN "code" SET NOT NULL
        `);

        // 4. Add unique constraint
        await queryRunner.query(`
            ALTER TABLE "content" ADD CONSTRAINT "UQ_f0942bef2a6bed470199804dbe5" UNIQUE ("code")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "content" DROP CONSTRAINT "UQ_f0942bef2a6bed470199804dbe5"
        `);
        await queryRunner.query(`
            ALTER TABLE "content" DROP COLUMN "code"
        `);
    }
}
