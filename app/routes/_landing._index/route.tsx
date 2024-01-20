import { json } from "@remix-run/cloudflare";
import type { MetaFunction, LoaderArgs } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";

import { Headline } from "~/components/headline";
import { Icon } from "~/components/icon";
import { Client } from "~/utils/notion";
import { postFromNotionResponse } from "~/utils/post-from-notion";

import * as styles from "./route.css";

export const meta: MetaFunction = () => {
  return [{ title: "hiz" }, { name: "description", content: "Home" }];
};

export async function loader({ context }: LoaderArgs) {
  const client = new Client(context.env.NOTION_API_KEY);

  const data = await client.getDatabase(context.env.NOTION_DATABASE_ID);
  const posts = data.map(postFromNotionResponse);

  return json({ posts });
}

type FieldItem = {
  id: string;
  title: string;
  domain: "hiz.blue";
  category: "Blog";
  href: `/blog/${string}`;
};

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();

  const feedItems: FieldItem[] = posts.map((post) => ({
    id: post.id,
    title: post.title,
    domain: "hiz.blue",
    category: "Blog",
    href: `/blog/${post.slug}`,
  }));

  return (
    <div className={styles.root}>
      <section>
        <Headline>
          <Icon type="feed" />
          Feed
        </Headline>
        {feedItems.length === 0 && (
          <p className={styles.feedItemsEmpty}>No feed items yet.</p>
        )}
        <ul className={styles.feedItems}>
          {feedItems.map((item) => (
            <Link to={item.href} key={item.id} className={styles.feedItemLink}>
              <li className={styles.feedItem}>
                <div className={styles.feedItemImage}></div>
                <div className={styles.feedItemContents}>
                  <h2 className={styles.feedItemTitle}>{item.title}</h2>
                  <div className={styles.feedItemMeta}>
                    <p className={styles.feedItemDomain}>{item.domain}</p>
                    <p className={styles.feedItemCategory}>{item.category}</p>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </section>
    </div>
  );
}
