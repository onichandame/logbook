import { Table, QueryRunner, MigrationInterface } from "typeorm";

export class InitMigration1624176666597 implements MigrationInterface {
  public async up(query: QueryRunner) {
    await Promise.all([
      query.createTable(
        new Table({
          name: `user`,
          columns: [
            {
              name: `id`,
              type: `integer`,
              isPrimary: true,
              isGenerated: true
            },
            { name: `createdAt`, type: `date` },
            { name: `updatedAt`, type: `date`, isNullable: true },
            { name: `deletedAt`, type: `date`, isNullable: true },
            { name: `uuid`, type: `text`, isUnique: true },
            { name: `name`, type: `text` },
            { name: `email`, type: `text`, isNullable: true },
            { name: `avatar`, type: `text`, isNullable: true }
          ]
        })
      ),
      query.createTable(
        new Table({
          name: `local_credential`,
          foreignKeys: [
            {
              columnNames: [`userId`],
              referencedTableName: `user`,
              referencedColumnNames: [`id`]
            }
          ],
          columns: [
            { name: `id`, type: `integer`, isPrimary: true, isGenerated: true },
            { name: `userId`, type: `integer` },
            { name: `createdAt`, type: `date` },
            { name: `updatedAt`, type: `date`, isNullable: true },
            { name: `deletedAt`, type: `date`, isNullable: true },
            { name: `password`, type: `text` }
          ]
        })
      )
    ]);
  }
  public async down(query: QueryRunner) {
    await Promise.all([
      query.dropTable(`user`),
      query.dropTable(`local_credential`)
    ]);
  }
}
