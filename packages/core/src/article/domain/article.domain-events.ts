import {
  DomainEvent,
  type DomainEventProps,
} from "@blntrsz/core/lib/domain-event.base";
import type { ArticleProps } from "./article.types";

export class ArticleCreatedDomainEvent extends DomainEvent {
  name = "ArticleCreated";
  version = 1;

  readonly title: string;
  readonly description: string;

  constructor(props: DomainEventProps<ArticleProps>) {
    super(props);
    this.title = props.title;
    this.description = props.description;
  }
}

export class ArticleTitleUpdatedDomainEvent extends DomainEvent {
  name = "ArticleTitleUpdated";
  version = 1;

  readonly previousTitle: string;
  readonly currentTitle: string;

  constructor(
    props: DomainEventProps<{
      previousTitle: string;
      currentTitle: string;
    }>
  ) {
    super(props);
    this.previousTitle = props.previousTitle;
    this.currentTitle = props.currentTitle;
  }
}

export class ArticleDescriptionUpdatedDomainEvent extends DomainEvent {
  name = "ArticleDescriptionUpdated";
  version = 1;

  readonly previousDescription: string;
  readonly currentDescription: string;

  constructor(
    props: DomainEventProps<{
      previousDescription: string;
      currentDescription: string;
    }>
  ) {
    super(props);
    this.previousDescription = props.previousDescription;
    this.currentDescription = props.currentDescription;
  }
}
