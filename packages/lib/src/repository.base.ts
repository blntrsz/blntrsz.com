import { useDatabaseClient } from "./db";
import { Aggregate } from "./aggregate.base";
import { Row } from "@libsql/client/.";

export interface BaseRepositoryPort<TAggregate extends Aggregate<unknown>> {
  insert(entity: TAggregate): Promise<void>;
  delete(entity: TAggregate): Promise<void>;
  findAll(): Promise<Row[]>;
}

export abstract class BaseRepository<TAggregate extends Aggregate<unknown>> {
  abstract tableName: string;

  async insert(entity: TAggregate): Promise<void> {
    const props = entity.getProps();
    const keys = Object.keys(props).join(", ");
    const values = Object.values(props);
    const prepared = values.map(() => "?").join(", ");

    await useDatabaseClient((db) => {
      return db.execute({
        sql: `INSERT INTO ${this.tableName} (${keys}) VALUES (${prepared});`,
        args: values,
      });
    });
  }

  async delete(entity: TAggregate): Promise<void> {
    await useDatabaseClient((db) => {
      return db.execute({
        sql: `DELETE FROM ${this.tableName} WHERE id = ?;`,
        args: [entity.id],
      });
    });
  }

  async findAll() {
    const result = await useDatabaseClient((db) => {
      return db.execute({
        sql: `SELECT * FROM ${this.tableName};`,
        args: [],
      });
    });

    return result.rows;
  }
}
