import {
  DomainEvent,
  type DomainEventProps,
} from "@blntrsz/core/lib/domain-event.base";
import type { ArticleProps } from "./article.types";

export class ArticleCreatedDomainEvent extends DomainEvent {
  name = "ArticleCreated";
  version = 1;

  readonly props: {
    title: string;
    description: string;
  };

  constructor(props: DomainEventProps<ArticleProps>) {
    super(props);
    this.props = {
      title: props.title,
      description: props.description,
    };
  }
}

export class ArticleTitleUpdatedDomainEvent extends DomainEvent {
  name = "ArticleTitleUpdated";
  version = 1;

  readonly props: {
    previousTitle: string;
    currentTitle: string;
  };

  constructor(
    props: DomainEventProps<{
      previousTitle: string;
      currentTitle: string;
    }>
  ) {
    super(props);
    this.props = {
      previousTitle: props.previousTitle,
      currentTitle: props.currentTitle,
    };
  }
}

export class ArticleContentUpdatedDomainEvent extends DomainEvent {
  name = "ArticleContentUpdated";
  version = 1;

  readonly props: {
    previousDescription: string;
    currentDescription: string;
  };

  constructor(
    props: DomainEventProps<{
      previousDescription: string;
      currentDescription: string;
    }>
  ) {
    super(props);
    this.props = {
      previousDescription: props.previousDescription,
      currentDescription: props.currentDescription,
    };
  }
}
