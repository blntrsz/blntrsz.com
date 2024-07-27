import { useDatabaseClient } from "./db";
import { Aggregate } from "./aggregate.base";

export abstract class BaseRepository<TAggregate extends Aggregate<unknown>> {
  abstract tableName: string;
  abstract toDomain(props: any): TAggregate;

  async insert(entity: TAggregate): Promise<void> {
    const props = entity.getProps();
    const keys = Object.keys(props).join(", ");
    const values = Object.values(props);
    const prepared = values.map(() => "?").join(", ");

    return useDatabaseClient(async (db) => {
      await db.execute({
        sql: `INSERT INTO ${this.tableName} (${keys}) VALUES (${prepared});`,
        args: values,
      });
    });
  }

  async delete(entity: TAggregate): Promise<void> {
    return useDatabaseClient(async (db) => {
      await db.execute({
        sql: `DELETE FROM ${this.tableName} WHERE id = ?;`,
        args: [entity.id],
      });
    });
  }

  async findAll(): Promise<TAggregate[]> {
    const result = await useDatabaseClient((db) => {
      return db.execute({
        sql: `SELECT * FROM ${this.tableName};`,
        args: [],
      });
    });

    return result.rows.map(({ id, updatedAt, createdAt, ...props }) =>
      this.toDomain({
        id,
        updatedAt,
        createdAt,
        props,
      })
    );
  }
}