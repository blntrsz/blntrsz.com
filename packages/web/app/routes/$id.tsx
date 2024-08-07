import { json, MetaFunction, redirect, useLoaderData } from "@remix-run/react";
import { FindOneArticle } from "@blntrsz/core/article/use-cases/find-one-article";
import { articleMapper } from "@blntrsz/core/article/domain/article.mapper";
import { PinoLogger } from "@blntrsz/core/common/adapters/pino.logger";
import { TursoArticleRepository } from "@blntrsz/core/article/infrastructure/turso.article.repository";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useEffect } from "react";
import hljs from "highlight.js";

export function headers() {
  return {
    "Cache-Control":
      "public, max-age=3600, s-maxage=3600, stale-while-revalidate=600",
    Vary: "Cookie",
  };
}

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

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const title = data?.article.attributes.title;
  const description = data?.article.attributes.description;
  return [
    { title },
    {
      name: "description",
      content: description,
    },
  ];
};

export default function ArticlePage() {
  const loaderData = useLoaderData<typeof loader>();

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  if ("message" in loaderData) {
    return <>Error </>;
  }

  return (
    <article className="flex flex-col justify-center gap-8 m-auto prose prose-invert">
      <h1>{loaderData.article.attributes.title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: loaderData.article.attributes.content,
        }}
      />
    </article>
  );
}
