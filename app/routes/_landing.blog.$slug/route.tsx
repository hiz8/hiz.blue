import { type MetaFunction, type LoaderArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Render } from "@9gustin/react-notion-render";

import { Client, type Blocks } from "~/utils/notion";
import { postFromNotionResponse, type Post } from "~/utils/post-from-notion";
import { Cache } from "~/utils/cache";

import * as styles from "./route.css";

type Data = {
  post: Post;
  blocks: Blocks;
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: `${(data as Data).post.title} - Blog - hiz`,
    },
    { name: "description", content: (data as Data).post.title },
  ];
};

export async function loader({ params, context, request }: LoaderArgs) {
  const slug = params.slug;

  if (!slug) {
    throw new Response("Not Found", { status: 404 });
  }

  const cache = new Cache<Data>(request);
  const cacheMatch = await cache.get();

  if (cacheMatch) {
    return cacheMatch;
  }

  const client = new Client(context.env.NOTION_API_KEY);
  const data = await client.getDatabaseBySlug(
    context.env.NOTION_DATABASE_ID,
    slug,
  );

  const post = postFromNotionResponse(data);
  const blocks = await client.getBlocks(post.id);
  context.waitUntil(cache.set({ post, blocks }));

  return { post, blocks };
}

export default function Index() {
  const { post, blocks } = useLoaderData<typeof loader>();

  // post.date の "YYYY-MM-DDTHH:mm:ssZ" の文字列 を YYYY-MM-DD に変換する
  const _date = post.date.slice(0, 10);

  return (
    <article className={styles.root}>
      <header className={styles.header}>
        <h1 className={styles.title}>{post.title}</h1>
        <time className={styles.date} dateTime={_date}>
          {_date}
        </time>
      </header>
      {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
      <Render blocks={blocks as any} />
    </article>
  );
}
