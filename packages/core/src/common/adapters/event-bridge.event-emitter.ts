import {
  EventBridgeClient,
  PutEventsCommand,
} from "@aws-sdk/client-eventbridge";
import { EventEmitter } from "../ports/event-emitter";
import { z } from "zod";

export class EventBridge implements EventEmitter {
  eventBridgeName: string;
  eventBridge: EventBridgeClient;

  constructor(eventBridgeName?: string) {
    this.eventBridge = new EventBridgeClient({});
    this.eventBridgeName = z
      .string()
      .parse(eventBridgeName ?? process.env.EVENTBRIDGE_NAME);
  }

  async emit(name: string, event: Event) {
    const command = new PutEventsCommand({
      Entries: [
        {
          Detail: JSON.stringify(event),
          DetailType: name,
          EventBusName: this.eventBridgeName,
          Source: `blntrsz.com`,
        },
      ],
    });

    await this.eventBridge.send(command);
  }
}
