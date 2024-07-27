import type { CreateEntityProps } from "@blntrsz/lib/entity.base";
import { Article } from "./article";
import type { ArticleProps } from "./article.types";

export const articleMapper = {
  toResponse(article: Article) {
    const props = article.getProps();

    return {
      id: props.id,
      type: Article.type,
      attributes: {
        title: props.title,
        description: props.description,
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
      },
    };
  },

  toDomain(props: CreateEntityProps<ArticleProps>): Article {
    return new Article(props);
  },
};
