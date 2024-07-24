import { Logger } from "@blntrsz/lib/logger.base";
import { Article } from "@blntrsz/core/article/domain/article.entity";
import { ArticleRepository } from "@blntrsz/core/article/domain/repository/article.repository";
import { ArticleProps } from "@blntrsz/core/article/domain/article.types";

type Request = Pick<ArticleProps, "title" | "description">;

export class CreateArticle {
  constructor(
    protected readonly logger: Logger,
    protected readonly articleRepository: ArticleRepository
  ) {}

  async execute(request: Request) {
    const article = Article.create(request);

    try {
      await this.articleRepository.insert(article);
    } catch (error) {
      this.logger.debug((error as Error).message);
      throw error;
    }
  }
}
