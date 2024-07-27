import { withApp } from "@blntrsz/core/app-context";
import { json, useLoaderData } from "@remix-run/react";
import { z } from "zod";
import { listArticles } from "@blntrsz/core/article/use-cases/list-articles";
import { articleMapper } from "@blntrsz/core/article/domain/article.mapper";

export const createArticleActionSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(20),
});

export async function loader() {
  return withApp(async () => {
    const articles = await listArticles();

    return json({
      articles: articles.map((article) => articleMapper.toResponse(article)),
    });
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
