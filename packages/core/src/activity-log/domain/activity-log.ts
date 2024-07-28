import { randomUUID } from "crypto";
import { Aggregate } from "@blntrsz/core/lib/aggregate.base";
import type { ActivityLogProps } from "./activity-log.types";

export class ActivityLog extends Aggregate<ActivityLogProps> {
  static readonly type = "activity_logs";

  static create(props: ActivityLogProps) {
    const id = randomUUID();

    const activityLog = new ActivityLog({
      id,
      props,
    });

    return activityLog;
  }
}
