import { EventEmitter } from "stream";
import { DomainEvent } from "./domain-event.base";
import { Entity } from "./entity.base";
import { Logger } from "./logger.base";
import { useRequestContext } from "./request.context";

export abstract class Aggregate<EntityProps> extends Entity<EntityProps> {
  private domainEvents: DomainEvent[] = [];

  protected addEvent(domainEvent: DomainEvent): void {
    this.domainEvents.push(domainEvent);
  }

  private clearEvents(): void {
    this.domainEvents = [];
  }

  public async publishEvents(
    logger: Logger,
    eventEmitter: EventEmitter
  ): Promise<void> {
    const requestContext = useRequestContext();
    await Promise.all(
      this.domainEvents.map(async (event) => {
        logger.debug(
          `[${requestContext.requestId}] "${event.constructor.name}" event published for aggregate ${this.constructor.name} : ${this.id}`
        );
        return eventEmitter.emit(event.constructor.name, event);
      })
    );
    this.clearEvents();
  }
}
