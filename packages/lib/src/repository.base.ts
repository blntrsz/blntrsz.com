import { useDatabaseClient } from "./db";
import { Aggregate } from "./aggregate.base";
import { InternalServerException } from "./exception";
import { Err, Ok } from "./adt";
import { useApp } from "@blntrsz/core/app-context";
import { Mapper } from "./mapper";

export abstract class BaseRepository<TAggregate extends Aggregate<unknown>> {
  abstract tableName: string;
  abstract mapper: Mapper<TAggregate>;

  async insert(
    entity: TAggregate
  ): Promise<Ok<TAggregate> | Err<InternalServerException>> {
    const props = entity.getProps();
    const keys = Object.keys(props).join(", ");
    const values = Object.values(props);
    const prepared = values.map(() => "?").join(", ");

    return useDatabaseClient(async (db) => {
      try {
        await db.execute({
          sql: `INSERT INTO ${this.tableName} (${keys}) VALUES (${prepared});`,
          args: values,
        });
        return [entity, undefined];
      } catch (e) {
        useApp().logger.error("Failed to insert", e as Error);
        return [undefined, new InternalServerException()];
      }
    });
  }

  async delete(
    entity: TAggregate
  ): Promise<Ok<void> | Err<InternalServerException>> {
    return useDatabaseClient(async (db) => {
      try {
        await db.execute({
          sql: `DELETE FROM ${this.tableName} WHERE id = ?;`,
          args: [entity.id],
        });
        return [undefined, undefined];
      } catch (e) {
        useApp().logger.error("Failed to delete", e as Error);
        return [undefined, new InternalServerException()];
      }
    });
  }

  async findAll(): Promise<Ok<TAggregate[]> | Err<InternalServerException>> {
    try {
      const result = await useDatabaseClient((db) => {
        return db.execute({
          sql: `SELECT * FROM ${this.tableName};`,
          args: [],
        });
      });

      const rows = result.rows.map(({ id, updatedAt, createdAt, ...props }) =>
        this.mapper.toDomain({
          id,
          updatedAt,
          createdAt,
          props,
        })
      );

      return [rows, undefined];
    } catch (e) {
      useApp().logger.error("Failed to find all", e as Error);
      return [undefined, new InternalServerException()];
    }
  }
}
