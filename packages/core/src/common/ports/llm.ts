export interface LLM {
  prompt(promptContent: string): Promise<string>;
}
