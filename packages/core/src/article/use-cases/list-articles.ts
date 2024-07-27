import { useApp } from "@blntrsz/core/app-context";

export async function listArticles() {
  const app = useApp();

  try {
    return app.articleRepository.findAll();
  } catch (error) {
    app.logger.error("Failed to list articles", { error });
    throw error;
  }
}
