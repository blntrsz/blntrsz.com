import { parseWithZod } from "@conform-to/zod";
import { useForm } from "@conform-to/react";
import { createArticleAction } from "@blntrsz/core/article/application/create-article/action";
import { Form, useActionData } from "@remix-run/react";
import { createArticleActionSchema } from "@blntrsz/core/article/application/create-article/schema";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

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
      <Input
        key={fields.title.key}
        name={fields.title.name}
        defaultValue={fields.title.initialValue}
        placeholder="Add title here..."
      />
      <Input
        key={fields.description.key}
        name={fields.description.name}
        defaultValue={fields.description.initialValue}
        placeholder="Add description here..."
      />
      <Button type="submit">Create</Button>
    </Form>
  );
}
