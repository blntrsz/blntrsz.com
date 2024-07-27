import pino from "pino";

import { Logger } from "../ports/logger";
import { useRequestContext } from "@blntrsz/lib/request.context";

export class PinoLogger implements Logger {
  static _instance: PinoLogger;
  private logger: pino.Logger<never>;

  private constructor() {
    this.logger = pino({
      level: process.env.PINO_LOG_LEVEL || "info",
    });
  }

  public static get instance(): PinoLogger {
    if (!PinoLogger._instance) {
      PinoLogger._instance = new PinoLogger();
    }

    return PinoLogger._instance;
  }

  private enrichMetaData(meta: object) {
    if (meta && "error" in meta && meta.error instanceof Error) {
      meta.error = {
        name: meta.error.name,
        message: meta.error.message,
        stack: meta.error.stack,
      };
    }

    return {
      ...meta,
      ...useRequestContext(),
    };
  }

  debug(message: string, meta: object) {
    this.logger.debug(this.enrichMetaData(meta), message);
  }
  info(message: string, meta: object) {
    this.logger.info(this.enrichMetaData(meta), message);
  }
  warn(message: string, meta: object) {
    this.logger.warn(this.enrichMetaData(meta), message);
  }
  error(message: string, meta: object) {
    this.logger.error(this.enrichMetaData(meta), message);
  }
}
