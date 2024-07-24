import { listArticlesLoader } from "@blntrsz/core/article/application/list-articles";
import { useLoaderData } from "@remix-run/react";

export const loader = listArticlesLoader;

export default function Admin() {
  const loaderData = useLoaderData<typeof loader>();
  return (
    <ul>
      {loaderData.articles.map((article) => (
        <li key={article.id}>{article.title}</li>
      ))}
    </ul>
  );
}
