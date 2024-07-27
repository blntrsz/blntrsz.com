import { listArticlesLoader } from "@blntrsz/core/article/application/list-articles";
import { useLoaderData } from "@remix-run/react";

export const loader = listArticlesLoader;

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
