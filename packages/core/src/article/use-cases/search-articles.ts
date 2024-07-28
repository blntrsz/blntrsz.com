import type { Logger } from "@blntrsz/core/common/ports/logger";
import type { ArticleRepository } from "@blntrsz/core/article/domain/repository/article.repository";
import { Article } from "@blntrsz/core/article/domain/article";

export class SearchArticles {
  constructor(
    private readonly logger: Logger,
    private readonly articleRepository: ArticleRepository
  ) {}

  async execute(searchPhrase: string): Promise<Article[]> {
    try {
      const articles = await this.articleRepository.search(searchPhrase);

      return articles;
    } catch (error) {
      this.logger.error("Failed to search articles", { error });

      throw error;
    }
  }
}
