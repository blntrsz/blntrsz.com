import { DomainEvent } from "./domain-event.base";
import { Entity } from "./entity.base";
import { useRequestContext } from "./request.context";
import { useApp } from "@blntrsz/core/app-context";

export abstract class Aggregate<EntityProps> extends Entity<EntityProps> {
  private domainEvents: DomainEvent[] = [];

  protected addEvent(domainEvent: DomainEvent): void {
    this.domainEvents.push(domainEvent);
  }

  private clearEvents(): void {
    this.domainEvents = [];
  }

  public async publishEvents(): Promise<void> {
    const requestContext = useRequestContext();
    const app = useApp();
    await Promise.all(
      this.domainEvents.map(async (event) => {
        app.logger.debug(
          `[${requestContext.requestId}] "${event.constructor.name}" event published for aggregate ${this.constructor.name} : ${this.id}`
        );
        return app.eventEmitter.emit(event.constructor.name, event);
      })
    );
    this.clearEvents();
  }
}
