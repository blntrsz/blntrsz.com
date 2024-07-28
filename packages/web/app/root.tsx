import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import { BaseLayout } from "./components/layout";
import { LoaderFunctionArgs } from "@remix-run/node";
import { SearchArticles } from "@blntrsz/core/article/use-cases/search-articles";
import { TursoArticleRepository } from "@blntrsz/core/article/infrastructure/turso.article.repository";
import { PinoLogger } from "@blntrsz/core/common/adapters/pino.logger";
import { articleMapper } from "@blntrsz/core/article/domain/article.mapper";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");

  if (!q)
    return json({
      articles: [],
    });

  const useCase = new SearchArticles(
    PinoLogger.instance,
    new TursoArticleRepository()
  );
  const articles = await useCase.execute(q);

  return json({
    articles: articles.map((article) => articleMapper.toResponse(article)),
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html className="dark" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <BaseLayout>{children}</BaseLayout>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
