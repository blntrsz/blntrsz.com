import { LoaderFunctionArgs, json } from "@remix-run/node";
import { listArticles } from "@blntrsz/core/article/use-cases/list-articles";
import { withApp } from "@blntrsz/core/app-context";

export async function listArticlesLoader({}: LoaderFunctionArgs) {
  return withApp(async () => {
    const [articles, error] = await listArticles();

    if (error) {
      return json(
        {
          message: "something happened",
        },
        400
      );
    }

    return json({
      articles: articles.map((article) => article.toResponse()),
    });
  });
}
