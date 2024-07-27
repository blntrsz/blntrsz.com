import { useApp } from "@blntrsz/core/app-context";

export abstract class Exception extends Error {
  abstract readonly code: string;
  abstract readonly message: string;

  toResponse() {
    return {
      errors: [
        {
          id: useApp().requestId,
          code: this.code,
          title: this.message,
        },
      ],
    } as const;
  }
}

export class BadRequestException extends Exception {
  code = "BAD_REQUEST";
  message = "Bad request";
}

export class AlreadyExistsException extends Exception {
  code = "ALREADY_EXISTS";
  message: string;

  constructor(entityName: string) {
    super();
    this.message = `${entityName} already exists`;
  }
}

export class NotFoundException extends Exception {
  code = "NOT_FOUND";
  message: string;

  constructor(entityName: string) {
    super();
    this.message = `${entityName} not found`;
  }
}

export class InternalServerException extends Exception {
  code = "INTERNAL_SERVER_ERROR";
  message = "Internal Server Error";
}
