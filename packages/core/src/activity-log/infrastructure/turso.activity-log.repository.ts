import { BaseRepository } from "@blntrsz/core/lib/repository.base";
import { activityLogMapper } from "@blntrsz/core/activity-log/domain/article.mapper";
import { ActivityLog } from "@blntrsz/core/activity-log/domain/activity-log";
import type { ActivityLogRepository } from "@blntrsz/core/activity-log/domain/repository/activity-log.repository";

export class TursoActivityLogRepository
  extends BaseRepository<ActivityLog>
  implements ActivityLogRepository
{
  toDomain = activityLogMapper.toDomain;
  tableName = ActivityLog.type;
}
