import type { Logger } from "@blntrsz/core/common/ports/logger";
import type { ArticleRepository } from "@blntrsz/core/article/domain/repository/article.repository";
import { Article } from "@blntrsz/core/article/domain/article";

export class ListArticles {
  constructor(
    private readonly logger: Logger,
    private readonly articleRepository: ArticleRepository
  ) {}

  async execute(): Promise<Article[]> {
    try {
      const articles = await this.articleRepository.findAll();

      return articles;
    } catch (error) {
      this.logger.error("Failed to list articles", { error });

      throw error;
    }
  }
}
