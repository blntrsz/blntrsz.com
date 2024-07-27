import { randomUUID } from "crypto";
import { Aggregate } from "@blntrsz/lib/aggregate.base";
import { ActivityLogProps } from "./activity-log.types";

export class ActivityLog extends Aggregate<ActivityLogProps> {
  static type = "activity_logs";

  static create(props: ActivityLogProps) {
    const id = randomUUID();

    const activityLog = new ActivityLog({
      id,
      props,
    });

    return activityLog;
  }
}
