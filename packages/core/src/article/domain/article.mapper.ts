import { CreateEntityProps } from "@blntrsz/lib/entity.base";
import { Article } from "./article";
import { ArticleProps } from "./article.types";

export const articleMapper = {
  toResponse(article: Article) {
    const { id, ...props } = article.getProps();

    return {
      id: id,
      type: Article.type,
      attributes: props,
    };
  },

  toDomain(props: CreateEntityProps<ArticleProps>) {
    return new Article(props);
  },
};
