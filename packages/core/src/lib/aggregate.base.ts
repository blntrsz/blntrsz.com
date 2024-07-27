import { DomainEvent } from "./domain-event.base";
import { Entity } from "./entity.base";
import type { EventEmitter } from "../common/ports/event-emitter";
import type { Logger } from "../common/ports/logger";

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
    await Promise.all(
      this.domainEvents.map(async (event) => {
        logger.debug(
          `"${event.constructor.name}" event published for aggregate ${this.constructor.name} : ${this.id}`
        );
        return eventEmitter.emit(event.constructor.name, event);
      })
    );
    this.clearEvents();
  }
}
