import { Article } from "@blntrsz/core/article/domain/article.entity";
import { BaseRepositoryPort } from "@blntrsz/lib/repository.base";

export interface ArticleRepository extends BaseRepositoryPort<Article> {}
