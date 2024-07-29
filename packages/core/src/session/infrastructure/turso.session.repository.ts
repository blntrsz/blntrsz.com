import type { SessionRepository } from "@blntrsz/core/session/domain/repository/session.repository";
import { Session } from "@blntrsz/core/session/domain/session";
import { BaseRepository } from "@blntrsz/core/lib/repository.base";
import { sessionMapper } from "@blntrsz/core/session/domain/session.mapper";

export class TursoSesionRepository
  extends BaseRepository<Session>
  implements SessionRepository
{
  toDomain = sessionMapper.toDomain;
  tableName = Session.type;
}
