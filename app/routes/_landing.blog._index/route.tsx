import {
  type MetaFunction,
  type LoaderArgs,
  json,
} from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

import { Client } from "~/utils/notion";
import { postFromNotionResponse } from "~/utils/post-from-notion";
import { Headline } from "~/components/headline";
import { Icon } from "~/components/icon";
import { Card } from "./card";
import * as styles from "./route.css";

export const meta: MetaFunction = () => {
  return [{ title: "Blog - hiz" }, { name: "description", content: "Blog" }];
};

export async function loader({ context }: LoaderArgs) {
  const client = new Client(context.env.NOTION_API_KEY);
  const data = await client.getDatabase(context.env.NOTION_DATABASE_ID);
  const posts = data.map(postFromNotionResponse);

  return json({ posts });
}

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div>
      <Headline>
        <Icon type="blog" />
        Blog
      </Headline>
      <div className={styles.cardHolder}>
        {posts.length === 0 && (
          <p className={styles.feedItemsEmpty}>No posts yet.</p>
        )}
        {posts.map((post) => (
          <Card key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}
