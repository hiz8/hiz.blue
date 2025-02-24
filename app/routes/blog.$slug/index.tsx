import type { MetaFunction } from "react-router";
import type { Route } from "./+types";
import { useLoaderData, Await, Link } from "react-router";
import { Render } from "@9gustin/react-notion-render";
import { Suspense } from "react";
import { Placeholder, PlaceholderLine } from "@hiz8/blue-ui";

import { Client, type Blocks } from "~/utils/notion";
import { postFromNotionResponse, type Post } from "~/utils/post-from-notion";
import { Cache } from "~/utils/cache";

import * as styles from "./index.css";

type Data = {
  post: Post;
  blocks: Blocks;
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: `${(data as Data).post.title} - Blog - hiz`,
    },
    {
      name: "description",
      content: (data as Data).post.excerpt || (data as Data).post.title,
    },
  ];
};

export async function loader({ params, context, request }: Route.LoaderArgs) {
  // request.url のオリジンを取得する
  const origin = request.url.split("/").slice(0, 3).join("/");
  const referer = request.headers.get("referer");
  let backTo: string | undefined;
  // referer が origin から始まり、かつトップページか /blog であれば referer を backTo に設定する
  if (referer?.startsWith(origin) && referer.match(/\/(blog)?\/?$/) !== null) {
    backTo = referer;
  }

  const slug = params.slug;

  if (!slug) {
    throw new Response("Not Found", { status: 404 });
  }

  const cache = new Cache<Data>(request, context.caches);
  const cacheMatch = await cache.get();

  if (cacheMatch) {
    return { ...cacheMatch, backTo };
  }

  const client = new Client(context.env.NOTION_API_KEY);
  const data = await client.getDatabaseBySlug(
    context.env.NOTION_DATABASE_ID,
    slug
  );

  const post = postFromNotionResponse(data);
  const blocks = client.getBlocks(post.id);

  context.ctx.waitUntil(setCache({ post, blocks }, cache));

  return { post, blocks, backTo };
}

async function setCache(
  data: {
    post: Post;
    blocks: Promise<Blocks>;
  },
  cache: Cache<Data>
) {
  const res = await data.blocks;
  await cache.set({ post: data.post, blocks: res });
}

export default function Index() {
  const { post, blocks, backTo } = useLoaderData<typeof loader>();

  // post.date の "YYYY-MM-DDTHH:mm:ssZ" の文字列 を YYYY-MM-DD に変換する
  const _date = post.date.slice(0, 10);

  return (
    <>
      <article className={styles.root}>
        <header className={styles.header}>
          <h1 className={styles.title}>{post.title}</h1>
          <time className={styles.date} dateTime={_date}>
            {_date}
          </time>
        </header>
        <Suspense
          fallback={
            <Placeholder>
              <PlaceholderLine />
              <PlaceholderLine />
              <PlaceholderLine />
              <PlaceholderLine />
              <PlaceholderLine />
              <PlaceholderLine />
            </Placeholder>
          }
        >
          <Await resolve={blocks}>
            {(blocks) => {
              // biome-ignore lint/suspicious/noExplicitAny:
              return <Render blocks={blocks as any} />;
            }}
          </Await>
        </Suspense>
      </article>
      {backTo && (
        <div className={styles.backLinkWrapper}>
          <Link to={backTo} className={styles.backLink}>
            ← Back to list
          </Link>
        </div>
      )}
    </>
  );
}
