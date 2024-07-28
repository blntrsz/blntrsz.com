import { DomainEvent } from "./domain-event.base";
import { Entity } from "./entity.base";
import type { EventEmitter } from "../common/ports/event-emitter";

export abstract class Aggregate<EntityProps> extends Entity<EntityProps> {
  private domainEvents: DomainEvent[] = [];

  protected addEvent(domainEvent: DomainEvent): void {
    this.domainEvents.push(domainEvent);
  }

  private clearEvents(): void {
    this.domainEvents = [];
  }

  public async publishEvents(eventEmitter: EventEmitter): Promise<void> {
    await Promise.all(
      this.domainEvents.map(async (event) => {
        return eventEmitter.emit(event.eventName, event.toEvent());
      })
    );
    this.clearEvents();
  }
}
