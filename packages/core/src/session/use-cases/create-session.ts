import { Session } from "@blntrsz/core/session/domain/session";
import type { Logger } from "@blntrsz/core/common/ports/logger";
import type { SessionRepository } from "@blntrsz/core/session/domain/repository/session.repository";

export class CreateSession {
  constructor(
    private readonly logger: Logger,
    private readonly sessionRepository: SessionRepository
  ) {}

  async execute() {
    try {
      const session = Session.create();

      await this.sessionRepository.insert(session);

      return session;
    } catch (error) {
      this.logger.error("Cannot create Session", { error });

      throw error;
    }
  }
}
