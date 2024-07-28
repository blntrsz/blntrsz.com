import { LoaderFunctionArgs } from "@remix-run/node";
import { json, Link, Outlet, useLoaderData } from "@remix-run/react";
import { Resource } from "sst";
import { Button } from "~/components/ui/button";

function isAuthorized(request: Request) {
  const header = request.headers.get("Authorization");

  if (!header) return false;

  const base64 = header.replace("Basic ", "");
  const [username, password] = Buffer.from(base64, "base64")
    .toString()
    .split(":");

  return (
    username === Resource.User.value && password === Resource.Password.value
  );
}

export const headers = () => ({
  "WWW-Authenticate": "Basic",
});

export const loader = async ({ request }: LoaderFunctionArgs) => {
  if (!isAuthorized(request)) {
    return json({ authorized: false }, { status: 401 });
  }

  // Load data for password-protected page here.

  return json({
    authorized: true,
    // Include extra data for password-protected page here.
  });
};

export default function Layout() {
  const loaderData = useLoaderData<typeof loader>();

  if (loaderData.authorized) {
    return <Outlet />;
  }

  return (
    <>
      <h1>Forbidden</h1>
      <Button asChild>
        <Link to="/">To Home</Link>
      </Button>
    </>
  );
}
