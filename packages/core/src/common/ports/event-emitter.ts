export interface EventEmitter {
  emit(name: string, event: unknown): void;
}
