import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { CreateArticle } from "@blntrsz/core/article/use-cases/create-article";
import { parseWithZod } from "@conform-to/zod";
import { PinoLogger } from "@blntrsz/lib/pino-logger";
import { TursoArticleRepository } from "@blntrsz/core/article/infrastructure/turso.article.repository";
import { createArticleActionSchema } from "./schema";
import { withRequestContext } from "@blntrsz/lib/request.context";
import { randomUUID } from "crypto";

export async function createArticleAction({ request }: ActionFunctionArgs) {
  return withRequestContext(
    {
      requestId: randomUUID(),
    },
    async () => {
      const formData = await request.formData();
      const submission = parseWithZod(formData, {
        schema: createArticleActionSchema,
      });

      if (submission.status !== "success") {
        return submission.reply();
      }

      new CreateArticle(
        PinoLogger.instance,
        new TursoArticleRepository()
      ).execute(submission.value);

      return redirect("/admin");
    }
  );
}
