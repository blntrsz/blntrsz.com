import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "~/components/ui/command";
import { useEffect, useState } from "react";
import {
  Link,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "@remix-run/react";
import { loader } from "~/root";

export function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="h-16 border-b-zinc-800 border-b-[1px] flex justify-between">
        <div className="container flex justify-between items-center">
          <Link to="/">
            <h2>Bálint Orosz</h2>
          </Link>
          <GlobalSearch />
        </div>
      </header>
      <main className="container py-4">{children}</main>
      <footer className="container"></footer>
    </>
  );
}

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const loaderData = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div>
      <div className="w-full flex-1 md:w-auto md:flex-none">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
        >
          <span className="hidden lg:inline-flex">Search documentation...</span>
          <span className="inline-flex lg:hidden">Search...</span>
          <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-gray-900 pt-1 px-1.5 font-mono text-[12px] font-medium opacity-100 sm:flex">
            <span className="text-[14px]">⌘</span>K
          </kbd>
        </button>
      </div>
      <CommandDialog
        open={open}
        onOpenChange={(state) => {
          setOpen(state);
        }}
      >
        <CommandInput
          value={searchParams.get("q") ?? ""}
          onValueChange={(value) => {
            setSearchParams((sp) => {
              sp.set("q", value);
              return sp;
            });
          }}
          placeholder="Type a command or search..."
        />
        <CommandList>
          {!!loaderData?.articles?.length && (
            <CommandEmpty>
              <ul className="flex flex-col items-start w-full">
                {loaderData.articles.map((article) => (
                  <Link
                    key={article.id}
                    className="hover:bg-zinc-800 w-full flex pl-10"
                    onKeyDown={(e) => {
                      if (e.key !== "Enter") return;
                      navigate(`/${article.id}`);
                      setOpen(false);
                    }}
                    onClick={() => {
                      setOpen(false);
                    }}
                    to={`/${article.id}`}
                  >
                    <li className="">{article.attributes.title}</li>
                  </Link>
                ))}
              </ul>
            </CommandEmpty>
          )}
        </CommandList>
      </CommandDialog>
    </div>
  );
}
