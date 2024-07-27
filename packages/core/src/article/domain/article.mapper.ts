import { CreateEntityProps } from "@blntrsz/lib/entity.base";
import { Article } from "./article.entity";
import { ArticleProps } from "./article.types";
import { Mapper } from "@blntrsz/lib/mapper";

export const articleMapper: Mapper<Article> = {
  toDomain(props: CreateEntityProps<ArticleProps>) {
    return new Article(props);
  },
};
