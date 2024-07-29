import { json, Link, useLoaderData } from "@remix-run/react";
import { ListArticles } from "@blntrsz/core/article/use-cases/list-articles";
import { articleMapper } from "@blntrsz/core/article/domain/article.mapper";
import { PinoLogger } from "@blntrsz/core/common/adapters/pino.logger";
import { TursoArticleRepository } from "@blntrsz/core/article/infrastructure/turso.article.repository";
import { Button } from "~/components/ui/button";

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
    <div className="grid gap-8">
      <ul className="grid gap-2">
        {loaderData.articles.map((article) => (
          <li
            className="rounded-lg border-[1px] border-zinc-800 p-4"
            key={article.id}
          >
            <Link to={`/admin/${article.id}`}>{article.attributes.title}</Link>
          </li>
        ))}
      </ul>
      <Button asChild>
        <Link to="/admin/create">Create</Link>
      </Button>
    </div>
  );
}
