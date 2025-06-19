import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeInsideIngestion1750137506316 implements MigrationInterface {
    name = 'ChangeInsideIngestion1750137506316'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingestion" ADD "jobName" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingestion" DROP COLUMN "jobName"`);
    }

}
