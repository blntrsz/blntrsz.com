import { randomUUID } from "crypto";
import { Aggregate } from "@blntrsz/lib/aggregate.base";
import { ArticleProps } from "./article.types";
import {
  ArticleCreatedDomainEvent,
  ArticleDescriptionUpdatedDomainEvent,
  ArticleTitleUpdatedDomainEvent,
} from "./article.domain-events";

export class Article extends Aggregate<ArticleProps> {
  type = "articles";

  public validate(): void {}

  public validateProps(): void {}

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

  changeDescription(currentDescription: string) {
    const previousDescription = this.props.description;
    this.props.description = currentDescription;
    this.updatedAt = new Date();

    this.addEvent(
      new ArticleDescriptionUpdatedDomainEvent({
        aggregateId: this.id,
        previousDescription,
        currentDescription,
      })
    );
  }

  toResponse() {
    const { id, ...props } = this.getProps();

    return {
      id: id,
      type: this.type,
      attributes: props,
    };
  }
}
