import { Article } from "@blntrsz/core/article/domain/article";
import { BaseRepository } from "@blntrsz/lib/repository.base";

export interface ArticleRepository extends BaseRepository<Article> {}
