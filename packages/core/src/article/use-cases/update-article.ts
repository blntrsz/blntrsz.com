import type { ArticleProps } from "@blntrsz/core/article/domain/article.types";
import type { Logger } from "@blntrsz/core/common/ports/logger";
import type { ArticleRepository } from "@blntrsz/core/article/domain/repository/article.repository";
import type { EventEmitter } from "@blntrsz/core/common/ports/event-emitter";
import type { BaseEntityProps } from "@blntrsz/core/lib/entity.base";
import { NotFoundException } from "@blntrsz/core/lib/exception";

type Request = Partial<Pick<ArticleProps, "title" | "description">> &
  Pick<BaseEntityProps, "id">;

export class UpdateArticle {
  constructor(
    private readonly logger: Logger,
    private readonly articleRepository: ArticleRepository,
    private readonly eventEmitter: EventEmitter
  ) {}

  async execute(request: Request) {
    try {
      const article = await this.articleRepository.findOne(request.id);

      if (!article) throw new NotFoundException("Article");

      if (request.title && request.title !== article.getProps().title)
        article.changeTitle(request.title);
      if (
        request.description &&
        request.title !== article.getProps().description
      )
        article.changeDescription(request.description);

      await this.articleRepository.update(article);
      await article.publishEvents(this.eventEmitter);

      return article;
    } catch (error) {
      this.logger.error("Cannot update Article", { error });

      throw error;
    }
  }
}
