import { BaseRepository } from "@blntrsz/lib/repository.base";
import { activityLogMapper } from "../domain/article.mapper";
import { ActivityLog } from "../domain/activity-log";
import { ActivityLogRepository } from "../domain/repository/activity-log.repository";

export class TursoActivityLogRepository
  extends BaseRepository<ActivityLog>
  implements ActivityLogRepository
{
  toDomain = activityLogMapper.toDomain;
  tableName = ActivityLog.type;
}
