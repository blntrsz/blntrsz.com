import type { Logger } from "@blntrsz/core/common/ports/logger";
import { ActivityLog } from "@blntrsz/core/activity-log/domain/activity-log";
import type { ActivityLogProps } from "@blntrsz/core/activity-log/domain/activity-log.types";
import type { ActivityLogRepository } from "@blntrsz/core/activity-log/domain/repository/activity-log.repository";

type Request = Pick<ActivityLogProps, "name" | "metaData">;

export class CreateActivityLog {
  constructor(
    private readonly logger: Logger,
    private readonly activityLogRepository: ActivityLogRepository
  ) {}

  async execute(request: Request) {
    const activityLog = ActivityLog.create(request);

    try {
      return this.activityLogRepository.insert(activityLog);
    } catch (error) {
      this.logger.error("Cannot create Activity Log", { error });

      throw error;
    }
  }
}
