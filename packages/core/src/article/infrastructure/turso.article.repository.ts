import type { ArticleRepository } from "@blntrsz/core/article/domain/repository/article.repository";
import { Article } from "@blntrsz/core/article/domain/article";
import { BaseRepository } from "@blntrsz/core/lib/repository.base";
import { articleMapper } from "@blntrsz/core/article/domain/article.mapper";

export class TursoArticleRepository
  extends BaseRepository<Article>
  implements ArticleRepository
{
  toDomain = articleMapper.toDomain;
  tableName = Article.type;
}
