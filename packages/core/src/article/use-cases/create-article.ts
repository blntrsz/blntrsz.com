import { Article } from "@blntrsz/core/article/domain/article.entity";
import { ArticleProps } from "@blntrsz/core/article/domain/article.types";
import { useApp } from "@blntrsz/core/app-context";

type Request = Pick<ArticleProps, "title" | "description">;

export async function createArticle(request: Request) {
  const article = Article.create(request);
  const app = useApp();
  return app.articleRepository.insert(article);
}
