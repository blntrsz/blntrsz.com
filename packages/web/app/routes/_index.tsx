import { articleMapper } from "@blntrsz/core/article/domain/article.mapper";
import { TursoArticleRepository } from "@blntrsz/core/article/infrastructure/turso.article.repository";
import { ListArticles } from "@blntrsz/core/article/use-cases/list-articles";
import { PinoLogger } from "@blntrsz/core/common/adapters/pino.logger";
import { json, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { ArrowRightIcon } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  const useCase = new ListArticles(
    PinoLogger.instance,
    new TursoArticleRepository()
  );
  const articles = await useCase.execute();

  return json({
    articles: articles.map((article) => articleMapper.toResponse(article)),
  });
}

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <>
      <section className="space-y-6 pb-64 pt-32 ">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <a
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium flex items-center gap-2"
            target="_blank"
            href="https://www.linkedin.com/in/balint-orosz-12913a10a/"
          >
            Follow me on LinkedIn <ArrowRightIcon />
          </a>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Hello traveler,
            <br /> welcome to my blog
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            I'm Bálint Orosz, a Staff Software Engineer at Diligent. I
            specialize in serverless technologies, AWS, and Infrastructure as
            Code. Follow my blog for insights from my career.
          </p>
          <div className="flex flex-col gap-2 items-center md:flex-row">
            <a
              className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 rounded-md"
              href="#latest-posts"
            >
              Check latest posts
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              className="rounded-md border-[1px] border-zinc-800 px-6 py-2 ml-0"
              href="https://github.com/blntrsz"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>
      <section id="latest-posts" className="grid gap-12">
        <h1 className="text-2xl">Latest Posts</h1>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          {loaderData.articles.map((article) => (
            <Link className="flex" key={article.id} to={`/${article.id}`}>
              <Card className="hover:bg-zinc-900">
                <CardHeader>
                  <CardTitle>{article.attributes.title}</CardTitle>
                  <CardDescription>
                    {article.attributes.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
