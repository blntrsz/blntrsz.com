import { json, useLoaderData } from "@remix-run/react";
import { z } from "zod";
import { ListArticles } from "@blntrsz/core/article/use-cases/list-articles";
import { articleMapper } from "@blntrsz/core/article/domain/article.mapper";
import { PinoLogger } from "@blntrsz/core/common/adapters/pino.logger";
import { TursoArticleRepository } from "@blntrsz/core/article/infrastructure/turso.article.repository";

export const createArticleActionSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(20),
});

export async function loader() {
  const articles = await new ListArticles(
    PinoLogger.instance,
    new TursoArticleRepository()
  ).execute();

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
        <li key={article.id}>{article.attributes.title}</li>
      ))}
    </ul>
  );
}
