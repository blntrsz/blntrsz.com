import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { PinoLogger } from "@blntrsz/core/common/adapters/pino.logger";
import { FindOneArticle } from "@blntrsz/core/article/use-cases/find-one-article";
import { TursoArticleRepository } from "@blntrsz/core/article/infrastructure/turso.article.repository";
import { articleMapper } from "@blntrsz/core/article/domain/article.mapper";

export async function findOneLoader({ params }: LoaderFunctionArgs) {
  const useCase = new FindOneArticle(
    PinoLogger.instance,
    new TursoArticleRepository()
  );
  const article = await useCase.execute({ id: params.id! });

  if (!article) return redirect("/admin");

  return json({
    article: articleMapper.toResponse(article),
  });
}
