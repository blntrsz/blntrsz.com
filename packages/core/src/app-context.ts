import { Context } from "@blntrsz/lib/context";
import { Logger } from "@blntrsz/lib/logger.base";
import { ArticleRepository } from "./article/domain/repository/article.repository";
import { TursoArticleRepository } from "./article/infrastructure/turso.article.repository";
import { PinoLogger } from "@blntrsz/lib/pino-logger";
import { randomUUID } from "crypto";

const AppContext = Context.create<{
  readonly requestId: string;
  readonly logger: Logger;
  readonly articleRepository: ArticleRepository;
}>("AppContext");

export function withApp<TReturnType>(cb: () => Promise<TReturnType>) {
  return AppContext.with(
    {
      requestId: randomUUID(),
      articleRepository: new TursoArticleRepository(),
      logger: PinoLogger.instance,
    },
    cb
  );
}
export const useApp = AppContext.use;