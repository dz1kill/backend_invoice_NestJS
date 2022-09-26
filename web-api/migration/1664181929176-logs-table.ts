import { MigrationInterface, QueryRunner } from 'typeorm';

export class logsTable1664181929176 implements MigrationInterface {
  name = 'logsTable1664181929176';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "log" ("id" SERIAL NOT NULL, "first_name" character varying, "last_name" character varying, "email" character varying NOT NULL, "company" character varying, "successfully" boolean NOT NULL, "summ_cost" integer, "invoice_id" uuid, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_c01628677193f2c346debd36102" UNIQUE ("invoice_id"), CONSTRAINT "PK_350604cbdf991d5930d9e618fbd" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "log"`);
  }
}
