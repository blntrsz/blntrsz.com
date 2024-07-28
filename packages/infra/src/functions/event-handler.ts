import { CreateActivityLog } from "@blntrsz/core/activity-log/use-cases/create-activity-log";
import { PinoLogger } from "@blntrsz/core/common/adapters/pino.logger";
import { TursoActivityLogRepository } from "@blntrsz/core/activity-log/infrastructure/turso.activity-log.repository";
import "@libsql/client";

type Event = {
  version: string;
  source: string;
  id: string;
  ["detail-type"]: string;
  detail: object;
};

export function handler(e: Event) {
  const useCase = new CreateActivityLog(
    PinoLogger.instance,
    new TursoActivityLogRepository()
  );
  useCase.execute({
    name: e["detail-type"],
    metaData: JSON.stringify(e.detail),
  });
}
