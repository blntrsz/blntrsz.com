import type { LLM } from "../ports/llm";
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient();

export class BedrockLLM implements LLM {
  modelId = "anthropic.claude-3-sonnet-20240229-v1:0";

  async prompt(promptContent: string): Promise<string> {
    const params = new InvokeModelCommand({
      modelId: this.modelId,
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 4096,
        temperature: 0.5,
        top_k: 250,
        top_p: 1,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: promptContent,
              },
            ],
          },
        ],
      }),
    });
    const data = await client.send(params);
    console.log(data);
    const jsonString = new TextDecoder().decode(data.body);
    console.log(jsonString);
    const modelRes = JSON.parse(jsonString);

    console.log(modelRes.content[0].text);
    return modelRes.content[0].text;
  }
}
