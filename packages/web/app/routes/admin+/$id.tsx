import {
  Form,
  json,
  redirect,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { FindOneArticle } from "@blntrsz/core/article/use-cases/find-one-article";
import { articleMapper } from "@blntrsz/core/article/domain/article.mapper";
import { PinoLogger } from "@blntrsz/core/common/adapters/pino.logger";
import { TursoArticleRepository } from "@blntrsz/core/article/infrastructure/turso.article.repository";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";
import { Field, FieldError } from "~/components/field";
import { Label } from "~/components/ui/label";
import { InputConform } from "~/components/input-conform";
import RichTextEditor from "~/components/text-editor";
import { Button } from "~/components/ui/button";
import { UpdateArticle } from "@blntrsz/core/article/use-cases/update-article";
import { EventBridge } from "@blntrsz/core/common/adapters/event-bridge.event-emitter";
import { BedrockLLM } from "@blntrsz/core/common/adapters/bedrock.llm";

export const schema = z.object({
  title: z.string().min(5),
  content: z.string().min(5),
});

export async function loader({ params }: LoaderFunctionArgs) {
  const useCase = new FindOneArticle(
    PinoLogger.instance,
    new TursoArticleRepository()
  );
  const article = await useCase.execute({ id: params.id! });

  if (!article) return redirect("/admin");

  return json({
    article: articleMapper.toResponse(article),
  });
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await new UpdateArticle(
    PinoLogger.instance,
    new TursoArticleRepository(),
    new EventBridge(),
    new BedrockLLM()
  ).execute({
    id: params.id!,
    ...submission.value,
  });

  return redirect("/admin");
}

export default function UpdateArticlePage() {
  const navigation = useNavigation();
  const loaderData = useLoaderData<typeof loader>();
  const [form, fields] = useForm({
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
          defaultValue={loaderData.article.attributes.title}
          placeholder="Add title here..."
          meta={fields.title}
          type="text"
        />
        {fields.title.errors && <FieldError>{fields.title.errors}</FieldError>}
      </Field>
      <Field>
        <Label htmlFor={fields.content.id}>Name</Label>
        <RichTextEditor
          defaultValue={loaderData.article.attributes.content}
          meta={fields.content}
          type="hidden"
        />
        {fields.content.errors && (
          <FieldError>{fields.content.errors}</FieldError>
        )}
      </Field>
      <Button disabled={navigation.state === "submitting"} type="submit">
        Update
      </Button>
    </Form>
  );
}
