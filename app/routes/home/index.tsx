import type { MetaFunction, AppLoadContext } from "react-router";
import type { Route } from "./+types";
import { Await, Link, useLoaderData } from "react-router";
import { Suspense } from "react";
import {
  Headline,
  Icon,
  Placeholder,
  PlaceholderLine,
  PlaceholderHeader,
} from "@hiz8/blue-ui";

import { Client } from "~/utils/notion";
import { postFromNotionResponse } from "~/utils/post-from-notion";
import { Cache } from "~/utils/cache";

import * as styles from "./index.css";

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

export async function loader({ context, request }: Route.LoaderArgs) {
  const cache = new Cache<Data>(request, context.caches);
  const cacheMatch = await cache.get();

  if (cacheMatch) {
    return cacheMatch;
  }

  const data = genFeedItems(context);
  context.ctx.waitUntil(setCache(data, cache));

  return { data };
}

async function setCache(data: Promise<FieldItem[]>, cache: Cache<Data>) {
  const res = await data;
  await cache.set({ data: res });
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
