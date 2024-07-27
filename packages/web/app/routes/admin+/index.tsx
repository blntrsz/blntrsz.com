import { json, Link, useLoaderData } from "@remix-run/react";
import { ListArticles } from "@blntrsz/core/src/article/use-cases/list-articles";
import { articleMapper } from "@blntrsz/core/src/article/domain/article.mapper";
import { PinoLogger } from "@blntrsz/core/src/common/adapters/pino.logger";
import { TursoArticleRepository } from "@blntrsz/core/src/article/infrastructure/turso.article.repository";

export async function loader() {
  const useCase = new ListArticles(
    PinoLogger.instance,
    new TursoArticleRepository()
  );
  const articles = await useCase.execute();

  return json({
    articles: articles.map((article) => articleMapper.toResponse(article)),
  });
}

export default function Admin() {
  const loaderData = useLoaderData<typeof loader>();

  if ("message" in loaderData) {
    return <>Error </>;
  }

  return (
    <ul>
      {loaderData.articles.map((article) => (
        <li key={article.id}>
          <Link to={`/admin/${article.id}`}>{article.attributes.title}</Link>
        </li>
      ))}
    </ul>
  );
}
