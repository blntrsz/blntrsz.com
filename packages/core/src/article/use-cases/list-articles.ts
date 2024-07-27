import { Logger } from "@blntrsz/core/common/ports/logger";
import { ArticleRepository } from "../domain/repository/article.repository";

export class ListArticles {
  constructor(
    private readonly logger: Logger,
    private readonly articleRepository: ArticleRepository
  ) {}

  async execute() {
    try {
      return this.articleRepository.findAll();
    } catch (error) {
      this.logger.error("Failed to list articles", { error });

      throw error;
    }
  }
}
