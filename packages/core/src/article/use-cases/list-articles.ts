import { Logger } from "@blntrsz/lib/logger.base";
import { ArticleRepository } from "@blntrsz/core/article/domain/repository/article.repository";
import { z } from "zod";

export class ListArticles {
  constructor(
    protected readonly logger: Logger,
    protected readonly articleRepository: ArticleRepository
  ) {}

  async execute() {
    try {
      const result = await this.articleRepository.findAll();

      return z
        .array(
          z.object({
            id: z.string(),
            title: z.string(),
            description: z.string(),
          })
        )
        .parse(result);
    } catch (error) {
      this.logger.debug((error as Error).message);
      throw error;
    }
  }
}
