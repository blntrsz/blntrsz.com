import type { CreateEntityProps } from "@blntrsz/core/lib/entity.base";
import { ActivityLog } from "./activity-log";
import type { ActivityLogProps } from "./activity-log.types";

export const activityLogMapper = {
  toResponse(activityLog: ActivityLog) {
    const { id, ...props } = activityLog.getProps();

    return {
      id: id,
      type: ActivityLog.type,
      attributes: props,
    };
  },

  toDomain(props: CreateEntityProps<ActivityLogProps>) {
    return new ActivityLog(props);
  },
};
