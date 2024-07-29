import { randomUUID } from "crypto";
import { Aggregate } from "@blntrsz/core/lib/aggregate.base";

export class Session extends Aggregate<{}> {
  static readonly type = "sessions";

  static create() {
    const id = randomUUID();

    const session = new Session({
      id,
      props: {},
    });

    return session;
  }

  isExpired() {
    const createdAt = this.createdAt as unknown as number;
    const now = new Date();
    const twelveHoursFromCreatedAt = new Date(createdAt + 12 * 60 * 60 * 1000);
    return now > twelveHoursFromCreatedAt;
  }
}
