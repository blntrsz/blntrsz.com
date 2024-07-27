import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { createArticle } from "@blntrsz/core/article/use-cases/create-article";
import { parseWithZod } from "@conform-to/zod";
import { createArticleActionSchema } from "./schema";
import { withApp } from "@blntrsz/core/app-context";

export async function createArticleAction({ request }: ActionFunctionArgs) {
  return withApp(async () => {
    const formData = await request.formData();
    const submission = parseWithZod(formData, {
      schema: createArticleActionSchema,
    });

    if (submission.status !== "success") {
      return submission.reply();
    }

    const [_, error] = await createArticle(submission.value);

    if (error) {
      return redirect('/admin?error="failed-to-create-article"');
    }

    return redirect("/admin");
  });
}
