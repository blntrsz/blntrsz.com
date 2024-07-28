import {
  type Client,
  type Transaction,
  createClient,
} from "@libsql/client/web";
import { Context } from "./context";
import { Resource } from "sst";

export const client = createClient({
  url: Resource.TursoDbUrl.value,
  authToken: Resource.TursoToken.value,
});

const DatabaseClientContext = Context.create<{
  client: Transaction | Client;
}>("DatabaseClientContext");

export async function useDatabaseClient<T>(
  callback: (client: Transaction | Client) => Promise<T>
) {
  try {
    const { client } = DatabaseClientContext.use();
    return await callback(client);
  } catch (error) {
    return await callback(client);
  }
}

export async function createTransaction<T>(
  callback: (client: Transaction | Client) => Promise<T>
) {
  try {
    const { client } = DatabaseClientContext.use();
    return callback(client);
  } catch (error) {
    const transaction = await client.transaction();
    try {
      const result = await callback(transaction);
      await transaction.commit();

      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
