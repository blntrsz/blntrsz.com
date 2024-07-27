import { ArticleRepository } from "@blntrsz/core/article/domain/repository/article.repository";
import { Article } from "@blntrsz/core/article/domain/article";
import { BaseRepository } from "@blntrsz/lib/repository.base";
import { articleMapper } from "../domain/article.mapper";

export class TursoArticleRepository
  extends BaseRepository<Article>
  implements ArticleRepository
{
  toDomain = articleMapper.toDomain;
  tableName = "article";
}
