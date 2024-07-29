import { PinoLogger } from "@blntrsz/core/common/adapters/pino.logger";
import { FindOneSession } from "@blntrsz/core/session/use-cases/find-one-session";
import { CreateSession } from "@blntrsz/core/session/use-cases/create-session";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, json, Outlet, useLoaderData } from "@remix-run/react";
import { TursoSesionRepository } from "@blntrsz/core/session/infrastructure/turso.session.repository";
import { sessionCookie } from "./session.server";
import { Input } from "~/components/ui/input";
import { Resource } from "sst";
import { Button } from "~/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Field } from "~/components/field";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await sessionCookie.getSession(request.headers.get("Cookie"));
  const id = session.get("id");

  if (!id) return json({ authorized: false });

  const currentSession = await new FindOneSession(
    PinoLogger.instance,
    new TursoSesionRepository()
  ).execute({ id });
  if (!currentSession) return json({ authorized: false });

  return json(
    { authorized: true },
    {
      headers: {
        "Set-Cookie": await sessionCookie.commitSession(session),
      },
    }
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await sessionCookie.getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const email = formData.get("name");
  const password = formData.get("password");

  if (Resource.User.value === email && Resource.Password.value === password) {
    const newSession = await new CreateSession(
      PinoLogger.instance,
      new TursoSesionRepository()
    ).execute();

    session.set("id", newSession.id);

    return json(
      { authorized: true },
      {
        headers: {
          "Set-Cookie": await sessionCookie.commitSession(session),
        },
      }
    );
  }

  return json({
    authorized: true,
  });
}

export default function Layout() {
  const loaderData = useLoaderData<typeof loader>();

  if (loaderData.authorized) {
    return <Outlet />;
  }

  return (
    <Form className="grid gap-4" method="post">
      <Field>
        <Label>Name</Label>
        <Input name="name" type="text" />
      </Field>
      <Field>
        <Label>Password</Label>
        <Input name="password" type="password" />
      </Field>
      <Button className="mt-4" type="submit">
        Login
      </Button>
    </Form>
  );
}
