import { Article } from "@blntrsz/core/article/domain/article";
import type { ArticleProps } from "@blntrsz/core/article/domain/article.types";
import type { Logger } from "@blntrsz/core/common/ports/logger";
import type { ArticleRepository } from "../domain/repository/article.repository";
import type { EventEmitter } from "@blntrsz/core/common/ports/event-emitter";

type Request = Pick<ArticleProps, "title" | "description">;

export class CreateArticle {
  constructor(
    private readonly logger: Logger,
    private readonly articleRepository: ArticleRepository,
    private readonly eventEmitter: EventEmitter
  ) {}

  async execute(request: Request) {
    try {
      const article = Article.create(request);

      await this.articleRepository.insert(article);
      await article.publishEvents(this.logger, this.eventEmitter);

      return article;
    } catch (error) {
      this.logger.error("Cannot create Article", { error });

      throw error;
    }
  }
}
