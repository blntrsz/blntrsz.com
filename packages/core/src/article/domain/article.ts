import { randomUUID } from "crypto";
import { Aggregate } from "@blntrsz/core/lib/aggregate.base";
import type { ArticleProps } from "./article.types";
import {
  ArticleCreatedDomainEvent,
  ArticleContentUpdatedDomainEvent,
  ArticleTitleUpdatedDomainEvent,
} from "./article.domain-events";

export class Article extends Aggregate<ArticleProps> {
  static readonly type = "articles";

  static create(props: ArticleProps) {
    const id = randomUUID();

    const article = new Article({
      id,
      props,
    });

    article.addEvent(
      new ArticleCreatedDomainEvent({
        aggregateId: id,
        ...props,
      })
    );

    return article;
  }

  changeTitle(currentTitle: string) {
    const previousTitle = this.props.title;
    this.props.title = currentTitle;
    this.updatedAt = new Date();

    this.addEvent(
      new ArticleTitleUpdatedDomainEvent({
        aggregateId: this.id,
        previousTitle,
        currentTitle,
      })
    );
  }

  changeContent(currentContent: string) {
    const previousContent = this.props.content;
    this.props.content = currentContent;
    this.updatedAt = new Date();

    this.addEvent(
      new ArticleContentUpdatedDomainEvent({
        aggregateId: this.id,
        previousDescription: previousContent,
        currentDescription: currentContent,
      })
    );
  }
}
