import {
  EventBridgeClient,
  PutEventsCommand,
} from "@aws-sdk/client-eventbridge";
import type { EventEmitter } from "../ports/event-emitter";
import { Resource } from "sst";

export class EventBridge implements EventEmitter {
  eventBridge: EventBridgeClient;

  constructor() {
    this.eventBridge = new EventBridgeClient({});
  }

  async emit(name: string, event: unknown) {
    const command = new PutEventsCommand({
      Entries: [
        {
          Detail: JSON.stringify(event),
          DetailType: name,
          EventBusName: Resource.Blntrsz.name,
          Source: `blntrsz.com`,
        },
      ],
    });

    await this.eventBridge.send(command);
  }
}
