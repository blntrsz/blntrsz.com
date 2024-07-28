import type { ArticleProps } from "@blntrsz/core/article/domain/article.types";
import type { Logger } from "@blntrsz/core/common/ports/logger";
import type { ArticleRepository } from "@blntrsz/core/article/domain/repository/article.repository";
import type { EventEmitter } from "@blntrsz/core/common/ports/event-emitter";
import type { BaseEntityProps } from "@blntrsz/core/lib/entity.base";
import {
  InternalServerException,
  NotFoundException,
} from "@blntrsz/core/lib/exception";
import type { LLM } from "@blntrsz/core/common/ports/llm";

type Request = Partial<Pick<ArticleProps, "title" | "content">> &
  Pick<BaseEntityProps, "id">;

export class UpdateArticle {
  constructor(
    private readonly logger: Logger,
    private readonly articleRepository: ArticleRepository,
    private readonly eventEmitter: EventEmitter,
    private readonly llm: LLM
  ) {}

  async execute(request: Request) {
    try {
      const article = await this.articleRepository.findOne(request.id);

      if (!article) throw new NotFoundException("Article");

      if (request.title && request.title !== article.getProps().title)
        article.changeTitle(request.title);

      let description = article.getProps().description;

      if (request.content && request.content !== article.getProps().content) {
        article.changeContent(request.content);

        const promptResult = await this.llm.prompt(`
        Create a 1 sentence summary from the following article: ${request.content}
        Give it in the following format: <summary>summary</summary>
      `);
        const newDescription = promptResult.match(
          "<summary>((.|\n)*)</summary>"
        )?.[1];

        if (newDescription) {
          description = newDescription;
        }
      }

      if (!description) throw new InternalServerException();

      await this.articleRepository.update(article);
      await article.publishEvents(this.eventEmitter);

      return article;
    } catch (error) {
      this.logger.error("Cannot update Article", { error });

      throw error;
    }
  }
}
