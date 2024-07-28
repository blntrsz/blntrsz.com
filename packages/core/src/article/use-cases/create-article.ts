import { Article } from "@blntrsz/core/article/domain/article";
import type { ArticleProps } from "@blntrsz/core/article/domain/article.types";
import type { Logger } from "@blntrsz/core/common/ports/logger";
import type { ArticleRepository } from "@blntrsz/core/article/domain/repository/article.repository";
import type { EventEmitter } from "@blntrsz/core/common/ports/event-emitter";
import type { LLM } from "@blntrsz/core/common/ports/llm";
import { InternalServerException } from "@blntrsz/core/lib/exception";

type Request = Pick<ArticleProps, "title" | "content">;

export class CreateArticle {
  constructor(
    private readonly logger: Logger,
    private readonly articleRepository: ArticleRepository,
    private readonly eventEmitter: EventEmitter,
    private readonly llm: LLM
  ) {}

  async execute(request: Request) {
    try {
      const promptResult = await this.llm.prompt(`
        Create a 1 sentence long description from the following article: 
        ${request.title}
        ${request.content}
        Give it in the following format: <summary>summary</summary>
      `);
      const description = promptResult.match(
        "<summary>((.|\n)*)</summary>"
      )?.[1];

      if (!description) throw new InternalServerException();

      const article = Article.create({ ...request, description });

      await this.articleRepository.insert(article);
      await article.publishEvents(this.eventEmitter);

      return article;
    } catch (error) {
      this.logger.error("Cannot create Article", { error });

      throw error;
    }
  }
}
