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

  return (
    <article className={styles.root}>
      <h1>{post.title}</h1>
      <p>{post.date}</p>
      <Render blocks={blocks as any} />
    </article>
  );
}
