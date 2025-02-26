import type { MetaFunction, AppLoadContext } from "react-router";
import type { Route } from "./+types";
import { Await, useLoaderData } from "react-router";
import { Suspense } from "react";
import { Headline, Icon, Placeholder, PlaceholderLine } from "@hiz8/blue-ui";

import { Client } from "~/utils/notion";
import { postFromNotionResponse, type Post } from "~/utils/post-from-notion";
import { Cache } from "~/utils/cache";
import { Card } from "./card";
import * as styles from "./index.css";

type Data = {
  data: Post[];
};

export const meta: MetaFunction = () => {
  return [{ title: "Blog - hiz" }, { name: "description", content: "Blog" }];
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

async function setCache(data: Promise<Post[]>, cache: Cache<Data>) {
  const res = await data;
  await cache.set({ data: res });
}

async function genFeedItems(context: AppLoadContext) {
  const client = new Client(context.env.NOTION_API_KEY);
  const data = client.getDatabase(context.env.NOTION_DATABASE_ID);

  const posts = await data;
  const feedItems: Post[] = posts.map(postFromNotionResponse);
  return feedItems;
}

export default function Index() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div>
      <Headline>
        <Icon type="blog" />
        Blog
      </Headline>
      <div className={styles.cardHolder}>
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
          <Await resolve={data}>
            {(_posts) => {
              if (_posts.length === 0) {
                return <p className={styles.feedItemsEmpty}>No posts yet.</p>;
              }
              return _posts.map((post) => <Card key={post.id} {...post} />);
            }}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}
