import type { Logger } from "@blntrsz/core/common/ports/logger";
import type { ArticleRepository } from "../domain/repository/article.repository";
import { Article } from "../domain/article";

type Request = { id: string };

export class FindOneArticle {
  constructor(
    private readonly logger: Logger,
    private readonly articleRepository: ArticleRepository
  ) {}

  async execute(request: Request): Promise<Article | null> {
    try {
      const articles = await this.articleRepository.findOne(request.id);

      return articles;
    } catch (error) {
      this.logger.error("Failed to get one article", { error });

      throw error;
    }
  }
}
