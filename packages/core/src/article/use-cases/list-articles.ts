import { useApp } from "@blntrsz/core/app-context";

export async function listArticles() {
  const app = useApp();
  return app.articleRepository.findAll();
}
