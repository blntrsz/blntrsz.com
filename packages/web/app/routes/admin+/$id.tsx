import { json, redirect, useLoaderData } from "@remix-run/react";
import { FindOneArticle } from "@blntrsz/core/src/article/use-cases/find-one-article";
import { articleMapper } from "@blntrsz/core/src/article/domain/article.mapper";
import { PinoLogger } from "@blntrsz/core/src/common/adapters/pino.logger";
import { TursoArticleRepository } from "@blntrsz/core/src/article/infrastructure/turso.article.repository";
import { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ params }: LoaderFunctionArgs) {
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

export default function Admin() {
  const loaderData = useLoaderData<typeof loader>();

  if ("message" in loaderData) {
    return <>Error </>;
  }

  return <div>{JSON.stringify(loaderData)}</div>;
}
