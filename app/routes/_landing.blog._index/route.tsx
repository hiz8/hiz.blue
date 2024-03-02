import {
  type MetaFunction,
  type LoaderArgs,
  type AppLoadContext,
  defer,
} from "@remix-run/cloudflare";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";

import { Client } from "~/utils/notion";
import { postFromNotionResponse, type Post } from "~/utils/post-from-notion";
import { Cache, storeData } from "~/utils/cache";
import { Headline } from "~/components/headline";
import { Icon } from "~/components/icon";
import { Placeholder, PlaceholderLine } from "~/components/placeholder";
import { Card } from "./card";
import * as styles from "./route.css";

type Data = {
  data: Post[];
};

export const meta: MetaFunction = () => {
  return [{ title: "Blog - hiz" }, { name: "description", content: "Blog" }];
};

export async function loader({ context, request }: LoaderArgs) {
  const cache = new Cache<Data>(request);
  const cacheMatch = await cache.get();

  if (cacheMatch) {
    return cacheMatch;
  }

  const data = genFeedItems(context);
  context.waitUntil(storeData(data, cache));

  return defer({ data });
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
