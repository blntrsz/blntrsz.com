import type { Logger } from "@blntrsz/core/common/ports/logger";
import type { SessionRepository } from "@blntrsz/core/session/domain/repository/session.repository";
import { Session } from "@blntrsz/core/session/domain/session";

type Request = { id: string };

export class FindOneSession {
  constructor(
    private readonly logger: Logger,
    private readonly sessionRepository: SessionRepository
  ) {}

  async execute(request: Request): Promise<Session | null> {
    try {
      const session = await this.sessionRepository.findOne(request.id);

      if (!session) return null;
      if (session.isExpired()) return null;

      return session;
    } catch (error) {
      this.logger.error("Failed to get one session", { error });

      throw error;
    }
  }
}
