import { ArticleRepository } from "@blntrsz/core/article/domain/repository/article.repository";
import { Article } from "@blntrsz/core/article/domain/article.entity";
import { BaseRepository } from "@blntrsz/lib/repository.base";

export class TursoArticleRepository
  extends BaseRepository<Article>
  implements ArticleRepository
{
  tableName = "article";
}
