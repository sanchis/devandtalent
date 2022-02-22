import {MigrationInterface, QueryRunner} from "typeorm";

export class firstMigration1645521433722 implements MigrationInterface {
    name = 'firstMigration1645521433722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "candidate_id_seq" OWNED BY "candidate"."id"`);
        await queryRunner.query(`ALTER TABLE "candidate" ALTER COLUMN "id" SET DEFAULT nextval('"candidate_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "job-request" DROP CONSTRAINT "FK_f508e070ba1ee9083cabce6d46e"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "client_id_seq" OWNED BY "client"."id"`);
        await queryRunner.query(`ALTER TABLE "client" ALTER COLUMN "id" SET DEFAULT nextval('"client_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "candidate" DROP CONSTRAINT "FK_c74a7b4854e832f6aac9865f1bc"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "job-request_id_seq" OWNED BY "job-request"."id"`);
        await queryRunner.query(`ALTER TABLE "job-request" ALTER COLUMN "id" SET DEFAULT nextval('"job-request_id_seq"')`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "placement_id_seq" OWNED BY "placement"."id"`);
        await queryRunner.query(`ALTER TABLE "placement" ALTER COLUMN "id" SET DEFAULT nextval('"placement_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "candidate" DROP CONSTRAINT "FK_3930aa71e0fa24f09201811b1bb"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "user_id_seq" OWNED BY "user"."id"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT nextval('"user_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "candidate" ADD CONSTRAINT "FK_c74a7b4854e832f6aac9865f1bc" FOREIGN KEY ("jobRequestId") REFERENCES "job-request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "candidate" ADD CONSTRAINT "FK_3930aa71e0fa24f09201811b1bb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job-request" ADD CONSTRAINT "FK_f508e070ba1ee9083cabce6d46e" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job-request" DROP CONSTRAINT "FK_f508e070ba1ee9083cabce6d46e"`);
        await queryRunner.query(`ALTER TABLE "candidate" DROP CONSTRAINT "FK_3930aa71e0fa24f09201811b1bb"`);
        await queryRunner.query(`ALTER TABLE "candidate" DROP CONSTRAINT "FK_c74a7b4854e832f6aac9865f1bc"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "user_id_seq"`);
        await queryRunner.query(`ALTER TABLE "candidate" ADD CONSTRAINT "FK_3930aa71e0fa24f09201811b1bb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "placement" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "placement_id_seq"`);
        await queryRunner.query(`ALTER TABLE "job-request" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "job-request_id_seq"`);
        await queryRunner.query(`ALTER TABLE "candidate" ADD CONSTRAINT "FK_c74a7b4854e832f6aac9865f1bc" FOREIGN KEY ("jobRequestId") REFERENCES "job-request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "client_id_seq"`);
        await queryRunner.query(`ALTER TABLE "job-request" ADD CONSTRAINT "FK_f508e070ba1ee9083cabce6d46e" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "candidate" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "candidate_id_seq"`);
    }

}
