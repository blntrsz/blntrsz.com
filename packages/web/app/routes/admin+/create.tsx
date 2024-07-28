import { parseWithZod } from "@conform-to/zod";
import { useForm } from "@conform-to/react";
import { Form, redirect, useActionData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Field, FieldError } from "~/components/field";
import { InputConform } from "~/components/input-conform";
import { Label } from "~/components/ui/label";
import { ActionFunctionArgs } from "@remix-run/node";
import { z } from "zod";
import { CreateArticle } from "@blntrsz/core/article/use-cases/create-article";
import { TursoArticleRepository } from "@blntrsz/core/article/infrastructure/turso.article.repository";
import { PinoLogger } from "@blntrsz/core/common/adapters/pino.logger";
import { EventBridge } from "@blntrsz/core/common/adapters/event-bridge.event-emitter";
import RichTextEditor from "~/components/text-editor";

export const schema = z.object({
  title: z.string().min(5),
  description: z.string().min(20),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await new CreateArticle(
    PinoLogger.instance,
    new TursoArticleRepository(),
    new EventBridge()
  ).execute(submission.value);

  return redirect("/admin");
}

export default function CreateArticlePage() {
  const lastResult = useActionData<typeof action>();
  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult,

    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },

    // Validate the form on blur event triggered
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <Form
      className="grid gap-4"
      method="post"
      id={form.id}
      onSubmit={form.onSubmit}
      noValidate
    >
      <Field>
        <Label htmlFor={fields.title.id}>Name</Label>
        <InputConform
          placeholder="Add title here..."
          meta={fields.title}
          type="text"
        />
        {fields.title.errors && <FieldError>{fields.title.errors}</FieldError>}
      </Field>
      <Field>
        <Label htmlFor={fields.description.id}>Name</Label>
        <RichTextEditor meta={fields.description} type="hidden" />
        {fields.description.errors && (
          <FieldError>{fields.description.errors}</FieldError>
        )}
      </Field>
      <Button type="submit">Create</Button>
    </Form>
  );
}
