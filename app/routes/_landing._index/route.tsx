import { defer, json } from "@remix-run/cloudflare";
import type {
  MetaFunction,
  LoaderArgs,
  AppLoadContext,
} from "@remix-run/cloudflare";
import { Await, Link, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";

import { Headline } from "~/components/headline";
import { Icon } from "~/components/icon";
import {
  Placeholder,
  PlaceholderLine,
  PlaceholderHeader,
} from "~/components/placeholder";
import { Client } from "~/utils/notion";
import { postFromNotionResponse } from "~/utils/post-from-notion";
import { Cache, storeData } from "~/utils/cache";

import * as styles from "./route.css";

export const meta: MetaFunction = () => {
  return [{ title: "hiz" }, { name: "description", content: "Home" }];
};

type FieldItem = {
  id: string;
  title: string;
  domain: "hiz.blue";
  category: "Blog";
  href: `/blog/${string}`;
};
type Data = {
  data: FieldItem[];
};

export async function loader({ context, request }: LoaderArgs) {
  const cache = new Cache<Data>(request);
  const cacheMatch = await cache.get();

  if (cacheMatch) {
    return json(cacheMatch);
  }

  const data = genFeedItems(context);
  context.waitUntil(storeData(data, cache));

  return defer({ data });
}

async function genFeedItems(context: AppLoadContext) {
  const client = new Client(context.env.NOTION_API_KEY);
  const data = client.getDatabase(context.env.NOTION_DATABASE_ID);

  const posts = await data;
  const feedItems: FieldItem[] = posts
    .map(postFromNotionResponse)
    .map((post) => ({
      id: post.id,
      title: post.title,
      domain: "hiz.blue",
      category: "Blog",
      href: `/blog/${post.slug}`,
    }));
  return feedItems;
}

export default function Index() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div className={styles.root}>
      <section>
        <Headline>
          <Icon type="feed" />
          Feed
        </Headline>
        <Suspense
          fallback={
            <Placeholder>
              <PlaceholderHeader image>
                <PlaceholderLine />
                <PlaceholderLine />
              </PlaceholderHeader>
            </Placeholder>
          }
        >
          <Await resolve={data}>
            {(feedItems) => {
              return (
                <>
                  {feedItems.length === 0 && (
                    <p className={styles.feedItemsEmpty}>No feed items yet.</p>
                  )}
                  <ul className={styles.feedItems}>
                    {feedItems.map((item) => (
                      <Link
                        to={item.href}
                        key={item.id}
                        className={styles.feedItemLink}
                      >
                        <li className={styles.feedItem}>
                          <div className={styles.feedItemImage} />
                          <div className={styles.feedItemContents}>
                            <h2 className={styles.feedItemTitle}>
                              {item.title}
                            </h2>
                            <div className={styles.feedItemMeta}>
                              <p className={styles.feedItemDomain}>
                                {item.domain}
                              </p>
                              <p className={styles.feedItemCategory}>
                                {item.category}
                              </p>
                            </div>
                          </div>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </>
              );
            }}
          </Await>
        </Suspense>
      </section>
    </div>
  );
}
