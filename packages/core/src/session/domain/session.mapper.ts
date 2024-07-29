import type { CreateEntityProps } from "@blntrsz/core/lib/entity.base";
import { Session } from "./session";

export const sessionMapper = {
  toResponse(session: Session) {
    const props = session.getProps();

    return {
      id: props.id,
      type: Session.type,
    };
  },

  toDomain(props: CreateEntityProps<{}>): Session {
    return new Session(props);
  },
};
