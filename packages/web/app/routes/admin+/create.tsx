import { parseWithZod } from "@conform-to/zod";
import { useForm } from "@conform-to/react";
import { createArticleAction } from "@blntrsz/core/article/application/create-article/action";
import { Form, useActionData } from "@remix-run/react";
import { createArticleActionSchema } from "@blntrsz/core/article/application/create-article/schema";
import { Button } from "~/components/ui/button";
import { Field, FieldError } from "~/components/field";
import { InputConform } from "~/components/input-conform";
import { Label } from "~/components/ui/label";

export const action = createArticleAction;

export default function CreateArticlePage() {
  const lastResult = useActionData<typeof action>();
  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult,

    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: createArticleActionSchema });
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
        <InputConform
          placeholder="Add description here..."
          meta={fields.description}
          type="text"
        />
        {fields.description.errors && (
          <FieldError>{fields.description.errors}</FieldError>
        )}
      </Field>
      <Button type="submit">Create</Button>
    </Form>
  );
}
