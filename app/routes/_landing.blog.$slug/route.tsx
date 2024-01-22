import {
  type MetaFunction,
  type LoaderArgs,
  json,
} from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Render } from "@9gustin/react-notion-render";

import { Client } from "~/utils/notion";
import { postFromNotionResponse } from "~/utils/post-from-notion";

import * as styles from "./route.css";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: `${(data as any).post.title} - Blog - hiz`,
    },
    { name: "description", content: (data as any).post.title },
  ];
};

export async function loader({ params, context }: LoaderArgs) {
  const slug = params.slug;

  if (!slug) {
    throw new Response("Not Found", { status: 404 });
  }

  const client = new Client(context.env.NOTION_API_KEY);
  const data = await client.getDatabaseBySlug(
    context.env.NOTION_DATABASE_ID,
    slug
  );

  const post = postFromNotionResponse(data);
  const blocks = await client.getBlocks(post.id);

  return json({ post, blocks });
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
      <Render blocks={blocks as any} />
    </article>
  );
}
