import { LoaderFunctionArgs, json } from "@remix-run/node";
import { ListArticles } from "@blntrsz/core/article/use-cases/list-articles";
import { TursoArticleRepository } from "@blntrsz/core/article/infrastructure/turso.article.repository";
import { PinoLogger } from "@blntrsz/lib/pino-logger";

export async function listArticlesLoader({}: LoaderFunctionArgs) {
  const articles = await new ListArticles(
    PinoLogger.instance,
    new TursoArticleRepository()
  ).execute();

  return json({
    articles,
  });
}
